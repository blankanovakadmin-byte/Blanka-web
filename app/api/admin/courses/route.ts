import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { getAllCoursesAdmin, createCourse } from '@/lib/airtable';
import type { Course } from '@/types';

function errMsg(e: unknown, fallback: string) {
  return e && typeof e === 'object' && 'message' in e ? String((e as { message: unknown }).message) : fallback;
}

export async function GET() {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const courses = await getAllCoursesAdmin();
    return NextResponse.json(courses);
  } catch (e: unknown) {
    return NextResponse.json({ error: errMsg(e, 'Failed to fetch courses') }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json() as Omit<Course, 'id'>;
    const id = await createCourse(body);
    revalidatePath('/programok');
    return NextResponse.json({ id });
  } catch (e: unknown) {
    return NextResponse.json({ error: errMsg(e, 'Failed to create course') }, { status: 500 });
  }
}
