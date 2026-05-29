import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/sections/Footer';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { ArrowRight, BookOpen, FlaskConical, Globe, Heart } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = { title: 'Rólam' };

const values = [
  {
    icon: Globe,
    title: 'Több mint szavak',
    text: 'A nyelvtanulás kapunyitás: más kultúrák, más gondolkodásmódok, más lehetőségek. Ezt szeretném átadni.',
  },
  {
    icon: Heart,
    title: 'Személyes kapcsolat',
    text: 'Nem sablonos módszereket követek — minden tanulómhoz személyesen alkalmazkodom, hogy valódi haladást érhessünk el.',
  },
  {
    icon: FlaskConical,
    title: 'Tudományos alap',
    text: 'Biológusként és doktoranduszként a modern memóriakutatás és kognitív tudomány eredményeit építem be a tanításba.',
  },
  {
    icon: BookOpen,
    title: 'Folyamatos fejlődés',
    text: '4 nyelven kommunikálok — a tanulás sosem áll meg. Saját tapasztalataimat is felhasználom a módszertanom finomításához.',
  },
];

export default function RolamPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0 pt-20">
        {/* Hero */}
        <SectionWrapper bg="default">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="flex justify-center lg:order-2 animate-scale-in">
              <div className="w-72 h-80 lg:w-96 lg:h-[420px] rounded-3xl bg-brand-purple-light flex items-center justify-center border-2 border-brand-border">
                {/* TODO: replace with actual photo */}
                <div className="text-center text-brand-muted p-8">
                  <div className="w-24 h-24 bg-brand-purple/20 rounded-full mx-auto mb-4" />
                  <p className="font-sans text-sm">Blanka fotója</p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="lg:order-1 space-y-5 animate-fade-in-left">
              <p className="font-sans text-brand-purple font-semibold text-sm uppercase tracking-widest">
                Szia, én vagyok
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-blue leading-tight">
                Novák <span className="text-brand-purple italic">Blanka</span>
              </h1>
              <p className="font-sans text-lg text-brand-muted leading-relaxed">
                Biológus, doktorandusz, nyelvtanár — és szenvedélyes kommunikátor. Az évek alatt
                rájöttem, hogy a nyelvtanulás legnagyobb akadálya nem a grammatika, hanem az
                önbizalom hiánya.
              </p>
              <p className="font-sans text-brand-muted leading-relaxed">
                Azért tanítok, mert hiszem: mindenkinek megvan a lehetősége, hogy magabiztosan
                szólaljon meg idegen nyelven. Csak a megfelelő módszerre és egy kis bátorításra
                van szükség.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
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
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Story */}
        <SectionWrapper bg="surface">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-brand-blue mb-6 text-center">
              A történetem
            </h2>
            <div className="space-y-4 font-sans text-brand-muted leading-relaxed">
              <p>
                Biológia szakon végeztem, doktori kutatásaimat a sejtbiológia területén folytatom.
                Az akadémiai világ megtanított arra, hogy a precizitás és a rendszer fontosabb, mint
                a szorgalom önmagában.
              </p>
              <p>
                Az angoltanulás az életem természetes részévé vált: tudományos konferenciákon,
                külföldi kutatócsapatokban, nemzetközi publikációkban. De a valódi áttörés akkor
                jött, amikor elkezdtem <em>tudatosan</em> tanulni — nem csak szavakat memorizálni,
                hanem a gondolkodásmódot megérteni.
              </p>
              <p>
                Mára 25 000+ embert inspirálok a közösségi médiában, és 500+ tanulónak segítettem
                elérni a célját. Minden tanítványom megerősíti: az önbizalom visszaszerzése az igazi
                eredmény, a jobb angol csak következménye.
              </p>
            </div>
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
                <div
                  key={v.title}
                  className={`flex gap-4 animate-fade-in stagger-${i + 1}`}
                >
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
              Csatlakozz a közösséghez!
            </h2>
            <p className="font-sans text-brand-muted mb-8 max-w-lg mx-auto">
              Indulj el velem a nyelvtanulás útján — válasd ki a számodra legjobb programot.
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
