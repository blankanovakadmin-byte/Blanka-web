import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/sections/Footer';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Globe, FlaskConical, BookOpen, Lightbulb } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Rólam',
  description: 'Novák Blanka, biológus doktorandusz, nyelvtanár, 13 000+ követővel. Megismerheted a módszerem mögötti tudományt és személyes tanulási utamat.',
  openGraph: {
    title: 'Rólam | Novák Blanka',
    description: 'Biológus doktorandusz, 7 nyelven, 13 000+ követő — megismerheted a módszerem mögötti tudományt.',
    url: 'https://blankanovak.com/rolam',
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Novák Blanka',
  url: 'https://blankanovak.com',
  description: 'Biológus doktorandusz, nyelvtanár, 13 000+ követővel. 7 nyelven kommunikál, online nyelvtanulási programokat vezet.',
  jobTitle: 'Nyelvtanár, Doktorandusz',
  knowsLanguage: ['Magyar', 'Angol', 'Olasz', 'Spanyol', 'Mandarin kínai'],
  sameAs: [
    'https://instagram.com/blankanovak_',
    'https://tiktok.com/@blankanovak',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Lybskin Kft.',
  },
  offers: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: 'Online Nyelvtanulási Programok',
      url: 'https://blankanovak.com/programok',
    },
  },
};

const values = [
  {
    icon: Globe,
    title: 'A nyelv kapu, nem cél',
    text: 'A nyelvtudás önmagában nem cél. Sokkal inkább eszköz arra, hogy kapcsolatokat építsünk, új kultúrákat ismerjünk meg, és olyan lehetőségekhez férjünk hozzá, amelyek képesek új irányt adni egy életnek.',
  },
  {
    icon: FlaskConical,
    title: 'Tudományos háttér',
    text: 'PhD-hallgatóként és egyetemi oktatóként biokémiát, biológiát és szintetikus biológiát tanítok. A digitális pedagógia, a STEM-motiváció és az önhatékonyság területén kutatok.',
  },
  {
    icon: BookOpen,
    title: 'Személyiségtípus-alapú módszertan',
    text: '7 nyelven szerzett tapasztalataim alapján megtanultam: a siker ritkán pusztán tehetség kérdése. Sokkal inkább a megfelelő módszereké és szemléleté.',
  },
  {
    icon: Lightbulb,
    title: 'Demokratikus tudás',
    text: 'Célom, hogy a külföldi programok, kutatási lehetőségek és a többnyelvűség ne egy szűk kör kiváltsága legyen. A megfelelő információval ezek az utak bárki előtt megnyílhatnak.',
  },
];

