import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/sections/Footer';
import { WebinarRegForm } from './WebinarRegForm';

export const metadata: Metadata = {
  title: 'Ingyenes angol webinár regisztráció',
  description: 'Regisztrálj Novák Blanka következő ingyenes angol webinárjára! Gyakorlati tippek és nyelvtanulási stratégiák élőben, online.',
  keywords: ['ingyenes angol webinár', 'angol webinár online', 'Novák Blanka webinár'],
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
