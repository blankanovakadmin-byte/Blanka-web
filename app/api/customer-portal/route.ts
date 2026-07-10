import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' });
}

export async function POST(req: NextRequest) {
  const { email } = await req.json() as { email?: string };

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Kérlek adj meg egy érvényes email címet.' }, { status: 400 });
  }

  const stripe = getStripe();

  const customers = await stripe.customers.list({ email, limit: 10 });
  if (customers.data.length === 0) {
    return NextResponse.json({ error: 'Nem találtunk előfizetést ehhez az email címhez.' }, { status: 404 });
  }

  // Prefer the customer that has active subscriptions to handle duplicate customer records
  const subs = await Promise.all(
    customers.data.map(c =>
      stripe.subscriptions.list({ customer: c.id, status: 'active', limit: 1 })
        .then(r => ({ customer: c, hasActive: r.data.length > 0 }))
    )
  );
  const best = subs.find(s => s.hasActive) ?? subs[0];

  const session = await stripe.billingPortal.sessions.create({
    customer: best.customer.id,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/programok`,
  });

  return NextResponse.json({ url: session.url });
}
