import { NextRequest, NextResponse } from 'next/server';
import { getWebinarById, getWebinarRegistrationCount } from '@/lib/airtable';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const [webinar, registrationCount] = await Promise.all([
    getWebinarById(id),
    getWebinarRegistrationCount(id),
  ]);
  if (!webinar) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { zoomLink: _omit, ...publicWebinar } = webinar;
  return NextResponse.json({ ...publicWebinar, registrationCount });
}
