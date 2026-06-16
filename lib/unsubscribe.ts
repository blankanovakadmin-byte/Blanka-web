import crypto from 'crypto';

function secret(): string {
  const s = process.env.UNSUBSCRIBE_SECRET || process.env.ADMIN_TOKEN;
  if (!s) throw new Error('UNSUBSCRIBE_SECRET or ADMIN_TOKEN env var must be set');
  return s;
}

export function createUnsubscribeToken(email: string): string {
  return crypto.createHmac('sha256', secret()).update(email.toLowerCase()).digest('hex').slice(0, 24);
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  const expected = createUnsubscribeToken(email);
  try {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function unsubscribeUrl(email: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com';
  const token = createUnsubscribeToken(email);
  return `${base}/leiratkozas?email=${encodeURIComponent(email)}&t=${token}`;
}
