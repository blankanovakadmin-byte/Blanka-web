import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { addBookingTag } from '@/lib/systemio';
import { sendEmail } from '@/lib/resend';
import { BookingConfirmationEmail } from '@/emails/booking-confirmation';
import type { CalBookingPayload } from '@/types';

function verifyCalSignature(payload: string, signature: string): boolean {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) return process.env.NODE_ENV !== 'production';
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get('x-cal-signature-256') || '';

  if (!verifyCalSignature(payload, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const body = JSON.parse(payload) as CalBookingPayload;

  if (body.triggerEvent === 'BOOKING_CREATED') {
    const attendee = body.payload.attendees[0];
    if (attendee?.email) {
      await Promise.allSettled([
        addBookingTag(attendee.email),
        sendEmail({
          to: attendee.email,
          subject: 'Foglalás megerősítve | Novák Blanka',
          template: BookingConfirmationEmail({
            email: attendee.email,
            name: attendee.name,
            eventTitle: body.payload.eventType.title,
            startTime: body.payload.startTime,
          }),
        }),
      ]);
    }
  }

  return NextResponse.json({ received: true });
}
