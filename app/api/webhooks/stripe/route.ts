import { NextRequest, NextResponse } from 'next/server';
import { constructWebhookEvent } from '@/lib/stripe';
import { addPurchaseTag } from '@/lib/systemio';
import { addCoursePurchase, addDigitalPurchase } from '@/lib/airtable';
import { generateSignedUrl } from '@/lib/blob';
import { sendEmail } from '@/lib/resend';
import { CourseWelcomeEmail } from '@/emails/course-welcome';
import { DigitalProductDeliveryEmail } from '@/emails/digital-product-delivery';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = constructWebhookEvent(payload, sig);
  } catch {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email || session.customer_details?.email || '';
    const productType = session.metadata?.productType as string;
    const productId = session.metadata?.productId as string;

    try {
      if (productType === 'course') {
        await Promise.allSettled([
          addPurchaseTag(email, 'course', productId),
          addCoursePurchase({ email, courseId: productId, stripeSessionId: session.id }),
          sendEmail({
            to: email,
            subject: 'Üdvözöljük a Magabiztosan Angolul kurzuson! 🎉',
            template: CourseWelcomeEmail({ email }),
          }),
        ]);
      } else if (productType === 'digital') {
        const blobKey = session.metadata?.blobKey ?? '';
        const productTitle = session.metadata?.productTitle ?? 'Digitális termék';
        const downloadUrl = blobKey ? await generateSignedUrl(blobKey) : '';

        await Promise.allSettled([
          addPurchaseTag(email, 'digital', productId),
          addDigitalPurchase({ email, productId, stripeSessionId: session.id }),
          sendEmail({
            to: email,
            subject: `A letöltésed: ${productTitle}`,
            template: DigitalProductDeliveryEmail({ email, productTitle, downloadUrl }),
          }),
        ]);
      }
    } catch (err) {
      console.error('Stripe webhook handler error:', err);
    }
  }

  return NextResponse.json({ received: true });
}
