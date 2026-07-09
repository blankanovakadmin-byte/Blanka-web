import { ArrowRight, BookOpen, Download } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen bg-brand-bg flex items-center overflow-hidden pt-20">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-purple/10 blob animate-float" />
      <div className="absolute bottom-20 left-0 w-48 h-48 bg-brand-teal/20 blob animate-float stagger-3" />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-brand-purple rounded-full opacity-40 animate-float stagger-2" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div className="space-y-6">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue leading-tight animate-fade-in">
              A tudás szabaddá tesz.{' '}
              <span className="text-brand-purple italic">A nyelvek megnyitják előtted a világot.</span>
            </h1>

            <p className="font-sans text-lg text-brand-muted leading-relaxed animate-fade-in stagger-1 max-w-lg">
              Segítek, hogy magabiztosan kommunikálj több nyelven, új lehetőségeket érj el
              nemzetközi környezetben, és olyan készségeket építs, amelyek valódi változást
              hoznak az életedbe.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 animate-fade-in stagger-2">
              <Button href="/programok" size="lg">
                <BookOpen size={20} />
                Programok felfedezése
                <ArrowRight size={18} />
              </Button>
              <Button href="/forrasok" variant="secondary" size="lg">
                <Download size={20} />
                Ingyenes és Prémium anyagok
              </Button>
            </div>
          </div>

          {/* Right: photo placeholder */}
          <div className="relative flex justify-center animate-scale-in stagger-2">
            <div className="relative w-80 h-96 lg:w-96 lg:h-[480px]">
              {/* Photo placeholder */}
              <div className="relative w-full h-full rounded-3xl border-2 border-brand-border overflow-hidden">
                <Image
                  src="/images/blanka-hero.png"
                  alt="Novák Blanka angol nyelvtanár – online kurzusok és mentorprogramok"
                  fill
                  sizes="(max-width: 768px) 640px, 768px"
                  className="object-cover object-top"
                  quality={90}
                  priority
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border border-brand-border animate-float stagger-5">
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                  {[
                    { src: '/images/flag_en.png', label: 'Angol', alt: 'Angol zászló' },
                    { src: '/images/flag_it.png', label: 'Olasz', alt: 'Olasz zászló' },
                    { src: '/images/flag_es.png', label: 'Spanyol', alt: 'Spanyol zászló' },
                    { src: '/images/flag_cn.png', label: 'Kínai', alt: 'Kínai zászló' },
                  ].map(f => (
                    <div key={f.label} className="flex items-center gap-1.5">
                      <Image src={f.src} alt={f.alt} width={20} height={20} className="w-5 h-5" />
                      <span className="font-sans text-xs text-brand-text">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

