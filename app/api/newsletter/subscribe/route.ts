import { NextRequest, NextResponse } from 'next/server';
import { addNewsletterContact } from '@/lib/systemio';
import { addNewsletterSubscriber } from '@/lib/airtable';
import { sendEmail } from '@/lib/resend';
import { NewsletterWelcomeEmail } from '@/emails/newsletter-welcome';

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, source } = await req.json() as { email: string; firstName?: string; source?: string };
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    await Promise.allSettled([
      addNewsletterContact(email, source, firstName),
      addNewsletterSubscriber(email, source, firstName),
      sendEmail({
        to: email,
        subject: 'Üdv a közösségben! 🎉',
        template: NewsletterWelcomeEmail({ email, firstName }),
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
