import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email, languages, level, obstacles, motivation, notes } = await req.json();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Érvényes email szükséges.' }, { status: 400 });
    }
    if (!languages?.length || !level || !obstacles || !motivation) {
      return NextResponse.json({ error: 'Kérlek töltsd ki a kötelező mezőket.' }, { status: 400 });
    }

    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE_ID!);

    const subscribersTable = process.env.AIRTABLE_SUBSCRIBERS_TABLE || 'Feliratkozók';
    const escapedEmail = email.replace(/'/g, "\\'");

    const surveyData: Record<string, string> = {
      Languages: (languages as string[]).join(', '),
      Level: level as string,
      Obstacles: (obstacles as string).slice(0, 500),
      Goal: (motivation as string).slice(0, 500),
      Notes: ((notes as string) || '').slice(0, 500),
    };

    const existing = await base(subscribersTable)
      .select({ filterByFormula: `{Email} = '${escapedEmail}'`, maxRecords: 1 })
      .firstPage();

    if (existing.length > 0) {
      await base(subscribersTable).update(existing[0].id, surveyData);
    } else {
      await base(subscribersTable).create({
        Email: email,
        ...surveyData,
        CreatedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Hiba történt.' }, { status: 500 });
  }
}
