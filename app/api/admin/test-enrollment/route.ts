import { NextRequest, NextResponse } from 'next/server';
import { getActiveCourses } from '@/lib/airtable';
import { upsertContact, enrollInCourse } from '@/lib/systemio';

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
    return NextResponse.json({ error: 'Nincs Systeme.io ID beállítva a kurzusnál. Ellenőrizd az Airtable SystemeioId mezőt.' }, { status: 400 });
  }

  const contact = await upsertContact({ email });
  await enrollInCourse(contact.id, course.systemeioId);

  return NextResponse.json({
    ok: true,
    email,
    contactId: contact.id,
    course: course.title,
    systemeioId: course.systemeioId,
  });
}
