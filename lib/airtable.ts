import Airtable from 'airtable';
import type { Webinar, Product, Subscriber } from '@/types';

const TABLES = {
  subscribers: () => process.env.AIRTABLE_SUBSCRIBERS_TABLE || 'Feliratkozók',
  webinars: () => process.env.AIRTABLE_WEBINARS_TABLE || 'Webinár események',
  courseBuyers: () => process.env.AIRTABLE_COURSE_BUYERS_TABLE || 'Kurzus vásárlók',
  digitalBuyers: () => process.env.AIRTABLE_DIGITAL_BUYERS_TABLE || 'Digitális termék vásárlók',
  products: () => process.env.AIRTABLE_PRODUCTS_TABLE || 'Termékek',
};

function getBase() {
  return new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID!
  );
}

export async function getUpcomingWebinars(): Promise<Webinar[]> {
  const base = getBase();
  const now = new Date().toISOString().split('T')[0];
  const records = await base(TABLES.webinars())
    .select({
      filterByFormula: `AND({RegistrationOpen} = TRUE(), {Date} >= '${now}')`,
      sort: [{ field: 'Date', direction: 'asc' }],
      maxRecords: 3,
    })
    .all();

  return records.map((r) => ({
    id: r.id,
    title: String(r.fields['Title'] ?? ''),
    date: String(r.fields['Date'] ?? ''),
    time: String(r.fields['Time'] ?? ''),
    zoomLink: String(r.fields['ZoomLink'] ?? ''),
    registrationOpen: Boolean(r.fields['RegistrationOpen']),
    maxParticipants: Number(r.fields['MaxParticipants'] ?? 0),
    description: String(r.fields['Description'] ?? ''),
  }));
}

export async function getActiveProducts(): Promise<Product[]> {
  const base = getBase();
  const records = await base(TABLES.products())
    .select({ filterByFormula: '{Active} = TRUE()' })
    .all();

  return records.map((r) => ({
    id: r.id,
    title: String(r.fields['Title'] ?? ''),
    description: String(r.fields['Description'] ?? ''),
    price: Number(r.fields['Price'] ?? 0),
    category: (r.fields['Category'] as 'free' | 'premium') ?? 'premium',
    blobKey: r.fields['BlobKey'] ? String(r.fields['BlobKey']) : undefined,
    active: Boolean(r.fields['Active']),
    stripePriceId: r.fields['StripePriceId'] ? String(r.fields['StripePriceId']) : undefined,
    nextStart: r.fields['NextStart'] ? String(r.fields['NextStart']) : undefined,
  }));
}


export async function addWebinarSubscriber(data: {
  email: string;
  firstName: string;
  webinarId: string;
}) {
  const base = getBase();
  await base(TABLES.subscribers()).create({
    Email: data.email,
    FirstName: data.firstName,
    Tags: `webinar_${data.webinarId}`,
    CreatedAt: new Date().toISOString(),
  });
}

export async function addNewsletterSubscriber(email: string, source?: string) {
  const base = getBase();
  const existing = await base(TABLES.subscribers())
    .select({ filterByFormula: `{Email} = '${email}'`, maxRecords: 1 })
    .firstPage();

  if (existing.length > 0) return;

  await base(TABLES.subscribers()).create({
    Email: email,
    Tags: ['newsletter', source ? `source_${source}` : ''].filter(Boolean).join(','),
    CreatedAt: new Date().toISOString(),
  });
}

export async function addCoursePurchase(data: {
  email: string;
  courseId: string;
  stripeSessionId: string;
}) {
  const base = getBase();
  await base(TABLES.courseBuyers()).create({
    Email: data.email,
    CourseId: data.courseId,
    StripeSessionId: data.stripeSessionId,
    PurchasedAt: new Date().toISOString(),
  });
}

export async function addDigitalPurchase(data: {
  email: string;
  productId: string;
  stripeSessionId: string;
}) {
  const base = getBase();
  await base(TABLES.digitalBuyers()).create({
    Email: data.email,
    ProductId: data.productId,
    StripeSessionId: data.stripeSessionId,
    PurchasedAt: new Date().toISOString(),
  });
}

export async function getWebinarById(id: string): Promise<Webinar | null> {
  try {
    const base = getBase();
    const record = await base(TABLES.webinars()).find(id);
    return {
      id: record.id,
      title: String(record.fields['Title'] ?? ''),
      date: String(record.fields['Date'] ?? ''),
      time: String(record.fields['Time'] ?? ''),
      zoomLink: String(record.fields['ZoomLink'] ?? ''),
      registrationOpen: Boolean(record.fields['RegistrationOpen']),
      maxParticipants: Number(record.fields['MaxParticipants'] ?? 0),
      description: String(record.fields['Description'] ?? ''),
    };
  } catch {
    return null;
  }
}

export async function getWebinarSubscribers(webinarId: string): Promise<Subscriber[]> {
  const base = getBase();
  const tag = `webinar_${webinarId}`;
  const records = await base(TABLES.subscribers())
    .select({ filterByFormula: `FIND('${tag}', {Tags})` })
    .all();

  return records.map((r) => ({
    id: r.id,
    email: String(r.fields['Email'] ?? ''),
    firstName: r.fields['FirstName'] ? String(r.fields['FirstName']) : undefined,
    tags: String(r.fields['Tags'] ?? '').split(',').filter(Boolean),
    createdAt: String(r.fields['CreatedAt'] ?? ''),
  }));
}

export async function getAllWebinars(): Promise<Webinar[]> {
  const base = getBase();
  const records = await base(TABLES.webinars())
    .select({ sort: [{ field: 'Date', direction: 'desc' }] })
    .all();

  return records.map((r) => ({
    id: r.id,
    title: String(r.fields['Title'] ?? ''),
    date: String(r.fields['Date'] ?? ''),
    time: String(r.fields['Time'] ?? ''),
    zoomLink: String(r.fields['ZoomLink'] ?? ''),
    registrationOpen: Boolean(r.fields['RegistrationOpen']),
    maxParticipants: Number(r.fields['MaxParticipants'] ?? 0),
    description: String(r.fields['Description'] ?? ''),
  }));
}
