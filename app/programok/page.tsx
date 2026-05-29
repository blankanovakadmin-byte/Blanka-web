import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/sections/Footer';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getUpcomingWebinars } from '@/lib/airtable';
import { Calendar, Clock, Users, Check, ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';

function FlagRow() {
  return (
    <div className="flex items-center gap-1.5 mt-1">
      {[
        { src: '/images/flag_en.png', alt: 'EN' },
        { src: '/images/flag_it.png', alt: 'IT' },
        { src: '/images/flag_es.png', alt: 'ES' },
        { src: '/images/flag_cn.png', alt: 'CN' },
      ].map(f => (
        <Image key={f.alt} src={f.src} alt={f.alt} width={22} height={22} className="w-[22px] h-[22px]" />
      ))}
    </div>
  );
}

export const metadata: Metadata = { title: 'Programok' };

const courses = [
  {
    id: 'kiscsoportos',
    badge: 'Kiscsoportos',
    badgeVariant: 'blue' as const,
    title: 'Havi Kiscsoportos Mentorprogram',
    languages: 'flags',
    price: '29 900 Ft / hó',
    description: 'Kis létszámú (max. 6 fő) csoportban tanulhatsz, ahol mindenki személyes figyelmet kap. Heti rendszeres élő alkalmakkal, közösségi támogatással.',
    features: ['Max. 6 fő / csoport', 'Heti élő alkalom', 'Privát csoport chat', 'Személyre szabott anyagok', 'Havi haladásjelentés'],
    calLink: 'https://cal.com/novakblanka/kiscsoportos',
    status: 'active' as const,
  },
  {
    id: 'privat',
    badge: 'Privát',
    badgeVariant: 'blue' as const,
    title: 'Havi Privát Mentorprogram',
    languages: 'flags',
    price: '69 000 Ft / hó',
    description: 'Teljes figyelemmel csak rád fókuszálok. Saját tempód, saját céljaid — 1-1 foglalkozások személyre szabott tervvel.',
    features: ['4 × 60 perces 1-1 alkalom', 'Egyéni tanulási terv', 'WhatsApp/Telegram elérhetőség', 'Házi feladat visszajelzés', 'Neked szóló anyagok'],
    calLink: 'https://cal.com/novakblanka/privat',
    status: 'active' as const,
    popular: true,
  },
  {
    id: 'strategia',
    badge: 'Stratégia',
    badgeVariant: 'blue' as const,
    title: 'Nyelvtanulási Stratégiai Tanácsadás',
    languages: null,
    price: '24 900 Ft',
    description: 'Egyszeri 90 perces intenzív session, ahol megkapod a személyre szabott, részletes tanulási tervedet a következő 3-6 hónapra.',
    features: ['90 perces online session', 'Személyes tanulási terv', '3-6 hónapos roadmap', '2 hétig email támogatás', 'Ajánlott forrástár'],
    calLink: 'https://cal.com/novakblanka/strategia',
    status: 'active' as const,
  },
];

export default async function ProgramokPage() {
  let webinars: Awaited<ReturnType<typeof getUpcomingWebinars>> = [];
  try {
    webinars = await getUpcomingWebinars();
  } catch {
    // Airtable not configured
  }

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0 pt-20">
        {/* Hero */}
        <SectionWrapper bg="default">
          <div className="text-center max-w-2xl mx-auto animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-blue mb-4">
              Válassz <span className="text-brand-purple italic">programot</span>
            </h1>
            <p className="font-sans text-brand-muted text-lg">
              Minden tanulónak más célja van — találjuk meg együtt a számodra legjobb utat.
            </p>
          </div>
        </SectionWrapper>

        {/* Courses */}
        <SectionWrapper bg="surface">
          <h2 className="font-display text-2xl font-bold text-brand-blue mb-8">Mentorprogramok</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <Card
                key={course.id}
                id={course.id}
                className={[
                  `animate-fade-in stagger-${i + 1} flex flex-col relative`,
                  course.popular ? 'border-brand-purple ring-2 ring-brand-purple/20' : '',
                ].join(' ')}
              >
                {course.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-purple text-white text-xs font-semibold px-3 py-1 rounded-full font-sans">
                    Népszerű
                  </span>
                )}
                <div className="flex-1">
                  <Badge variant={course.badgeVariant} className="mb-3">{course.badge}</Badge>
                  <h3 className="font-display text-xl font-bold text-brand-blue mb-1">{course.title}</h3>
                  {course.languages === 'flags' ? <FlagRow /> : course.languages ? <p className="text-lg mb-3">{course.languages}</p> : null}
                  <p className="font-sans text-brand-muted text-sm mb-4 leading-relaxed">{course.description}</p>
                  <ul className="space-y-2 mb-6">
                    {course.features.map(f => (
                      <li key={f} className="flex items-center gap-2 font-sans text-sm text-brand-text">
                        <Check size={14} className="text-brand-purple shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-brand-border">
                  <span className="font-display text-xl font-bold text-brand-blue">{course.price}</span>
                  <Button href={course.calLink} external size="sm">
                    Foglalok <ArrowRight size={14} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </SectionWrapper>

        {/* Featured course */}
        <SectionWrapper bg="default" id="kurzus">
          <div className="max-w-2xl">
            <Badge variant="blue" className="mb-4">Kiemelt kurzus</Badge>
            <h2 className="font-display text-3xl font-bold text-brand-blue mb-3">
              Magabiztosan Angolul
            </h2>
            <p className="font-sans text-brand-muted text-lg mb-6 leading-relaxed">
              8 hetes strukturált csoportos kurzus azoknak, akik szeretnének végre magabiztosan angolul
              megszólalni — az állásinterjútól a külföldi utazásig.
            </p>
            <div className="flex items-center gap-1 mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#B06AD9" className="text-brand-purple" />)}
              <span className="font-sans text-sm text-brand-muted ml-2">4.9/5 (50+ értékelés)</span>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="font-sans text-xs text-brand-muted uppercase tracking-wide">Egyszeri díj</p>
                <p className="font-display text-3xl font-bold text-brand-blue">89 000 Ft</p>
              </div>
              <Button href={process.env.NEXT_PUBLIC_COURSE_CHECKOUT_URL || '#'} external size="lg">
                Csatlakozom <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </SectionWrapper>

        {/* Webinar calendar */}
        {webinars.length > 0 && (
          <SectionWrapper bg="surface" id="webinarok">
            <h2 className="font-display text-2xl font-bold text-brand-blue mb-8">Közelgő webinárok</h2>
            <div className="space-y-4">
              {webinars.map((w) => (
                <WebinarCard key={w.id} webinar={w} />
              ))}
            </div>
          </SectionWrapper>
        )}

        {/* Cal.com embed placeholder */}
        <SectionWrapper bg="default">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-brand-blue mb-4">
              Foglalj időpontot most
            </h2>
            <p className="font-sans text-brand-muted mb-8">
              Vagy írj nekem és megbeszéljük, mi illik hozzád a legjobban.
            </p>
            <Button href="https://cal.com/novakblanka" external size="lg">
              Időpontfoglalás <ArrowRight size={16} />
            </Button>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}

function WebinarCard({ webinar }: { webinar: { id: string; title: string; date: string; time: string; description: string; maxParticipants: number; registrationOpen: boolean } }) {
  const dateFormatted = new Date(webinar.date).toLocaleDateString('hu-HU', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <Card id={`webinar-${webinar.id}`} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="blue">Webinár</Badge>
          {webinar.registrationOpen && (
            <span className="flex items-center gap-1 text-green-600 text-xs font-sans">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Nyitott
            </span>
          )}
        </div>
        <h3 className="font-display text-lg font-bold text-brand-blue">{webinar.title}</h3>
        <div className="flex flex-wrap gap-4 mt-1">
          <span className="flex items-center gap-1.5 text-sm text-brand-muted font-sans">
            <Calendar size={13} /> {dateFormatted}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-brand-muted font-sans">
            <Clock size={13} /> {webinar.time}
          </span>
          {webinar.maxParticipants > 0 && (
            <span className="flex items-center gap-1.5 text-sm text-brand-muted font-sans">
              <Users size={13} /> Max. {webinar.maxParticipants} fő
            </span>
          )}
        </div>
      </div>
      <Button href={`/webinar-regisztracio?id=${webinar.id}`} size="sm">
        Regisztrálok
      </Button>
    </Card>
  );
}
