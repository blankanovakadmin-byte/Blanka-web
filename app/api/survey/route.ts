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

    const surveyData = {
      Languages: (languages as string[]).join(', '),
      Level: level as string,
      Goal: (goal as string).slice(0, 500),
      Notes: ((notes as string) || '').slice(0, 500),
    };

    const escapedEmail = email.replace(/'/g, "\\'");

    const subscribersTable = process.env.AIRTABLE_SUBSCRIBERS_TABLE || 'Feliratkozók';
    const courseBuyersTable = process.env.AIRTABLE_COURSE_BUYERS_TABLE || 'Kurzus vásárlók';
    const digitalBuyersTable = process.env.AIRTABLE_DIGITAL_BUYERS_TABLE || 'Digitális termék vásárlók';
    const mentoringBuyersTable = process.env.AIRTABLE_MENTORING_BUYERS_TABLE || 'Mentorprogram vásárlók';

    async function updateTable(tableName: string) {
      const existing = await base(tableName)
        .select({ filterByFormula: `{Email} = '${escapedEmail}'`, maxRecords: 10 })
        .firstPage();

      if (existing.length > 0) {
        await Promise.all(
          existing.map(record => base(tableName).update(record.id, surveyData))
        );
      }
    }

    await Promise.allSettled([
      (async () => {
        const existing = await base(subscribersTable)
          .select({ filterByFormula: `{Email} = '${escapedEmail}'`, maxRecords: 1 })
          .firstPage();

        if (existing.length > 0) {
          await base(subscribersTable).update(existing[0].id, surveyData);
        } else {
          await base(subscribersTable).create({ Email: email, ...surveyData });
        }
      })(),
      updateTable(courseBuyersTable),
      updateTable(digitalBuyersTable),
      updateTable(mentoringBuyersTable),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Hiba történt.' }, { status: 500 });
  }
}
