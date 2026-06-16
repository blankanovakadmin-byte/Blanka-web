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
    const featured = products.find(p => p.title === 'Magabiztosan Angolul');
    featuredCourseNextStart = featured?.nextStart;
    testimonials = testimonialData;
  } catch {
    // Airtable not configured yet
  }

  return (
    <>
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
