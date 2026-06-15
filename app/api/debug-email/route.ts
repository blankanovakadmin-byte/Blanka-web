import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'info@blankanovak.com';

  if (!apiKey) return NextResponse.json({ error: 'RESEND_API_KEY missing' });

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: `Novák Blanka <${fromEmail}>`,
    to: 'info@optimeyes.hu',
    subject: 'Debug teszt',
    html: '<p>Debug email a production szerverről.</p>',
  });

  return NextResponse.json({
    apiKeyPrefix: apiKey.substring(0, 10),
    from: fromEmail,
    data,
    error,
  });
}
