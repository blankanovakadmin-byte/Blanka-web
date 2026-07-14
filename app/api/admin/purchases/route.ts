import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import Stripe from 'stripe';

export async function GET() {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' });

  const sessions = await stripe.checkout.sessions.list({
    limit: 20,
    expand: ['data.customer_details'],
  });

  const result = sessions.data
    .filter(s => s.payment_status === 'paid')
    .map(s => ({
      id: s.id,
      created: new Date(s.created * 1000).toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' }),
      email: s.customer_email || s.customer_details?.email || '',
      amountHuf: (s.amount_total || 0) / 100,
      productType: s.metadata?.productType || '',
      productTitle: s.metadata?.productTitle || '',
      billingName: s.metadata?.billingName || s.customer_details?.name || '',
      billingPostalCode: s.metadata?.billingPostalCode || '',
      billingCity: s.metadata?.billingCity || '',
      billingLine: s.metadata?.billingLine || '',
    }));

  return NextResponse.json(result);
}
