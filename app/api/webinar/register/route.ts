import { NextRequest, NextResponse } from 'next/server';
import { addWebinarContact } from '@/lib/systemio';
import { addWebinarSubscriber, getWebinarById, getWebinarRegistrationCount } from '@/lib/airtable';
import { sendEmail } from '@/lib/resend';
import { WebinarConfirmationEmail } from '@/emails/webinar-confirmation';
import type { WebinarRegisterPayload } from '@/types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email, fullName, webinarId, _hp } = await req.json() as WebinarRegisterPayload & { _hp?: string };

    if (_hp) return NextResponse.json({ ok: true }); // honeypot

    if (!email || !webinarId) {
      return NextResponse.json({ error: 'Email and webinarId required' }, { status: 400 });
    }
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const name = fullName?.trim() || '';

    const [webinar, registrationCount] = await Promise.all([
      getWebinarById(webinarId),
      getWebinarRegistrationCount(webinarId),
    ]);
    if (!webinar) return NextResponse.json({ error: 'Webinar not found' }, { status: 404 });
    if (!webinar.registrationOpen) {
      return NextResponse.json({ error: 'Registration is closed' }, { status: 400 });
    }
    if (webinar.maxParticipants > 0 && registrationCount >= webinar.maxParticipants) {
      return NextResponse.json({ error: 'A webinár betelt.' }, { status: 400 });
    }

    await Promise.allSettled([
      addWebinarContact(email, name, webinarId),
      addWebinarSubscriber({ email, firstName: name, webinarId }),
      sendEmail({
        to: email,
        subject: `Regisztráció megerősítve: ${webinar.title}`,
        template: WebinarConfirmationEmail({ email, firstName: name, webinar }),
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
