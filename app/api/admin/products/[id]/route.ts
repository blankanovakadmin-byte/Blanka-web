import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { uploadFile, deleteFile } from '@/lib/blob';
import Airtable, { type FieldSet } from 'airtable';

function getBase() {
  return new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);
}
const TABLE = () => process.env.AIRTABLE_PRODUCTS_TABLE || 'Termékek';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const contentType = req.headers.get('content-type') ?? '';
    let fields: Record<string, unknown> = {};

    if (contentType.includes('multipart/form-data')) {
      const data = await req.formData();
      fields = {
        Title: String(data.get('title') ?? ''),
        Description: String(data.get('description') ?? ''),
        Pricing: Number(data.get('price') ?? 0),
        Category: String(data.get('category') ?? 'premium'),
        Active: data.get('active') === 'true',
        StripePriceId: data.get('stripePriceId') ? String(data.get('stripePriceId')) : undefined,
      };

      const file = data.get('file') as File | null;
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        fields.BlobKey = await uploadFile(file.name, buffer, file.type);
      }
    } else {
      const body = await req.json();
      fields = {
        Title: body.title,
        Description: body.description,
        Pricing: body.price,
        Category: body.category,
        Active: body.active,
        ...(body.stripePriceId !== undefined ? { StripePriceId: body.stripePriceId } : {}),
      };
    }

    await getBase()(TABLE()).update(id, fields as Partial<FieldSet>);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const record = await getBase()(TABLE()).find(id);
    const blobKey = record.fields['BlobKey'] as string | undefined;
    if (blobKey) await deleteFile(blobKey);
    await getBase()(TABLE()).destroy(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
