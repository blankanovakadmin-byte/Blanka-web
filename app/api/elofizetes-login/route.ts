import { NextRequest, NextResponse } from 'next/server';

const COOKIE = 'elofizetes_auth';

export async function POST(req: NextRequest) {
  const { password } = await req.json() as { password?: string };
  const correct = process.env.SUBSCRIPTION_PAGE_PASSWORD;

  if (!correct || !password || password !== correct) {
    return NextResponse.json({ error: 'Hibás jelszó.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, correct, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
