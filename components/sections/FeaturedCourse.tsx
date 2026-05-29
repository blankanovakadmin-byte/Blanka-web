import { ArrowRight, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const features = [
  'Magabiztos angol kommunikáció',
  'Személyre szabott tempó',
  'Élő gyakorlati szituációk',
  'Visszajelzés minden szinten',
  '8+ hetes strukturált program',
  'Közösségi támogató csoport',
];

export function FeaturedCourse() {
  return (
    <SectionWrapper bg="surface" id="kiemelt-kurzus">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="space-y-6 animate-fade-in-left">
          <Badge variant="coral">Kiemelt kurzus</Badge>
          <h2 className="font-display text-4xl font-bold text-brand-blue leading-tight">
            Magabiztosan{' '}
            <span className="text-brand-purple italic">Angolul</span>
          </h2>
          <p className="font-sans text-brand-muted text-lg leading-relaxed">
            Fejleszd az önbizalmad angolul, és szólalj meg magabiztosan minden
            helyzetben — az állásinterjútól a külföldi utazásig.
          </p>

          <ul className="grid grid-cols-2 gap-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check size={16} className="text-brand-purple mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-brand-text">{f}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 pt-2">
            <div>
              <p className="font-sans text-xs text-brand-muted uppercase tracking-wide">Egyszeri díj</p>
              <p className="font-display text-3xl font-bold text-brand-blue">89 000 Ft</p>
            </div>
            <Button
              href={process.env.NEXT_PUBLIC_COURSE_CHECKOUT_URL || '/programok'}
              size="lg"
              external={!!process.env.NEXT_PUBLIC_COURSE_CHECKOUT_URL}
            >
              Csatlakozom
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>

        {/* Right: visual card */}
        <div className="relative animate-scale-in">
          <div className="bg-gradient-to-br from-brand-purple to-brand-blue-dark rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 blob" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 blob" />

            <div className="relative">
              <div className="flex items-center gap-1 mb-6">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={16} fill="currentColor" className="text-yellow-300" />
                ))}
                <span className="ml-2 text-white/80 text-sm font-sans">4.9/5 értékelés</span>
              </div>

              <h3 className="font-display text-2xl font-bold mb-3">
                Mi vár rád a kurzusban?
              </h3>

              <ul className="space-y-3">
                {[
                  '8 hetes strukturált program',
                  'Heti élő csoportos foglalkozás',
                  'Személyre szabott feladatok',
                  'Privát Telegram csoport',
                  'Élethosszig tartó hozzáférés',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-sans text-sm text-white/90">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Check size={12} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="font-sans text-xs text-white/60 uppercase tracking-widest mb-1">Következő indulás</p>
                <p className="font-display text-xl font-bold">2026. június</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
