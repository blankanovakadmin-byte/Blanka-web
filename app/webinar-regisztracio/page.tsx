import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/sections/Footer';
import { WebinarRegForm } from './WebinarRegForm';

export const metadata: Metadata = {
  title: 'Webinár regisztráció',
  description: 'Regisztrálj Novák Blanka következő ingyenes webinárjára és tanuld meg az angolt hatékonyan.',
  robots: { index: false, follow: false },
};

export default function WebinarRegisztracioPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0 pt-20">
        <WebinarRegForm />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
