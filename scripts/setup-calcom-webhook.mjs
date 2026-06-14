/**
 * Cal.com webhook regisztrálás
 * Futtatás: node scripts/setup-calcom-webhook.mjs
 *
 * Szükséges: CAL_API_KEY a .env.local-ban (Cal.com → Settings → Developer → API Keys)
 * A CAL_WEBHOOK_SECRET értéket automatikusan generálja és kiírja.
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomBytes } from 'crypto';

const __dir = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  try {
    const raw = readFileSync(resolve(__dir, '../.env.local'), 'utf8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    console.error('❌  .env.local nem található.');
    process.exit(1);
  }
}

loadEnv();

const CAL_API_KEY = process.env.CAL_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com';

if (!CAL_API_KEY) {
  console.log(`
ℹ️  Cal.com API key nincs beállítva (CAL_API_KEY).

Manuális beállítás:
1. cal.com → Settings → Developer → Webhooks → New Webhook
2. Payload URL: ${BASE_URL}/api/webhooks/cal
3. Events: BOOKING_CREATED
4. Secret: generálj egyet (pl. openssl rand -hex 32) és másold a CAL_WEBHOOK_SECRET-be
5. A CAL_WEBHOOK_SECRET értéket add hozzá a .env.local-ba ÉS a Vercel env vars-ba
`);
  process.exit(0);
}

const secret = randomBytes(32).toString('hex');
const webhookUrl = `${BASE_URL}/api/webhooks/cal`;

console.log(`\nWebhook URL: ${webhookUrl}`);
console.log(`Generált secret: ${secret}`);
console.log('\nWebhook regisztrálása Cal.com API-n...\n');

const res = await fetch('https://api.cal.com/v1/webhooks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${CAL_API_KEY}`,
  },
  body: JSON.stringify({
    subscriberUrl: webhookUrl,
    eventTriggers: ['BOOKING_CREATED'],
    active: true,
    secret,
    payloadTemplate: null,
  }),
});

if (!res.ok) {
  const err = await res.text();
  console.error(`❌  Cal.com API hiba: ${res.status}: ${err}`);
  process.exit(1);
}

const data = await res.json();
console.log(`✅  Webhook regisztrálva (ID: ${data.webhook?.id ?? data.id})`);
console.log(`\n👉  Add hozzá a .env.local-hoz és a Vercel env vars-hoz:`);
console.log(`CAL_WEBHOOK_SECRET=${secret}\n`);
