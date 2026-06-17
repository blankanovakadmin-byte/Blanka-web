import { NextRequest, NextResponse } from 'next/server';
import { constructWebhookEvent } from '@/lib/stripe';
import { addPurchaseTag } from '@/lib/systemio';
import { addCoursePurchase, addDigitalPurchase, getSettings } from '@/lib/airtable';
import { generateSignedUrl } from '@/lib/blob';
import { sendEmail } from '@/lib/resend';
import { CourseWelcomeEmail } from '@/emails/course-welcome';
import { DigitalProductDeliveryEmail } from '@/emails/digital-product-delivery';
import { MentoringBookingEmail } from '@/emails/mentoring-booking';
import { GroupMentoringBookingEmail } from '@/emails/group-mentoring-booking';
import { StrategiaBookingEmail } from '@/emails/strategia-booking';
import { PaymentFailedEmail } from '@/emails/payment-failed';
import { SubscriptionCancelledEmail } from '@/emails/subscription-cancelled';
import { RefundNotificationEmail } from '@/emails/refund-notification';
import Stripe from 'stripe';

const BLANKA_EMAIL = process.env.RESEND_FROM_EMAIL || 'info@blankanovak.com';

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
        const s = await getSettings(['group_mentoring_schedule', 'group_mentoring_zoom_url']);
        await Promise.allSettled([
          sendEmail({
            to: email,
            subject: 'Üdv a kiscsoportos mentorprogramban! 🎉',
            template: GroupMentoringBookingEmail({ email, name: customerName, nextSessionDate: s.group_mentoring_schedule, zoomLink: s.group_mentoring_zoom_url }),
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

  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as Stripe.Invoice;
    const email = invoice.customer_email || '';
    const customerName = typeof invoice.customer_name === 'string' ? invoice.customer_name : undefined;

    if (email) {
      try {
        await sendEmail({
          to: email,
          subject: '⚠️ Sikertelen fizetés – kérlek, frissítsd az adataidat',
          template: PaymentFailedEmail({ email, name: customerName }),
        });
      } catch (err) {
        console.error('Payment failed email error:', err);
      }
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    const productType = subscription.metadata?.productType || '';

    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' });
      const customer = typeof subscription.customer === 'string'
        ? await stripe.customers.retrieve(subscription.customer)
        : subscription.customer;

      const email = !customer.deleted && customer.email ? customer.email : '';
      const name = !customer.deleted && customer.name ? customer.name : undefined;

      if (email) {
        await sendEmail({
          to: BLANKA_EMAIL,
          subject: `Lemondás: ${name || email}`,
          template: SubscriptionCancelledEmail({ customerEmail: email, customerName: name, productType }),
        });
      }
    } catch (err) {
      console.error('Subscription cancelled notification error:', err);
    }
  }

  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription;

    if (subscription.status === 'past_due' || subscription.status === 'unpaid') {
      try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' });
        const customer = typeof subscription.customer === 'string'
          ? await stripe.customers.retrieve(subscription.customer)
          : subscription.customer;

        const email = !customer.deleted && customer.email ? customer.email : '';
        const name = !customer.deleted && customer.name ? customer.name : undefined;

        if (email) {
          await sendEmail({
            to: email,
            subject: '⚠️ Sikertelen fizetés – kérlek, frissítsd az adataidat',
            template: PaymentFailedEmail({ email, name }),
          });
        }
      } catch (err) {
        console.error('Subscription updated email error:', err);
      }
    }
  }

  if (event.type === 'charge.refunded') {
    const charge = event.data.object as Stripe.Charge;
    const email = charge.billing_details?.email || '';
    const amountRefunded = (charge.amount_refunded / 100).toLocaleString('hu-HU') + ' ' + charge.currency.toUpperCase();
    const reason = typeof charge.refunds?.data?.[0]?.reason === 'string' ? charge.refunds.data[0].reason : undefined;

    try {
      await sendEmail({
        to: BLANKA_EMAIL,
        subject: `Visszatérítés: ${email} – ${amountRefunded}`,
        template: RefundNotificationEmail({ customerEmail: email || 'ismeretlen', amount: amountRefunded, reason }),
      });
    } catch (err) {
      console.error('Refund notification error:', err);
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
          const s = await getSettings(['group_mentoring_schedule', 'group_mentoring_zoom_url']);
          await sendEmail({
            to: email,
            subject: 'Új hónap a kiscsoportos mentorprogramban! 📅',
            template: GroupMentoringBookingEmail({ email, name: customerName, nextSessionDate: s.group_mentoring_schedule, zoomLink: s.group_mentoring_zoom_url }),
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
