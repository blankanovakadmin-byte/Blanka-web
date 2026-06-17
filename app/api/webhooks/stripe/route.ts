import { NextRequest, NextResponse } from 'next/server';
import { constructWebhookEvent } from '@/lib/stripe';
import { addPurchaseTag } from '@/lib/systemio';
import { addCoursePurchase, addDigitalPurchase } from '@/lib/airtable';
import { generateSignedUrl } from '@/lib/blob';
import { sendEmail } from '@/lib/resend';
import { CourseWelcomeEmail } from '@/emails/course-welcome';
import { DigitalProductDeliveryEmail } from '@/emails/digital-product-delivery';
import { MentoringBookingEmail } from '@/emails/mentoring-booking';
import { GroupMentoringBookingEmail } from '@/emails/group-mentoring-booking';
import { StrategiaBookingEmail } from '@/emails/strategia-booking';
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
    const customerName = session.customer_details?.name || undefined;

    try {
      if (productType === 'course') {
        const courseTitle = session.metadata?.productTitle || 'Kurzus';
        await Promise.allSettled([
          addPurchaseTag(email, 'course', productId),
          addCoursePurchase({ email, courseId: productId, stripeSessionId: session.id }),
          sendEmail({
            to: email,
            subject: `Üdvözöllek a(z) ${courseTitle} kurzuson! 🎉`,
            template: CourseWelcomeEmail({ email, name: customerName, courseTitle }),
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
      } else if (productType === 'mentoring' && session.mode === 'subscription') {
        await Promise.allSettled([
          sendEmail({
            to: email,
            subject: 'Foglald le a havi két alkalmadat! 📅',
            template: MentoringBookingEmail({ email, name: customerName }),
          }),
        ]);
      } else if (productType === 'group-mentoring' && session.mode === 'subscription') {
        const schedule = session.metadata?.groupSchedule || process.env.NEXT_PUBLIC_GROUP_MENTORING_SCHEDULE || '';
        const zoomLink = process.env.NEXT_PUBLIC_GROUP_MENTORING_ZOOM_URL || '';
        await Promise.allSettled([
          sendEmail({
            to: email,
            subject: 'Üdv a kiscsoportos mentorprogramban! 🎉',
            template: GroupMentoringBookingEmail({ email, name: customerName, nextSessionDate: schedule, zoomLink }),
          }),
        ]);
      } else if (productType === 'strategy') {
        await Promise.allSettled([
          sendEmail({
            to: email,
            subject: 'Foglald le a stratégia konzultációdat! 📅',
            template: StrategiaBookingEmail({ email, name: customerName }),
          }),
        ]);
      }
    } catch (err) {
      console.error('Stripe webhook handler error:', err);
    }
  }

  // Recurring mentoring payment — send booking/reminder emails every month
  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object as Stripe.Invoice;
    // Skip the first invoice (already handled by checkout.session.completed)
    if (invoice.billing_reason === 'subscription_create') {
      return NextResponse.json({ received: true });
    }

    const email = invoice.customer_email || '';
    const customerName = typeof invoice.customer_name === 'string' ? invoice.customer_name : undefined;
    const subDetails = (invoice as unknown as { subscription_details?: { metadata?: Record<string, string> } }).subscription_details;
    const productType = subDetails?.metadata?.productType || '';

    if (email) {
      try {
        if (productType === 'group-mentoring') {
          const schedule = process.env.NEXT_PUBLIC_GROUP_MENTORING_SCHEDULE || '';
          const zoomLink = process.env.NEXT_PUBLIC_GROUP_MENTORING_ZOOM_URL || '';
          await sendEmail({
            to: email,
            subject: 'Új hónap a kiscsoportos mentorprogramban! 📅',
            template: GroupMentoringBookingEmail({ email, name: customerName, nextSessionDate: schedule, zoomLink }),
          });
        } else {
          await sendEmail({
            to: email,
            subject: 'Új hónap, új alkalmak - foglald le időpontjaidat! 📅',
            template: MentoringBookingEmail({ email, name: customerName }),
          });
        }
      } catch (err) {
        console.error('Mentoring renewal email error:', err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
