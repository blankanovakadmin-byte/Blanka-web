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
    default: 'Novák Blanka | Magabiztosan Angolul',
    template: '%s | Novák Blanka',
  },
  description:
    'Tanulj angolul hatékonyan Novák Blankával. Webinár, kurzus, 1-1 mentorálás és letölthető anyagok.',
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    url: 'https://blankanovak.com',
    siteName: 'Novák Blanka',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Novák Blanka | Magabiztosan Angolul',
    description: 'Tanulj angolul hatékonyan Novák Blankával. Webinár, kurzus, 1-1 mentorálás és letölthető anyagok.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${playfair.variable} ${inter.variable} ${greatVibes.variable}`}>
      <body className="antialiased">
          {children}
          <CookieBanner />
        </body>
    </html>
  );
}
