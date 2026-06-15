const BASE_URL = 'https://api.systeme.io/api';

async function systemeRequest(path: string, method: string, body?: unknown) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.SYSTEMIO_API_KEY!,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Systeme.io ${method} ${path} failed: ${res.status} ${text}`);
  }

  return res.json();
}

export async function upsertContact(data: {
  email: string;
  firstName?: string;
  tags?: string[];
}): Promise<{ id: number }> {
  try {
    const payload: Record<string, unknown> = { email: data.email };
    if (data.firstName) payload.first_name = data.firstName;
    if (data.tags?.length) payload.tags = data.tags;

    const result = await systemeRequest('/contacts', 'POST', payload);
    return { id: result.id };
  } catch (err) {
    console.error('systeme.io upsertContact error:', err);
    throw err;
  }
}

export async function addTagsToContact(contactId: number, tags: string[]) {
  try {
    await systemeRequest(`/contacts/${contactId}/tags`, 'POST', { tags });
  } catch (err) {
    console.error('systeme.io addTagsToContact error:', err);
    throw err;
  }
}

export async function enrollInCourse(contactId: number, courseId: string) {
  try {
    await systemeRequest('/memberships', 'POST', {
      contact_id: contactId,
      course_id: courseId,
    });
  } catch {
    // Fallback: tag-based enrollment configured in Systeme.io automation
    console.warn(`Systeme.io enrollment API unavailable — tag-based fallback for course ${courseId}`);
  }
}

export async function addNewsletterContact(email: string, source?: string, firstName?: string) {
  const tags = ['newsletter'];
  if (source) tags.push(`source_${source}`);
  const contact = await upsertContact({ email, firstName, tags });
  return contact;
}

export async function addWebinarContact(email: string, firstName: string, webinarId: string) {
  const contact = await upsertContact({
    email,
    firstName,
    tags: [`webinar_${webinarId}`],
  });
  return contact;
}

export async function addFreebieContact(email: string, productId: string) {
  const contact = await upsertContact({
    email,
    tags: [`freebie_${productId}`],
  });
  return contact;
}

export async function addPurchaseTag(email: string, productType: 'course' | 'digital', id: string) {
  const contact = await upsertContact({
    email,
    tags: [`purchased_${productType}_${id}`],
  });

  if (productType === 'course') {
    await enrollInCourse(contact.id, id);
  }

  return contact;
}

export async function addBookingTag(email: string) {
  const contact = await upsertContact({
    email,
    tags: ['booked_mentoring'],
  });
  return contact;
}

export async function getContactsByTag(tag: string): Promise<Array<{ id: number; email: string; firstName?: string }>> {
  try {
    const result = await systemeRequest(`/contacts?tag=${encodeURIComponent(tag)}&limit=100`, 'GET');
    return (result.items ?? []).map((c: Record<string, unknown>) => ({
      id: Number(c.id),
      email: String(c.email ?? ''),
      firstName: c.first_name ? String(c.first_name) : undefined,
    }));
  } catch {
    return [];
  }
}
