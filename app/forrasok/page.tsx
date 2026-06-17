import type { Metadata } from 'next';
import { Download } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/sections/Footer';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { getActiveProducts } from '@/lib/airtable';
import { ForrasokClient, ForrasokEmptyState } from '@/components/sections/ForrasokClient';

export const metadata: Metadata = {
  title: 'Ingyenes angol tanulási anyagok és letölthető PDF-ek',
  description: 'Ingyenes és prémium angol tanulási anyagok: kifejezésgyűjtemények, szókincslisták, társalgási útmutatók letölthető PDF formátumban. Azonnal használható, gyakorlati anyagok.',
  keywords: ['ingyenes angol anyag', 'angol tanulási anyag letöltés', 'angol kifejezések PDF', 'angol szókincs', 'angol tanulás ingyen'],
  openGraph: {
    title: 'Ingyenes angol tanulási anyagok | Novák Blanka',
    description: 'Letölthető angol tanulási anyagok: kifejezésgyűjtemények, szókincslisták, társalgási útmutatók.',
    url: 'https://blankanovak.com/forrasok',
  },
  alternates: { canonical: '/forrasok' },
};

export const revalidate = 3600;

export default async function ForrasokPage() {
  const products = await getActiveProducts().catch(() => []);

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0 pt-20">
        <SectionWrapper bg="default">
          <div className="text-center max-w-2xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Download size={24} className="text-brand-purple" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-blue mb-4">
              Tanulási <span className="text-brand-purple italic">forrásaim</span>
            </h1>
            <p className="font-sans text-brand-muted text-lg">
              Ingyenes és fizetős anyagok, amelyek felgyorsítják a nyelvtanulási utadat.
            </p>
          </div>
        </SectionWrapper>

        <SectionWrapper bg="surface">
          {products.length === 0 ? (
            <ForrasokEmptyState />
          ) : (
            <ForrasokClient products={products} />
          )}
        </SectionWrapper>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
