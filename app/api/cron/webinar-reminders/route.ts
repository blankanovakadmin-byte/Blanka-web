import { NextRequest, NextResponse } from 'next/server';
import { getUpcomingWebinars } from '@/lib/airtable';
import { getContactsByTag } from '@/lib/systemio';
import { sendEmail } from '@/lib/resend';
import { WebinarReminder24hEmail } from '@/emails/webinar-reminder-24h';
import { WebinarReminder1hEmail } from '@/emails/webinar-reminder-1h';

export async function GET(req: NextRequest) {
  // Verify cron secret (Vercel passes it automatically, but check for extra security)
  const authHeader = req.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const webinars = await getUpcomingWebinars();
    const now = new Date();
    let sent = 0;

    const emailPromises: Promise<void>[] = [];

    for (const webinar of webinars) {
      const webinarStart = new Date(`${webinar.date}T${webinar.time || '00:00'}:00+02:00`);
      const hoursUntil = (webinarStart.getTime() - now.getTime()) / (1000 * 60 * 60);

      const is24h = hoursUntil >= 23 && hoursUntil <= 25;
      const is1h  = hoursUntil >= 0.75 && hoursUntil <= 1.25;

      if (!is24h && !is1h) continue;

      const tag = `webinar_${webinar.id}`;
      const contacts = await getContactsByTag(tag);

      for (const contact of contacts) {
        if (is24h) {
          emailPromises.push(sendEmail({
            to: contact.email,
            subject: `Holnap: ${webinar.title} - ne felejtsd el!`,
            template: WebinarReminder24hEmail({ email: contact.email, firstName: contact.firstName, webinar }),
          }));
          sent++;
        } else if (is1h) {
          emailPromises.push(sendEmail({
            to: contact.email,
            subject: `1 óra múlva kezdődik: ${webinar.title}!`,
            template: WebinarReminder1hEmail({ email: contact.email, firstName: contact.firstName, webinar }),
          }));
          sent++;
        }
      }
    }

    await Promise.allSettled(emailPromises);

    return NextResponse.json({ ok: true, remindersSent: sent });
  } catch (err) {
    console.error('Cron webinar-reminders error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
