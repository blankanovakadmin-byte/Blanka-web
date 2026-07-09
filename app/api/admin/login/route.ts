import { NextRequest, NextResponse } from 'next/server';
import { setAdminSession } from '@/lib/auth';

const attempts = new Map<string, { count: number; until: number }>();
const MAX_ATTEMPTS = 10;
const LOCKOUT_MS = 15 * 60 * 1000;

function getIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
}

function isLocked(ip: string): boolean {
  const e = attempts.get(ip);
  if (!e) return false;
  if (Date.now() > e.until) { attempts.delete(ip); return false; }
  return e.count >= MAX_ATTEMPTS;
}

function recordFailure(ip: string) {
  const e = attempts.get(ip);
  if (!e || Date.now() > e.until) {
    attempts.set(ip, { count: 1, until: Date.now() + LOCKOUT_MS });
  } else {
    e.count++;
  }
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (isLocked(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
  }

  try {
    const { token } = await req.json();
    if (!token) return NextResponse.json({ error: 'Token required' }, { status: 400 });

    const ok = await setAdminSession(token);
    if (!ok) {
      recordFailure(ip);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    attempts.delete(ip);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
