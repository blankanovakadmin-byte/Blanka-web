import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { getActiveProducts, getActiveCourses, getWebinarById } from '@/lib/airtable';

const BASE = () => process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const priceId = searchParams.get('priceId');
  const type = (searchParams.get('type') ?? 'digital') as 'digital' | 'course' | 'mentoring' | 'group-mentoring' | 'strategy' | 'webinar';
  const webinarId = searchParams.get('webinarId');

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

    if (type === 'digital' && !product) {
      return NextResponse.redirect(new URL('/forrasok', req.url));
    }
    if (type === 'course' && !course) {
      return NextResponse.redirect(new URL('/programok', req.url));
    }
    if (type === 'mentoring' && priceId !== process.env.NEXT_PUBLIC_STRIPE_MENTORING_PRICE_ID) {
      return NextResponse.redirect(new URL('/programok', req.url));
    }
    if (type === 'strategy' && priceId !== process.env.NEXT_PUBLIC_STRIPE_STRATEGY_PRICE_ID) {
      return NextResponse.redirect(new URL('/programok', req.url));
    }
    if (type === 'group-mentoring' && priceId !== process.env.NEXT_PUBLIC_STRIPE_GROUP_MENTORING_PRICE_ID) {
      return NextResponse.redirect(new URL('/programok', req.url));
    }

    let webinar = null;
    if (type === 'webinar' && webinarId) {
      webinar = await getWebinarById(webinarId);
      if (!webinar) return NextResponse.redirect(new URL('/programok', req.url));
    }

    const title = product?.title ?? course?.title ?? webinar?.title ?? (
      type === 'mentoring' ? 'Privát Havi Mentorprogram' :
      type === 'group-mentoring' ? 'Kiscsoportos Havi Mentorprogram' :
      type === 'strategy' ? 'Stratégia konzultáció' : ''
    );

    const stripeType = (type === 'mentoring' || type === 'group-mentoring') ? 'subscription' : type === 'strategy' || type === 'webinar' ? 'digital' : type;

    const { url } = await createCheckoutSession({
      priceId,
      productType: stripeType as 'digital' | 'course' | 'subscription',
      metadata: {
        productType: type,
        productId: product?.id ?? course?.id ?? webinarId ?? '',
        blobKey: product?.blobKey ?? '',
        productTitle: title,
      },
    });

    return NextResponse.redirect(url);
  } catch {
    const fallback = type === 'mentoring' || type === 'group-mentoring' || type === 'course' || type === 'strategy' || type === 'webinar' ? '/programok' : '/forrasok';
    return NextResponse.redirect(new URL(fallback, BASE()));
  }
}
