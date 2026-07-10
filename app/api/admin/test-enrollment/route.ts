import { NextRequest, NextResponse } from 'next/server';
import { getActiveCourses } from '@/lib/airtable';
import { addPurchaseTag } from '@/lib/systemio';

export async function POST(req: NextRequest) {
  const adminToken = process.env.ADMIN_TOKEN;
  const auth = req.headers.get('x-admin-token');
  if (!adminToken || auth !== adminToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email } = await req.json() as { email: string };
  if (!email) return NextResponse.json({ error: 'Hiányzó email.' }, { status: 400 });

  const courses = await getActiveCourses();
  const course = courses.find(c => c.systemeioId);
  if (!course?.systemeioId) {
    return NextResponse.json({ error: 'Nincs Systeme.io ID beállítva a kurzusnál.' }, { status: 400 });
  }

  const contact = await addPurchaseTag(email, 'course', course.id, course.systemeioId);

  return NextResponse.json({
    ok: true,
    email,
    contactId: contact.id,
    course: course.title,
    tagAdded: `purchased_course_${course.systemeioId}`,
  });
}
