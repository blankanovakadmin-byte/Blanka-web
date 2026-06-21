import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email, languages, level, goal, notes } = await req.json();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Érvényes email szükséges.' }, { status: 400 });
    }
    if (!languages?.length || !level || !goal) {
      return NextResponse.json({ error: 'Kérlek töltsd ki a kötelező mezőket.' }, { status: 400 });
    }

    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE_ID!);

    const table = process.env.AIRTABLE_SUBSCRIBERS_TABLE || 'Feliratkozók';

    const existing = await base(table)
      .select({ filterByFormula: `{Email} = '${email.replace(/'/g, "\\'")}'`, maxRecords: 1 })
      .firstPage();

    const surveyData = {
      Languages: (languages as string[]).join(', '),
      Level: level as string,
      Goal: (goal as string).slice(0, 500),
      Notes: ((notes as string) || '').slice(0, 500),
    };

    if (existing.length > 0) {
      await base(table).update(existing[0].id, surveyData);
    } else {
      await base(table).create({ Email: email, ...surveyData });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Hiba történt.' }, { status: 500 });
  }
}
