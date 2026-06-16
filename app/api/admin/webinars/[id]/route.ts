import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { updateWebinar, deleteWebinar } from '@/lib/airtable';
import type { Webinar } from '@/types';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    const body = await req.json() as Partial<Omit<Webinar, 'id'>>;
    await updateWebinar(id, body);
    revalidatePath('/');
    revalidatePath('/programok');
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed to update webinar' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    await deleteWebinar(id);
    revalidatePath('/');
    revalidatePath('/programok');
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed to delete webinar' }, { status: 500 });
  }
}
