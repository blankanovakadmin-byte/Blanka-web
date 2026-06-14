/**
 * Airtable tábla setup script
 * Futtatás: node scripts/setup-airtable.mjs
 *
 * Létrehozza:
 *  - Vélemények tábla (ha még nem létezik)
 *  - Tags + ImageUrl mezők a Termékek táblában (ha még nem léteznek)
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually
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
    console.error('❌  .env.local nem található. Másold a .env.local.example-t!');
    process.exit(1);
  }
}

loadEnv();

const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!API_KEY || !BASE_ID || API_KEY.startsWith('pat...') || BASE_ID.startsWith('appXXX')) {
  console.error('❌  Töltsd ki az AIRTABLE_API_KEY és AIRTABLE_BASE_ID értékeket a .env.local-ban!');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};

async function airtable(path, method = 'GET', body) {
  const res = await fetch(`https://api.airtable.com/v0/meta${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Airtable API ${method} ${path} → ${res.status}: ${err}`);
  }
  return res.json();
}

async function getTables() {
  const { tables } = await airtable(`/bases/${BASE_ID}/tables`);
  return tables;
}

async function createTable(name, fields) {
  return airtable(`/bases/${BASE_ID}/tables`, 'POST', { name, fields });
}

async function addField(tableId, field) {
  return airtable(`/bases/${BASE_ID}/tables/${tableId}/fields`, 'POST', field);
}

// ─── Main ────────────────────────────────────────────────────────

const tables = await getTables();
console.log(`\nTalált táblák: ${tables.map(t => t.name).join(', ')}\n`);

// 1. Vélemények tábla
const TESTI_NAME = process.env.AIRTABLE_TESTIMONIALS_TABLE || 'Vélemények';
const testiTable = tables.find(t => t.name === TESTI_NAME);

if (testiTable) {
  console.log(`✅  "${TESTI_NAME}" tábla már létezik (${testiTable.id})`);
} else {
  console.log(`⏳  "${TESTI_NAME}" tábla létrehozása...`);
  const created = await createTable(TESTI_NAME, [
    { name: 'Name',   type: 'singleLineText' },
    { name: 'Role',   type: 'singleLineText' },
    { name: 'Text',   type: 'multilineText' },
    { name: 'Stars',  type: 'number', options: { precision: 0 } },
    { name: 'Active', type: 'checkbox', options: { icon: 'check', color: 'greenBright' } },
    { name: 'Order',  type: 'number', options: { precision: 0 } },
  ]);
  console.log(`✅  "${TESTI_NAME}" tábla létrehozva (${created.id})`);
}

// 2. Termékek tábla — Tags + ImageUrl mezők
const PROD_NAME = process.env.AIRTABLE_PRODUCTS_TABLE || 'Termékek';
const prodTable = tables.find(t => t.name === PROD_NAME);

if (!prodTable) {
  console.log(`⚠️   "${PROD_NAME}" tábla nem található — kihagyva`);
} else {
  const existingFields = prodTable.fields.map(f => f.name);

  if (!existingFields.includes('Tags')) {
    console.log(`⏳  Tags mező hozzáadása a(z) "${PROD_NAME}" táblához...`);
    await addField(prodTable.id, { name: 'Tags', type: 'singleLineText' });
    console.log('✅  Tags mező hozzáadva');
  } else {
    console.log(`✅  Tags mező már létezik a(z) "${PROD_NAME}" táblában`);
  }

  if (!existingFields.includes('ImageUrl')) {
    console.log(`⏳  ImageUrl mező hozzáadása a(z) "${PROD_NAME}" táblához...`);
    await addField(prodTable.id, { name: 'ImageUrl', type: 'singleLineText' });
    console.log('✅  ImageUrl mező hozzáadva');
  } else {
    console.log(`✅  ImageUrl mező már létezik a(z) "${PROD_NAME}" táblában`);
  }
}

console.log('\n🎉  Airtable setup kész!\n');
