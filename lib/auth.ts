import { cookies } from 'next/headers';
import crypto from 'crypto';

const SESSION_COOKIE = 'blanka_admin_session';
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

export function verifyAdminToken(token: string): boolean {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken || adminToken.length < 32) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(adminToken);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (!session) return false;
  return verifyAdminToken(session.value);
}

export async function setAdminSession(token: string): Promise<boolean> {
  if (!verifyAdminToken(token)) return false;
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  });
  return true;
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