export default function RolamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Navbar />
      <main className="pb-20 md:pb-0 pt-20">

        {/* Hero */}
        <SectionWrapper bg="default">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center lg:order-2 animate-scale-in">
              <div className="w-72 h-80 lg:w-96 lg:h-[480px] rounded-3xl overflow-hidden border-2 border-brand-border relative">
                <Image
                  src="/images/blanka-hero.jpg"
                  alt="Novák Blanka"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="lg:order-1 space-y-5 animate-fade-in-left">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-blue leading-tight">
                Szia, <span className="text-brand-purple italic">Blanka</span> vagyok.
              </h1>
              <p className="font-sans text-lg text-brand-muted leading-relaxed">
                Tízévesen, remegő lábakkal léptem be az első angolórámra. A tanárom elővette a
                gitárját, és ahelyett, hogy nyelvtani szabályokat magyarázott volna, együtt
                írtunk egy dalt. Ekkor tanultam meg, hogy a nyelvtanulás nem kötelező feladat,
                hanem kaland.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { flag: '/images/flag_en.png', label: 'Angol' },
                  { flag: '/images/flag_it.png', label: 'Olasz' },
                  { flag: '/images/flag_es.png', label: 'Spanyol' },
                  { flag: '/images/flag_cn.png', label: 'Mandarin' },
                ].map(({ flag, label }) => (
                  <span key={label} className="flex items-center gap-1.5 font-sans text-sm bg-white border border-brand-border px-3 py-1.5 rounded-full text-brand-blue">
                    <Image src={flag} alt={label} width={18} height={18} className="w-[18px] h-[18px]" />
                    {label}
                  </span>
                ))}
                <span className="flex items-center gap-1.5 font-sans text-sm bg-white border border-brand-border px-3 py-1.5 rounded-full text-brand-muted">
                  +3 nyelv
                </span>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Story */}
        <SectionWrapper bg="surface">
          <div className="max-w-3xl mx-auto space-y-5 font-sans text-brand-muted leading-relaxed">
            <p>
              Ma hét nyelven beszélek, közülük ötön felsőfokon, és kilenc nemzetközi
              nyelvvizsgával rendelkezem. A nyelvek olyan lehetőségekhez juttattak, amelyek
              korábban elképzelhetetlennek tűntek: dolgoztam műszaki magyar–kínai tolmácsként,
              tanítottam tajvani, kínai és magyar diákokat, majd a Perui Orvostudományi
              Egyetemen spanyol nyelven oktattam.
            </p>
            <p>
              Ezek az élmények megtanítottak arra, hogy a nyelvtudás önmagában nem cél.
              Sokkal inkább eszköz arra, hogy kapcsolatokat építsünk, új kultúrákat ismerjünk
              meg, és olyan nemzetközi lehetőségekhez férjünk hozzá, amelyek képesek teljesen
              új irányt adni egy életútnak.
            </p>
            <p>
              A kíváncsiságom végül a kutatás felé vezetett. Tudományos munkám több hazai és
              nemzetközi elismerést hozott, és 18 évesen Magyarország delegáltjaként részt
              vehettem a Nobel-díj-átadó ünnepségen Stockholmban. Bár hálás vagyok ezekért a
              mérföldkövekért, számomra mindig az volt a legizgalmasabb, hogyan lehet
              embereket, tudást és lehetőségeket összekapcsolni.
            </p>
            <p>
              Jelenleg a digitális pedagógia, a STEM-motiváció és az önhatékonyság területén
              kutatok. PhD-hallgatóként és egyetemi oktatóként biokémiát, biológiát és
              szintetikus biológiát tanítok, miközben azt vizsgálom, hogyan lehet a tudományt
              inspirálóbbá, emberközelibbé és elérhetőbbé tenni a következő generáció számára.
            </p>

            <blockquote className="border-l-4 border-brand-purple pl-6 py-2 my-6">
              <p className="font-display text-xl text-brand-blue italic leading-relaxed">
                A siker ritkán pusztán tehetség kérdése. Sokkal inkább a megfelelő módszereké,
                szemléleté és azoké az embereké, akik időben megmutatják, hogy több lehetőség
                áll előtted, mint gondolnád.
              </p>
            </blockquote>

            <p>
              A célom, hogy demokratizáljam a tudást. Mindazt, amit a nyelvtanulásról, a
              tudományról, az ösztöndíjakról és a nemzetközi lehetőségekről az évek során
              megtanultam, érthetőbbé, emberközelibbé és hozzáférhetőbbé szeretném tenni
              mások számára.
            </p>
          </div>
        </SectionWrapper>

        {/* Values */}
        <SectionWrapper bg="default">
          <h2 className="font-display text-3xl font-bold text-brand-blue mb-10 text-center">
            Amit képviselek
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className={`flex gap-4 animate-fade-in stagger-${i + 1}`}>
                  <div className="w-12 h-12 bg-brand-purple-light rounded-2xl flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-brand-purple" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-brand-blue mb-1">{v.title}</h3>
                    <p className="font-sans text-sm text-brand-muted leading-relaxed">{v.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper bg="purple">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-brand-blue mb-4">
              Dolgozzunk együtt!
            </h2>
            <p className="font-sans text-brand-muted mb-8 max-w-lg mx-auto">
              Válaszd ki a számodra legmegfelelőbb programot, és kezdjük el közösen.
            </p>
            <Button href="/programok" size="lg">
              Programok megtekintése <ArrowRight size={18} />
            </Button>
          </div>
        </SectionWrapper>

      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
