import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { getSettings, setSetting } from '@/lib/airtable';

const ALLOWED_KEYS = [
  'group_mentoring_zoom_url',
  'group_mentoring_schedule',
];

export async function GET() {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const settings = await getSettings(ALLOWED_KEYS);
    return NextResponse.json(settings);
  } catch (e: unknown) {
    const msg = e && typeof e === 'object' && 'message' in e ? String((e as { message: unknown }).message) : 'Failed to fetch settings';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json() as Record<string, string>;
    const updates = Object.entries(body).filter(([k]) => ALLOWED_KEYS.includes(k));
    await Promise.all(updates.map(([k, v]) => setSetting(k, v)));
    revalidatePath('/programok');
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e && typeof e === 'object' && 'message' in e ? String((e as { message: unknown }).message) : 'Failed to save settings';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
