import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { getActiveProducts, getActiveCourses } from '@/lib/airtable';

const BASE = () => process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const priceId = searchParams.get('priceId');
  const type = (searchParams.get('type') ?? 'digital') as 'digital' | 'course' | 'mentoring' | 'strategy';

  if (!priceId) {
    return NextResponse.redirect(new URL('/forrasok', req.url));
  }

  try {
    const [products, courses] = await Promise.all([
      getActiveProducts(),
      getActiveCourses().catch(() => []),
    ]);

    const product = products.find(p => p.stripePriceId === priceId);
    const course = courses.find(c => c.stripePriceId === priceId);
    const title = product?.title ?? course?.title ?? (type === 'mentoring' ? 'Privát Havi Mentorprogram' : type === 'strategy' ? 'Stratégia konzultáció' : '');

    const stripeType = type === 'mentoring' ? 'subscription' : type === 'strategy' ? 'digital' : type;

    const { url } = await createCheckoutSession({
      priceId,
      productType: stripeType as 'digital' | 'course' | 'subscription',
      metadata: {
        productType: type,
        productId: product?.id ?? course?.id ?? '',
        blobKey: product?.blobKey ?? '',
        productTitle: title,
      },
    });

    return NextResponse.redirect(url);
  } catch {
    const fallback = type === 'mentoring' || type === 'course' || type === 'strategy' ? '/programok' : '/forrasok';
    return NextResponse.redirect(new URL(fallback, BASE()));
  }
}
