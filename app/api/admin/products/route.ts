import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { getAllProductsAdmin } from '@/lib/airtable';
import { getProductBlobMap } from '@/lib/blob';
import Airtable from 'airtable';
import Stripe from 'stripe';

function getBase() {
  return new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);
}
const TABLE = () => process.env.AIRTABLE_PRODUCTS_TABLE || 'Termékek';

function errMsg(e: unknown, fallback: string) {
  if (e && typeof e === 'object' && 'message' in e) {
    const msg = String((e as { message: unknown }).message).trim();
    if (msg) return msg;
  }
  return fallback;
}

export async function GET() {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [products, blobMap] = await Promise.all([
      getAllProductsAdmin(),
      getProductBlobMap().catch(() => ({} as Record<string, string>)),
    ]);
    const enriched = products.map(p => ({ ...p, blobKey: blobMap[p.id] ?? p.blobKey }));
    return NextResponse.json(enriched);
  } catch (e: unknown) {
    return NextResponse.json({ error: errMsg(e, 'Failed to fetch products') }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  console.log('[products/create] handler reached');
  try {
    const ok = await getAdminSession();
    if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await req.formData();

    // Step 1: create Airtable record (no BlobKey — field type incompatible)
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

    const record = await getBase()(TABLE()).create({
      Title: title,
      Description: String(data.get('description') ?? ''),
      Pricing: price,
      Category: category,
      Active: data.get('active') === 'true',
      ...(stripePriceId ? { StripePriceId: stripePriceId } : {}),
    });

    revalidatePath('/forrasok');
    return NextResponse.json({ ok: true, id: record.id });
  } catch (e: unknown) {
    console.error('[products/create]', e);
    return NextResponse.json({ error: errMsg(e, 'Failed to create product') }, { status: 500 });
  }
}
