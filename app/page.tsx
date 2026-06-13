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
import { getUpcomingWebinars } from '@/lib/airtable';

export default async function HomePage() {
  let upcomingWebinar = null;
  try {
    const webinars = await getUpcomingWebinars();
    upcomingWebinar = webinars[0] ?? null;
  } catch {
    // Airtable not configured yet — show page without webinar banner
  }

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
        <Hero />
        <MissionSection />
        {upcomingWebinar && <UpcomingWebinar webinar={upcomingWebinar} />}
        <FeaturedCourse />
        <ServiceCards />
        <Testimonials />
        <NewsletterForm />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
