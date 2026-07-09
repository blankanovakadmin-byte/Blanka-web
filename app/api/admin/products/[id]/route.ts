import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { uploadProductPdf, deleteProductPdf } from '@/lib/blob';
import Airtable, { type FieldSet } from 'airtable';
import Stripe from 'stripe';

function getBase() {
  return new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);
}
const TABLE = () => process.env.AIRTABLE_PRODUCTS_TABLE || 'Termékek';

function errMsg(e: unknown, fallback: string) {
  return e && typeof e === 'object' && 'message' in e ? String((e as {message: unknown}).message) : fallback;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const contentType = req.headers.get('content-type') ?? '';
    let fields: Record<string, unknown> = {};

    if (contentType.includes('multipart/form-data')) {
      const data = await req.formData();
      const title = String(data.get('title') ?? '');
      const price = Number(data.get('price') ?? 0);
      const category = String(data.get('category') ?? 'premium');
      let stripePriceId = data.get('stripePriceId') ? String(data.get('stripePriceId')) : '';

      if (category === 'premium' && price > 0 && !stripePriceId && process.env.STRIPE_SECRET_KEY) {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-05-27.dahlia' });
        const product = await stripe.products.create({ name: title, metadata: { type: 'digital' } });
        const sp = await stripe.prices.create({ product: product.id, unit_amount: price * 100, currency: 'huf' });
        stripePriceId = sp.id;
      }

      fields = {
        Title: title,
        Description: String(data.get('description') ?? ''),
        Pricing: price,
        Category: category,
        Active: data.get('active') === 'true',
        ...(stripePriceId ? { StripePriceId: stripePriceId } : {}),
      };

      const file = data.get('file') as File | null;
      if (file && file.size > 0) {
        if (!['application/pdf'].includes(file.type)) {
          return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
        }
        if (file.size > 50 * 1024 * 1024) {
          return NextResponse.json({ error: 'File too large (max 50MB)' }, { status: 400 });
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        await uploadProductPdf(id, buffer, 'application/pdf');
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
    revalidatePath('/forrasok');
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: errMsg(e, 'Failed to update product') }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    await Promise.allSettled([
      deleteProductPdf(id),
      getBase()(TABLE()).destroy(id),
    ]);
    revalidatePath('/forrasok');
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: errMsg(e, 'Failed to delete product') }, { status: 500 });
  }
}
