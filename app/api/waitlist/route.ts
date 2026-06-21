import { NextRequest, NextResponse } from 'next/server';
import { addNewsletterSubscriber } from '@/lib/airtable';
import { sendEmail } from '@/lib/resend';
import { WaitlistConfirmationEmail } from '@/emails/waitlist-confirmation';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email, fullName, program, _hp } = await req.json();

    if (_hp) return NextResponse.json({ ok: true });
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Érvényes email címet adj meg.' }, { status: 400 });
    }

    const parts = (fullName || '').split(' ');
    const lastName = parts[0] || '';
    const firstName = parts.slice(1).join(' ') || '';
    const tag = `varolista_${program || 'kiscsoportos'}`;

    await Promise.allSettled([
      addNewsletterSubscriber(email, tag, firstName, lastName),
      sendEmail({
        to: email,
        subject: 'Felkerültél a várólistára! ✨',
        template: WaitlistConfirmationEmail({ email, name: firstName || undefined, program: program || 'Kiscsoportos Mentorprogram' }),
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Hiba történt.' }, { status: 500 });
  }
}
