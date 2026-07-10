import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/resend';
import { MentoringBookingEmail } from '@/emails/mentoring-booking';
import { CourseWelcomeEmail } from '@/emails/course-welcome';
import { getActiveCourses } from '@/lib/airtable';

export async function POST(req: NextRequest) {
  const adminToken = process.env.ADMIN_TOKEN;
  const auth = req.headers.get('x-admin-token');
  if (!adminToken || auth !== adminToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { to, name, type } = await req.json() as { to: string; name?: string; type?: string };
  if (!to) return NextResponse.json({ error: 'Hiányzó email cím.' }, { status: 400 });

  if (type === 'course') {
    const courses = await getActiveCourses();
    const course = courses[0];
    await sendEmail({
      to,
      subject: `Üdvözöllek a(z) ${course?.title ?? 'Magabiztosan Angolul'} kurzuson! 🎉`,
      template: CourseWelcomeEmail({
        email: to,
        name: name || 'Márton',
        courseTitle: course?.title ?? 'Magabiztosan Angolul',
        courseUrl: course?.systemeioUrl,
      }),
    });
    return NextResponse.json({ ok: true, sent_to: to, type: 'course' });
  }

  // Default: mentoring booking email
  await sendEmail({
    to,
    subject: 'Foglald le a havi két alkalmadat! 📅',
    template: MentoringBookingEmail({ email: to, name: name || 'Márton' }),
  });
  return NextResponse.json({ ok: true, sent_to: to, type: 'mentoring' });
}
