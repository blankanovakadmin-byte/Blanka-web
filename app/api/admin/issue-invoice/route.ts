import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { createInvoice } from '@/lib/szamlazz';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!process.env.SZAMLAZZ_AGENT_KEY) {
    return NextResponse.json({ error: 'SZAMLAZZ_AGENT_KEY nincs beállítva a Vercel env vars között' }, { status: 500 });
  }

  const { sessionId } = await req.json() as { sessionId: string };
  if (!sessionId) return NextResponse.json({ error: 'sessionId kötelező' }, { status: 400 });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' });
  const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['customer_details'] });

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'A session nincs kifizetve' }, { status: 400 });
  }

  const email = session.customer_email || session.customer_details?.email || '';
  const amountHuf = (session.amount_total || 0) / 100;
  const productTitle = session.metadata?.productTitle || 'Vásárlás';
  const customerName = session.metadata?.billingName || session.customer_details?.name || email;
  const address = {
    postalCode: session.metadata?.billingPostalCode || '',
    city: session.metadata?.billingCity || '',
    line: session.metadata?.billingLine || '',
  };

  try {
    const { invoiceNumber } = await createInvoice({
      customerName,
      customerEmail: email,
      customerAddress: address,
      items: [{ name: productTitle, quantity: 1, unitPrice: amountHuf }],
      orderNumber: session.id,
    });
    return NextResponse.json({ ok: true, invoiceNumber, email, amountHuf, customerName });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
