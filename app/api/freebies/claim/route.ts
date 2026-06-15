import { NextRequest, NextResponse } from 'next/server';
import { addFreebieContact } from '@/lib/systemio';
import { generateSignedUrl } from '@/lib/blob';
import { sendEmail } from '@/lib/resend';
import { FreebieDeliveryEmail } from '@/emails/freebie-delivery';
import { getActiveProducts } from '@/lib/airtable';
import type { FreebieClaimPayload } from '@/types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email, productId, _hp } = await req.json() as FreebieClaimPayload & { _hp?: string };

    if (_hp) return NextResponse.json({ ok: true }); // honeypot

    if (!email || !productId) {
      return NextResponse.json({ error: 'Email and productId required' }, { status: 400 });
    }
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const products = await getActiveProducts();
    const product = products.find(p => p.id === productId && p.category === 'free');
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    if (!product.blobKey) {
      return NextResponse.json({ error: 'Download not available yet' }, { status: 503 });
    }

    const downloadUrl = await generateSignedUrl(product.blobKey);

    await Promise.allSettled([
      addFreebieContact(email, productId),
      sendEmail({
        to: email,
        subject: `A te letöltésed: ${product.title}`,
        template: FreebieDeliveryEmail({ email, productTitle: product.title, downloadUrl }),
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
