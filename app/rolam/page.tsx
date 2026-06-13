import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/sections/Footer';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Globe, FlaskConical, BookOpen, Lightbulb } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = { title: 'Rolam' };

const values = [
  {
    icon: Globe,
    title: 'A nyelv kapu, nem cel',
    text: 'A nyelvtudas onmagaban nem cel. Sokkal inkabb eszkoz arra, hogy kapcsolatokat epitsunk, uj kulturakat ismerjunk meg, es olyan lehetosegekhez ferjunk hozza, amelyek kepesek uj iranyt adni egy eletnek.',
  },
  {
    icon: FlaskConical,
    title: 'Tudomanyos hatter',
    text: 'PhD-hallgatokent es egyetemi oktatokent biokemiat, biologiat es szintetikus biologiat tanitok. A digitalis pedagogia, a STEM-motivacio es az onhatekonysag teruleten kutatok.',
  },
  {
    icon: BookOpen,
    title: 'Személyiségtípus-alapú módszertan',
    text: '7 nyelven szerzett tapasztalataim alapjan megtanultam: a siker rítkan pusztan tehetseg kerdese. Sokkal inkabb a megfelelő modszereké és szemlélété.',
  },
  {
    icon: Lightbulb,
    title: 'Demokratikus tudas',
    text: 'Celom, hogy a kulföldi programok, kutatasi lehetosegek es a tobbnyelvuseg ne egy szuk kor kiváltsaga legyen. A megfelelo informacioval ezek az utak barki elott megnyilhatnak.',
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
            <div className="flex justify-center lg:order-2 animate-scale-in">
              <div className="w-72 h-80 lg:w-96 lg:h-[480px] rounded-3xl overflow-hidden border-2 border-brand-border relative">
                <Image
                  src="/images/blanka-hero.jpg"
                  alt="Novak Blanka"
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
                Tizevesen, remego labakkal leptem be az elso angloramra. A tanarom elovette a
                gitarjat, es ahelyett, hogy nyelvtani szabalyokat magyarazott volna, egyutt
                irtunk egy dalt. Ekkor tanultam meg, hogy a nyelvtanulas nem kotelezo feladat,
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
              Ma het nyelven beszelek, kozuluk oton felsfokon, es kilenc nemzetkozi
              nyelvvizsgaval rendelkezem. A nyelvek olyan lehetosegekhez juttattak, amelyek
              korabban elkepzelhetetlennek tuntek: dolgoztam muszaki magyar-kinai tolmackent,
              tanitottam tajvani, kinai es magyar diakokapt, majd a Perui Orvostudomanyi
              Egyetemen spanyol nyelven oktattam.
            </p>
            <p>
              Ezek az elmenyek megtanitottak arra, hogy a nyelvtudas onmagaban nem cel.
              Sokkal inkabb eszkoz arra, hogy kapcsolatokat epitsunk, uj kulturakat ismerjunk
              meg, es olyan nemzetkozi lehetosegekhez ferjunk hozza, amelyek kepesek teljesen
              uj iranyt adni egy eletnak.
            </p>
            <p>
              A kivaltsagom vegul a kutatas fele vezetett. Tudomanyos munkam tobb hazai es
              nemzetkozi elismerest hozott, es 18 evesen Magyarorszag delegaljakent reszt
              vehettem a Nobel-dij-atado unnepsegen Stockholmban. Bar halas vagyok ezekert a
              merfoldkovekert, szamomra mindig az volt a legizgalmasabb, hogyan lehet
              embereket, tudast es lehetosegeket osszkapcsolni.
            </p>
            <p>
              Jelenleg a digitalis pedagogia, a STEM-motivacio es az onhatekonysag teruleten
              kutatok. PhD-hallgatokent es egyetemi oktatokent biokemiat, biologiat es
              szintetikus biologiat tanitok, mikozben azt vizsgalom, hogyan lehet a tudomany
              inspirallobbe, emberkozelebbre es elehetobbre tenni a kovetkezo generacio szamara.
            </p>

            <blockquote className="border-l-4 border-brand-purple pl-6 py-2 my-6">
              <p className="font-display text-xl text-brand-blue italic leading-relaxed">
                A siker ritkán pusztán tehetség kérdése. Sokkal inkább a megfelelő módszereké,
                szemléleté és azoké az embereké, akik időben megmutatják, hogy több lehetőség
                áll előtted, mint gondolnád.
              </p>
            </blockquote>

            <p>
              A celom, hogy demokratizaljam a tudast. Mindazt, amit a nyelvtanulasrol, a
              tudomanyrol, az osztondijjakrol es a nemzetkozi lehetosegekrol az evek soran
              megtanultam, erthetobbe, emberkozelebbre es hozzaferhetobbe szeretnem tenni
              masok szamara.
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
              Dolgozzunk egyutt!
            </h2>
            <p className="font-sans text-brand-muted mb-8 max-w-lg mx-auto">
              Valaszd ki a szamadra legmegfelelobb programot, es kezdjuk el kozosen.
            </p>
            <Button href="/programok" size="lg">
              Programok megtekintese <ArrowRight size={18} />
            </Button>
          </div>
        </SectionWrapper>

      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
