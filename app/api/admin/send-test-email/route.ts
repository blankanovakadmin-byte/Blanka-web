import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/resend';
import { MentoringBookingEmail } from '@/emails/mentoring-booking';

export async function POST(req: NextRequest) {
  const adminToken = process.env.ADMIN_TOKEN;
  const auth = req.headers.get('x-admin-token');
  if (!adminToken || auth !== adminToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { to, name } = await req.json() as { to: string; name?: string };
  if (!to) return NextResponse.json({ error: 'Hiányzó email cím.' }, { status: 400 });

  await sendEmail({
    to,
    subject: 'Foglald le a havi két alkalmadat! 📅',
    template: MentoringBookingEmail({ email: to, name: name || 'Márton' }),
  });

  return NextResponse.json({ ok: true, sent_to: to });
}
