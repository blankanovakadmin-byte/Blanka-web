import { NextRequest, NextResponse } from 'next/server';
import { addNewsletterContact } from '@/lib/systemio';
import { addNewsletterSubscriber } from '@/lib/airtable';
import { sendEmail } from '@/lib/resend';
import { NewsletterWelcomeEmail } from '@/emails/newsletter-welcome';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      email: string; fullName?: string; firstName?: string; lastName?: string; source?: string; _hp?: string;
    };

    if (body._hp) return NextResponse.json({ ok: true });

    const email = body.email;
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    let firstName = body.firstName?.trim() || '';
    let lastName = body.lastName?.trim() || '';
    if (!firstName && !lastName && body.fullName) {
      const parts = body.fullName.trim().split(/\s+/);
      lastName = parts[0] || '';
      firstName = parts.slice(1).join(' ') || '';
    }

    const [, , emailResult] = await Promise.allSettled([
      addNewsletterContact(email, body.source, firstName, lastName || undefined),
      addNewsletterSubscriber(email, body.source, firstName, lastName || undefined),
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
