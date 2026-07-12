import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const tok = process.env.BLOB_READ_WRITE_TOKEN ?? '';
    console.log('[blob-upload] token set:', !!tok, 'len:', tok.length, 'prefix:', tok.slice(0, 18));
    const body = (await req.json()) as HandleUploadBody;

    // Token generation comes from the browser (has admin session).
    // Upload-completion callbacks come from Vercel's servers (no session).
    if ((body as unknown as Record<string, unknown>).type === 'blob.generate-client-token') {
      const ok = await getAdminSession();
      if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
