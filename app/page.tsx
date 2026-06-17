export const revalidate = 3600;

import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Hero } from '@/components/sections/Hero';
import { MissionSection } from '@/components/sections/MissionSection';
import { UpcomingWebinar } from '@/components/sections/UpcomingWebinar';
import { FeaturedCourse } from '@/components/sections/FeaturedCourse';
import { ServiceCards } from '@/components/sections/ServiceCards';
import { Testimonials } from '@/components/sections/Testimonials';
import { NewsletterForm } from '@/components/sections/NewsletterForm';
import { Footer } from '@/components/sections/Footer';
import { getUpcomingWebinars, getActiveProducts, getTestimonials } from '@/lib/airtable';
import type { Testimonial } from '@/types';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Milyen szintről lehet csatlakozni az angol programokhoz?',
      acceptedAnswer: { '@type': 'Answer', text: 'Bármilyen szintről! A személyre szabott mentorprogram pont arra szolgál, hogy a te szintednek megfelelő ütemben haladj. A kurzusok kezdő-középhaladó szinttől ajánlottak.' },
    },
    {
      '@type': 'Question',
      name: 'Mennyibe kerül az angol mentorprogram?',
      acceptedAnswer: { '@type': 'Answer', text: 'A kiscsoportos mentorprogram 34 990 Ft/hó (havi 4 × 45 perc), a privát mentorprogram 49 990 Ft/hó (havi 2 × 75 perc). Mindkettő havi előfizetéses, bármikor lemondható.' },
    },
    {
      '@type': 'Question',
      name: 'Hogyan zajlanak az online alkalmak?',
      acceptedAnswer: { '@type': 'Answer', text: 'Zoom-on keresztül, élőben. A privát mentorprogram alkalmait Cal.com-on tudod lefoglalni a számodra megfelelő időpontra. A kiscsoportos program fix időpontban zajlik.' },
    },
    {
      '@type': 'Question',
      name: 'Van ingyenes lehetőség is kipróbálni?',
      acceptedAnswer: { '@type': 'Answer', text: 'Igen! Rendszeresen tartok ingyenes webinárokat, és a Források oldalon letölthető ingyenes tanulási anyagokat is találsz.' },
    },
  ],
};

export default async function HomePage() {
  let upcomingWebinar = null;
  let featuredCourseNextStart: string | undefined;
  let testimonials: Testimonial[] = [];

  try {
    const [webinars, products, testimonialData] = await Promise.all([
      getUpcomingWebinars(),
      getActiveProducts(),
      getTestimonials(),
    ]);
    upcomingWebinar = webinars[0] ?? null;
    featuredCourseNextStart = products.find(p => p.nextStart)?.nextStart;
    testimonials = testimonialData;
  } catch {
    // Airtable not configured yet
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main className="pb-20 md:pb-0">
        <Hero />
        <MissionSection />
        {upcomingWebinar && <UpcomingWebinar webinar={upcomingWebinar} />}
        <FeaturedCourse nextStart={featuredCourseNextStart} />
        <ServiceCards />
        <Testimonials testimonials={testimonials} />
        <NewsletterForm />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
