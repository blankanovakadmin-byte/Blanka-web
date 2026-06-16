import { NextRequest, NextResponse } from 'next/server';
import { addNewsletterContact } from '@/lib/systemio';
import { addNewsletterSubscriber } from '@/lib/airtable';
import { sendEmail } from '@/lib/resend';
import { NewsletterWelcomeEmail } from '@/emails/newsletter-welcome';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email, fullName, source, _hp } = await req.json() as {
      email: string; fullName?: string; source?: string; _hp?: string;
    };

    if (_hp) return NextResponse.json({ ok: true }); // honeypot

    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (fullName && fullName.length > 200) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    const name = fullName?.trim() || '';

    const [, , emailResult] = await Promise.allSettled([
      addNewsletterContact(email, source, name, undefined),
      addNewsletterSubscriber(email, source, name, undefined),
      sendEmail({
        to: email,
        subject: 'Üdv a közösségben! 🎉',
        template: NewsletterWelcomeEmail({ email, firstName: name }),
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
