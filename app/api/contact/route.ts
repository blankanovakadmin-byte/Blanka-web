import { NextRequest, NextResponse } from 'next/server';
import { sendContactNotification } from '@/lib/resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, _hp } = await req.json();

    if (_hp) return NextResponse.json({ ok: true }); // honeypot

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (name.length > 100 || message.length > 5000) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    await sendContactNotification({ name, email, message });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
