import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/sections/Footer';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { KapcsolatClient } from '@/components/sections/KapcsolatClient';

export const metadata: Metadata = {
  title: 'Kapcsolat',
  description: 'Lépj kapcsolatba Novák Blankával! Kérdésed van egy programról, vagy személyes tanácsadásra van szükséged? Írj nekünk.',
  openGraph: {
    title: 'Kapcsolat | Novák Blanka',
    description: 'Kérdésed van? Érdeklődnél egy programról? Szívesen válaszolok!',
    url: 'https://blankanovak.com/kapcsolat',
  },
};

export default function KapcsolatPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0 pt-20">
        <SectionWrapper bg="default">
          <div className="text-center max-w-xl mx-auto mb-12 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-blue mb-4">
              <span className="text-brand-purple italic">Lépj</span> kapcsolatba!
            </h1>
            <p className="font-sans text-brand-muted text-lg">
              Kérdésed van? Érdeklődnél egy programról? Szívesen válaszolok!
            </p>
          </div>

          <KapcsolatClient />
        </SectionWrapper>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
