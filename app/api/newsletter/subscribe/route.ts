import { NextRequest, NextResponse } from 'next/server';
import { addNewsletterContact } from '@/lib/systemio';
import { addNewsletterSubscriber } from '@/lib/airtable';
import { sendEmail } from '@/lib/resend';
import { NewsletterWelcomeEmail } from '@/emails/newsletter-welcome';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName, source, _hp } = await req.json() as {
      email: string; firstName?: string; lastName?: string; source?: string; _hp?: string;
    };

    if (_hp) return NextResponse.json({ ok: true }); // honeypot

    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if ((firstName && firstName.length > 100) || (lastName && lastName.length > 100)) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    const [, , emailResult] = await Promise.allSettled([
      addNewsletterContact(email, source, firstName, lastName),
      addNewsletterSubscriber(email, source, firstName, lastName),
      sendEmail({
        to: email,
        subject: 'Üdv a közösségben! 🎉',
        template: NewsletterWelcomeEmail({ email, firstName }),
      }),
    ]);

    if (emailResult.status === 'rejected') {
      console.error('[newsletter] email send failed:', emailResult.reason);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
