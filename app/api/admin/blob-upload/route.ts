import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const ok = await getAdminSession();
    if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = (await req.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname: string) => {
        if (!pathname.startsWith('products/') || !pathname.endsWith('.pdf')) {
          throw new Error('Invalid upload path');
        }
        return {
          allowedContentTypes: ['application/pdf'],
          maximumSizeInBytes: 50 * 1024 * 1024,
        };
      },
      onUploadCompleted: async () => {
        // no server-side action needed after upload
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (e) {
    console.error('[blob-upload]', e);
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
