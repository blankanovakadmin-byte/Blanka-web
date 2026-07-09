import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { updateCourse, deleteCourse } from '@/lib/airtable';
import type { Course } from '@/types';

function errMsg(e: unknown, fallback: string) {
  return e && typeof e === 'object' && 'message' in e ? String((e as { message: unknown }).message) : fallback;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    const body = await req.json() as Partial<Omit<Course, 'id'>>;
    await updateCourse(id, body);
    revalidatePath('/programok');
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: errMsg(e, 'Failed to update course') }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    await deleteCourse(id);
    revalidatePath('/programok');
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: errMsg(e, 'Failed to delete course') }, { status: 500 });
  }
}
