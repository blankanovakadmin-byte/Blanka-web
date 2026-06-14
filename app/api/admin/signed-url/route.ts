import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { generateSignedUrl } from '@/lib/blob';

export async function POST(req: NextRequest) {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { blobUrl } = await req.json();
    if (!blobUrl) return NextResponse.json({ error: 'blobUrl required' }, { status: 400 });

    const signedUrl = await generateSignedUrl(blobUrl);
    return NextResponse.json({ signedUrl });
  } catch {
    return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 });
  }
}
