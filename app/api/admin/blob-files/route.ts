import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { listFiles } from '@/lib/blob';

export async function GET() {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const files = await listFiles();
    return NextResponse.json(files);
  } catch {
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
