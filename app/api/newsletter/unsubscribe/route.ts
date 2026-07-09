import { NextRequest, NextResponse } from 'next/server';
import { verifyUnsubscribeToken } from '@/lib/unsubscribe';
import { systemeUnsubscribe } from '@/lib/systemio';
import { airtableUnsubscribe } from '@/lib/airtable';

export async function POST(req: NextRequest) {
  try {
    const { email, token } = await req.json() as { email: string; token: string };

    if (!email || !token) {
      return NextResponse.json({ error: 'Missing params' }, { status: 400 });
    }
    if (!verifyUnsubscribeToken(email, token)) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }

    await Promise.allSettled([
      systemeUnsubscribe(email),
      airtableUnsubscribe(email),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
