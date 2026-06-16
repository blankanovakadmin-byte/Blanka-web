import type { MetadataRoute } from 'next';
import { getUpcomingWebinars } from '@/lib/airtable';

export const revalidate = 3600;

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,           lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/programok`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/forrasok`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/rolam`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/kapcsolat`,  lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/aszf`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/adatvedelem`,lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  ];

  // Webinár regisztrációs oldalak — ha van aktív webinár, indexeljük
  let webinarRoutes: MetadataRoute.Sitemap = [];
  try {
    const webinars = await getUpcomingWebinars();
    webinarRoutes = webinars.map((w) => ({
      url: `${BASE}/webinar-regisztracio?id=${w.id}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));
  } catch {
    // Airtable unavailable — skip dynamic routes
  }

  return [...staticRoutes, ...webinarRoutes];
}
