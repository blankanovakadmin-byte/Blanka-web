import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { getActiveProducts } from '@/lib/airtable';

const BASE = () => process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const priceId = searchParams.get('priceId');
  const type = (searchParams.get('type') ?? 'digital') as 'digital' | 'course';

  if (!priceId) {
    return NextResponse.redirect(new URL('/forrasok', req.url));
  }

  try {
    const products = await getActiveProducts();
    const product = products.find(p => p.stripePriceId === priceId);

    const { url } = await createCheckoutSession({
      priceId,
      productType: type,
      metadata: {
        productType: type,
        productId: product?.id ?? '',
        blobKey: product?.blobKey ?? '',
        productTitle: product?.title ?? '',
      },
    });

    return NextResponse.redirect(url);
  } catch {
    const fallback = type === 'course' ? '/programok' : '/forrasok';
    return NextResponse.redirect(new URL(fallback, BASE()));
  }
}
