import { handleUploadPresigned, type HandleUploadPresignedBody } from '@vercel/blob/client';
import { issueSignedToken } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import Airtable from 'airtable';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as HandleUploadPresignedBody;

    // Token generation comes from the browser (has admin session).
    // Upload-completion callbacks come from Vercel's servers (no session).
    if ((body as unknown as Record<string, unknown>).type === 'blob.generate-presigned-url') {
      const ok = await getAdminSession();
      if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const jsonResponse = await handleUploadPresigned({
      body,
      request: req,
      getSignedToken: async (pathname: string) => {
        if (!pathname.startsWith('products/') || !pathname.endsWith('.pdf')) {
          throw new Error('Invalid upload path');
        }
        const token = await issueSignedToken({
          operations: ['put'],
          pathname,
          allowedContentTypes: ['application/pdf'],
          maximumSizeInBytes: 50 * 1024 * 1024,
        });
        return {
          token,
          urlOptions: {
            access: 'public' as const,
            addRandomSuffix: false,
          },
        };
      },
      onUploadCompleted: async ({ blob }) => {
        try {
          const match = blob.pathname.match(/^products\/([^/]+)\.pdf$/);
          if (match) {
            const recordId = match[1];
            const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);
            await base(process.env.AIRTABLE_PRODUCTS_TABLE || 'Termékek').update(recordId, { BlobKey: blob.url });
          }
        } catch (e) {
          console.error('[blob-upload] BlobKey save failed:', e);
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (e) {
    console.error('[blob-upload]', e);
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
