import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getAllProductsAdmin } from '@/lib/airtable';
import { uploadFile } from '@/lib/blob';
import Airtable from 'airtable';

function getBase() {
  return new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);
}
const TABLE = () => process.env.AIRTABLE_PRODUCTS_TABLE || 'Termékek';

export async function GET() {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const products = await getAllProductsAdmin();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.formData();
    let blobKey: string | undefined;

    const file = data.get('file') as File | null;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      blobKey = await uploadFile(file.name, buffer, file.type);
    }

    await getBase()(TABLE()).create({
      Title: String(data.get('title') ?? ''),
      Description: String(data.get('description') ?? ''),
      Price: Number(data.get('price') ?? 0),
      Category: String(data.get('category') ?? 'premium'),
      Active: data.get('active') === 'true',
      BlobKey: blobKey,
      StripePriceId: data.get('stripePriceId') ? String(data.get('stripePriceId')) : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
