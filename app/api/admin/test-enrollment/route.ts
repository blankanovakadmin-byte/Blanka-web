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

  // Call Systeme.io memberships API directly to see the raw response
  const res = await fetch('https://api.systeme.io/api/memberships', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.SYSTEMIO_API_KEY!,
    },
    body: JSON.stringify({ contact_id: contact.id, course_id: Number(course.systemeioId) }),
  });
  const responseText = await res.text();
  let responseBody: unknown;
  try { responseBody = JSON.parse(responseText); } catch { responseBody = responseText; }

  return NextResponse.json({
    ok: res.ok,
    status: res.status,
    email,
    contactId: contact.id,
    course: course.title,
    systemeioId: course.systemeioId,
    systemeioResponse: responseBody,
  });
}
