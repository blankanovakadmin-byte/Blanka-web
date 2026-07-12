import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

function parseCookieHeader(header: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx < 0) continue;
    out[part.slice(0, idx).trim()] = part.slice(idx + 1).trim();
  }
  return out;
}

function verifySession(cookieHeader: string): boolean {
  const token = parseCookieHeader(cookieHeader)['blanka_admin_session'];
  const adminToken = process.env.ADMIN_TOKEN;
  if (!token || !adminToken) return false;
  return token === adminToken;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!verifySession(req.headers.get('cookie') ?? '')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;
    const recordId = form.get('recordId') as string | null;

    if (!file || !recordId) {
      return NextResponse.json({ error: 'Missing file or recordId' }, { status: 400 });
    }

    const { url } = await put(`products/${recordId}.pdf`, file, {
      access: 'public',
      contentType: 'application/pdf',
      addRandomSuffix: false,
    });

    return NextResponse.json({ url });
  } catch (e) {
    console.error('[upload-pdf]', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
