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
  const apiKey = process.env.SYSTEMIO_API_KEY!;
  const courseIdNum = Number(course.systemeioId);

  async function tryEndpoint(path: string, body: unknown) {
    const r = await fetch(`https://api.systeme.io/api${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify(body),
    });
    const text = await r.text();
    let json: unknown;
    try { json = JSON.parse(text); } catch { json = text.slice(0, 200); }
    return { status: r.status, ok: r.ok, body: json };
  }

  const results = await Promise.all([
    tryEndpoint('/memberships', { contact_id: contact.id, course_id: courseIdNum }),
    tryEndpoint('/course_student_enrollments', { contactId: contact.id, courseId: courseIdNum }),
    tryEndpoint(`/courses/${courseIdNum}/enrollments`, { contactId: contact.id }),
    tryEndpoint('/enrollments', { contact_id: contact.id, course_id: courseIdNum }),
  ]);

  return NextResponse.json({
    email,
    contactId: contact.id,
    course: course.title,
    systemeioId: course.systemeioId,
    endpoints: {
      '/memberships (snake)': results[0],
      '/course_student_enrollments (camel)': results[1],
      '/courses/{id}/enrollments': results[2],
      '/enrollments (snake)': results[3],
    },
  });
}
