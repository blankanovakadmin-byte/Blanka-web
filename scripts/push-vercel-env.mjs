/**
 * Vercel env vars feltöltése a .env.local-ból
 * Futtatás: node scripts/push-vercel-env.mjs
 *
 * Előfeltétel: `npx vercel login` és a projekt linkelve (`npx vercel link`)
 *
 * Kihagyja: NEXT_PUBLIC_BASE_URL (Vercel automatikusan kezeli VERCEL_URL-lel)
 * Stripe értékek is kimaradnak ha üresek.
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dir = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const raw = readFileSync(resolve(__dir, '../.env.local'), 'utf8');
  const vars = {};
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (val) vars[key] = val;
  }
  return vars;
}

// Keys that should NOT be pushed (empty, auto-set by Vercel, or not ready)
const SKIP = new Set([
  'NEXT_PUBLIC_BASE_URL',         // Vercel sets VERCEL_URL automatically
  'STRIPE_SECRET_KEY',            // Not ready yet
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'NEXT_PUBLIC_COURSE_CHECKOUT_URL',
  'NEXT_PUBLIC_STRIPE_INTERVIEW_PRICE_ID',
  'NEXT_PUBLIC_STRIPE_PHRASES_PRICE_ID',
  'RESEND_API_KEY',               // Not ready yet
  'RESEND_FROM_EMAIL',
]);

let vars;
try {
  vars = loadEnv();
} catch {
  console.error('❌  .env.local nem található.');
  process.exit(1);
}

const toUpload = Object.entries(vars).filter(([k]) => !SKIP.has(k));

if (toUpload.length === 0) {
  console.log('ℹ️  Nincs mit feltölteni.');
  process.exit(0);
}

console.log(`\n📤  ${toUpload.length} env var feltöltése Vercelre...\n`);

for (const [key, value] of toUpload) {
  try {
    // vercel env add KEY production < value
    execSync(
      `echo "${value.replace(/"/g, '\\"')}" | npx vercel env add ${key} production`,
      { cwd: resolve(__dir, '..'), stdio: ['pipe', 'inherit', 'pipe'] }
    );
    console.log(`  ✅  ${key}`);
  } catch (err) {
    const msg = err.stderr?.toString() ?? '';
    if (msg.includes('already exists')) {
      // overwrite
      try {
        execSync(`npx vercel env rm ${key} production --yes`, { cwd: resolve(__dir, '..'), stdio: 'pipe' });
        execSync(
          `echo "${value.replace(/"/g, '\\"')}" | npx vercel env add ${key} production`,
          { cwd: resolve(__dir, '..'), stdio: ['pipe', 'inherit', 'pipe'] }
        );
        console.log(`  ♻️   ${key} (felülírva)`);
      } catch (e2) {
        console.log(`  ⚠️   ${key} — nem sikerült: ${e2.message?.slice(0, 80)}`);
      }
    } else {
      console.log(`  ⚠️   ${key} — nem sikerült: ${msg.slice(0, 80)}`);
    }
  }
}

console.log('\n🎉  Vercel env vars feltöltve!\n');
console.log('👉  Futtasd: npx vercel --prod   (hogy az új env vars érvénybe lépjenek)\n');
