import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/sections/Footer';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getUpcomingWebinars } from '@/lib/airtable';
import { Calendar, Clock, Users, Check, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Programok',
  description: 'Online webinár, csoportos kurzus, önütemezett tanfolyam és 1-1 mentorálás Novák Blankával. Találd meg a számodra legjobb utat az angol nyelvhez.',
};

function FlagRow() {
  return (
    <div className="flex items-center gap-1.5 mt-1 mb-3">
      {[
        { src: '/images/flag_en.png', alt: 'Angol' },
        { src: '/images/flag_it.png', alt: 'Olasz' },
        { src: '/images/flag_es.png', alt: 'Spanyol' },
        { src: '/images/flag_cn.png', alt: 'Kínai' },
      ].map(f => (
        <Image key={f.alt} src={f.src} alt={f.alt} width={22} height={22} className="w-[22px] h-[22px]" />
      ))}
    </div>
  );
}

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
              Szolgáltatások
            </h1>
            <p className="font-sans text-brand-muted text-lg">
              Minden tanulónak más célja van. Találjuk meg együtt a számodra legjobb utat.
            </p>
          </div>
        </SectionWrapper>

        {/* Magabiztosan Angolul */}
        <SectionWrapper bg="surface" id="kurzus">
          <div className="max-w-3xl mx-auto">
            <Badge variant="blue" className="mb-4">Online kurzus</Badge>
            <h2 className="font-display text-3xl font-bold text-brand-blue mb-3">
              Magabiztosan Angolul
            </h2>
            <p className="font-sans text-brand-muted text-lg mb-6 leading-relaxed">
              Azoknak, akik már tanultak angolul, de szeretnének végre természetesen és
              magabiztosan kommunikálni.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-display text-lg font-bold text-brand-blue mb-3">Mit kapsz?</h3>
                <ul className="space-y-2">
                  {[
                    'Megtanulsz angolul gondolkodni, nem pedig fejben fordítani',
                    'Leküzdöd a megszólalással kapcsolatos szorongást',
                    'Fejleszted a természetes, autentikus kiejtésedet',
                    'Gyakorlati eszközöket kapsz a magabiztos nyelvhasználathoz',
                  ].map(f => (
                    <li key={f} className="flex items-start gap-2 font-sans text-sm text-brand-text">
                      <Check size={14} className="text-brand-purple shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-brand-blue mb-3">Kinek szól?</h3>
                <p className="font-sans text-sm text-brand-muted mb-4 leading-relaxed">
                  B1 szinttől haladó szintig azoknak, akik szeretnék végre használni is azt az
                  angolt, amit már tudnak.
                </p>
                <h3 className="font-display text-lg font-bold text-brand-blue mb-3">A program tartalma</h3>
                <ul className="space-y-2">
                  {[
                    '8 modulból álló, lépésről lépésre felépített rendszer',
                    'Élő Q&A alkalmak, ahol személyesen kérdezhetsz',
                  ].map(f => (
                    <li key={f} className="flex items-start gap-2 font-sans text-sm text-brand-text">
                      <Check size={14} className="text-brand-purple shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-6 border-t border-brand-border">
              <div>
                <p className="font-sans text-xs text-brand-muted uppercase tracking-wide mb-1">Early Bird ár</p>
                <p className="font-display text-3xl font-bold text-brand-blue">24 990 Ft</p>
              </div>
              <Button href={process.env.NEXT_PUBLIC_COURSE_CHECKOUT_URL || '#'} external size="lg">
                Csatlakozom <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </SectionWrapper>

        {/* Stratégia + Mentor cards */}
        <SectionWrapper bg="default">
          <div className="grid md:grid-cols-3 gap-6">

            {/* Stratégia */}
            <Card className="flex flex-col" id="strategia">
              <Badge variant="blue" className="mb-3 self-start">Egyéni konzultáció</Badge>
              <h3 className="font-display text-xl font-bold text-brand-blue mb-3">
                Stratégia Neked – Személyes Nyelvtanulási Tanácsadás
              </h3>
              <p className="font-sans text-sm text-brand-muted mb-4 leading-relaxed">
                Ha úgy érzed, elakadtál, és személyre szabott segítségre van szükséged, ez a
                konzultáció neked szól.
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  'Feltérképezzük, hol tartasz most',
                  'Azonosítjuk a legnagyobb akadályokat és blokkokat',
                  'Kialakítunk egy számodra működő, reális tanulási stratégiát',
                  'Megismered a saját nyelvtanulói profilodat a 8 személyiségtípus alapján',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 font-sans text-xs text-brand-text">
                    <Check size={13} className="text-brand-purple shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="font-sans text-xs text-brand-muted mb-6 leading-relaxed">
                <span className="font-semibold text-brand-text">Neked való, ha</span> sokat
                próbálkoztál már, elvesztetted a motivációdat, vagy gyorsabban és tudatosabban
                szeretnél fejlődni.
              </p>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-brand-border">
                <div>
                  <p className="font-display text-xl font-bold text-brand-blue">19 990 Ft</p>
                  <p className="font-sans text-xs text-brand-muted">45 perc</p>
                </div>
                <Button href="https://cal.com/novakblanka/strategia" external size="sm">
                  Foglalok <ArrowRight size={14} />
                </Button>
              </div>
            </Card>

            {/* Kiscsoportos */}
            <Card className="flex flex-col" id="kiscsoportos">
              <Badge variant="blue" className="mb-3 self-start">Kiscsoportos</Badge>
              <h3 className="font-display text-xl font-bold text-brand-blue mb-1">
                Kiscsoportos Havi Mentorprogram
              </h3>
              <FlagRow />
              <p className="font-sans text-sm text-brand-muted mb-4 leading-relaxed">
                Nem hagyományos nyelvóra, hanem egy támogató közösség és fejlődési rendszer
                azoknak, akik rendszeresen szeretnének beszélni és fejlődni.
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {[
                  'Havi 4 × 45 perc élő online mentoralkalom',
                  'Kis létszámú (3–5 fős) csoport',
                  'Aktív beszédközpontú gyakorlás',
                  'Személyes visszajelzés és támogatás',
                  'Motiváló, inspiráló közeg',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 font-sans text-xs text-brand-text">
                    <Check size={13} className="text-brand-purple shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-brand-border">
                <div>
                  <p className="font-display text-xl font-bold text-brand-blue">34 990 Ft</p>
                  <p className="font-sans text-xs text-brand-muted">fő / hó</p>
                </div>
                <Badge variant="coral">Várólistás</Badge>
              </div>
            </Card>

            {/* Privát */}
            <Card className="flex flex-col border-brand-purple ring-2 ring-brand-purple/20 relative" id="privat">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-purple text-white text-xs font-semibold px-3 py-1 rounded-full font-sans">
                Népszerű
              </span>
              <Badge variant="blue" className="mb-3 self-start">Privát</Badge>
              <h3 className="font-display text-xl font-bold text-brand-blue mb-1">
                Privát Havi Mentorprogram
              </h3>
              <FlagRow />
              <p className="font-sans text-sm text-brand-muted mb-4 leading-relaxed">
                A legszemélyesebb együttműködési forma azoknak, akik gyors, fókuszált és
                egyéni támogatással szeretnének fejlődni.
              </p>
              <ul className="space-y-2 mb-4 flex-1">
                {[
                  'Havi 2 × 75 perc online 1:1 mentoralkalom',
                  'Teljesen személyre szabott tanulási stratégia',
                  'Folyamatos feedback és támogatás',
                  'Személyiségtípus-alapú módszertan',
                  'Valódi kommunikációra épülő nyelvhasználat',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 font-sans text-xs text-brand-text">
                    <Check size={13} className="text-brand-purple shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="font-sans text-xs text-brand-muted italic mb-4">
                Egyszerre csak limitált számú mentoráltat vállalok, hogy mindenki maximális
                figyelmet kapjon.
              </p>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-brand-border">
                <div>
                  <p className="font-display text-xl font-bold text-brand-blue">49 990 Ft</p>
                  <p className="font-sans text-xs text-brand-muted">/ hó · automatikus megújulás</p>
                </div>
                <Button href={`/api/checkout?priceId=${process.env.NEXT_PUBLIC_STRIPE_MENTORING_PRICE_ID || '#'}&type=mentoring`} size="sm">
                  Feliratkozom <ArrowRight size={14} />
                </Button>
              </div>
            </Card>

          </div>
        </SectionWrapper>

        {/* Webinar calendar */}
        <SectionWrapper bg="surface" id="webinarok">
          <h2 className="font-display text-2xl font-bold text-brand-blue mb-8">Közelgő webinárok</h2>
          {webinars.length > 0 ? (
            <div className="space-y-4">
              {webinars.map((w) => (
                <WebinarCard key={w.id} webinar={w} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-brand-border rounded-2xl">
              <p className="font-display text-lg font-bold text-brand-blue mb-2">Hamarosan újabb webinár!</p>
              <p className="font-sans text-sm text-brand-muted mb-6 max-w-md mx-auto">
                Iratkozz fel a hírlevélre, hogy elsőként értesülj a következő ingyenes webinárról.
              </p>
              <Button href="/#hirlevel" size="sm">Értesíts a következőről</Button>
            </div>
          )}
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper bg="default">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-brand-blue mb-4">
              Nem tudod, melyik illik hozzád?
            </h2>
            <p className="font-sans text-brand-muted mb-8">
              Írj nekem és segítek megtalálni a számodra legmegfelelőbb programot.
            </p>
            <Button href="/kapcsolat" size="lg">
              Kapcsolatfelvétel <ArrowRight size={16} />
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
