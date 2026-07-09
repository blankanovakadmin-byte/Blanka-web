import type { Metadata } from 'next';
import { Playfair_Display, Inter, Great_Vibes } from 'next/font/google';
import './globals.css';
import { CookieBanner } from '@/components/CookieBanner';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const greatVibes = Great_Vibes({
  weight: '400',
  variable: '--font-script',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Novák Blanka | Angol nyelvtanulás online – kurzus, mentorálás, webinár',
    template: '%s | Novák Blanka',
  },
  description:
    'Tanulj angolul hatékonyan Novák Blankával! Online kurzus, privát és kiscsoportos mentorprogram, ingyenes webinárok. Személyiségtípus-alapú módszertan, 500+ elégedett tanuló.',
  keywords: ['angol tanulás online', 'angol nyelvtanfolyam', 'angol mentorprogram', 'online angol kurzus', 'Novák Blanka', 'angol nyelvtanulás', 'angol magánóra online', 'angol webinár'],
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    url: 'https://blankanovak.com',
    siteName: 'Novák Blanka',
    title: 'Novák Blanka | Angol nyelvtanulás online – kurzus, mentorálás, webinár',
    description: 'Online angol kurzus, privát és kiscsoportos mentorprogram, ingyenes webinárok. 500+ elégedett tanuló, személyiségtípus-alapú módszertan.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Novák Blanka | Angol nyelvtanulás online',
    description: 'Online angol kurzus, privát és kiscsoportos mentorprogram, ingyenes webinárok. 500+ elégedett tanuló.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com'),
};

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${BASE}/#organization`,
  name: 'Novák Blanka – Angol Nyelvtanulás',
  legalName: 'Lybskin Korlátolt Felelősségű Társaság',
  url: BASE,
  logo: `${BASE}/opengraph-image`,
  description: 'Online angol kurzusok, privát és kiscsoportos mentorprogram, ingyenes webinárok. Személyiségtípus-alapú nyelvtanulási módszertan.',
  founder: { '@type': 'Person', name: 'Novák Blanka' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Mikes Kelemen utca 21.',
    addressLocality: 'Eger',
    postalCode: '3300',
    addressCountry: 'HU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@blankanovak.com',
    contactType: 'customer service',
    availableLanguage: ['Hungarian', 'English'],
  },
  sameAs: [
    'https://instagram.com/blankanovak_',
    'https://tiktok.com/@blankanovak',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Novák Blanka',
  url: BASE,
  description: 'Online angol kurzus, privát és kiscsoportos mentorprogram, ingyenes webinárok – Novák Blankával.',
  inLanguage: 'hu',
  publisher: { '@id': `${BASE}/#organization` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${playfair.variable} ${inter.variable} ${greatVibes.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased">
          {children}
          <CookieBanner />
        </body>
    </html>
  );
}
