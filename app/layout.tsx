import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
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

export const metadata: Metadata = {
  title: {
    default: 'Novák Blanka — Magabiztosan Angolul',
    template: '%s | Novák Blanka',
  },
  description:
    'Tanulj angolul hatékonyan Novák Blankával. Webinár, kurzus, 1-1 mentorálás és letölthető anyagok.',
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    url: 'https://novakblanka.hu',
    siteName: 'Novák Blanka',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://novakblanka.hu'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
          {children}
          <CookieBanner />
        </body>
    </html>
  );
}
