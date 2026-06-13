import { NextRequest, NextResponse } from 'next/server';
import { getWebinarById } from '@/lib/airtable';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const webinar = await getWebinarById(id);
  if (!webinar) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(webinar);
}
