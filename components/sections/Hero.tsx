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
            <p className="text-brand-purple font-sans font-semibold text-sm uppercase tracking-widest animate-fade-in">
              Nyelvtanulási Programok
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue leading-tight animate-fade-in stagger-1">
              Tanulj{' '}
              <span className="text-brand-purple italic">hatékonyan.</span>
              <br />
              Nyiss új{' '}
              <span className="text-brand-blue">világokra.</span>
            </h1>

            <p className="font-sans text-lg text-brand-muted leading-relaxed animate-fade-in stagger-2 max-w-lg">
              Válassz az általam kínált programok közül, és találd meg a számodra
              legmegfelelőbbet! Személyre szabott angol tanulás mentorom segítségével,
              kiscsoportban vagy önállóan.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 animate-fade-in stagger-3">
              {[
                { value: '500+', label: 'elégedett tanuló' },
                { value: '8 év', label: 'tapasztalat' },
                { value: '13k+', label: 'közösségi követő' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-display text-2xl font-bold text-brand-blue">
                    {stat.value}
                  </span>
                  <span className="font-sans text-xs text-brand-muted">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 animate-fade-in stagger-4">
              <Button href="/programok" size="lg">
                <BookOpen size={20} />
                Programok felfedezése
                <ArrowRight size={18} />
              </Button>
              <Button href="/forrasok" variant="secondary" size="lg">
                <Download size={20} />
                Ingyenes anyagok
              </Button>
            </div>
          </div>

          {/* Right: photo placeholder */}
          <div className="relative flex justify-center animate-scale-in stagger-2">
            <div className="relative w-80 h-96 lg:w-96 lg:h-[480px]">
              {/* Photo placeholder */}
              <div className="w-full h-full rounded-3xl bg-brand-purple-light flex items-center justify-center border-2 border-brand-border overflow-hidden">
                {/* TODO: replace with actual photo */}
                <div className="text-center text-brand-muted p-8">
                  <div className="w-32 h-32 bg-brand-purple/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User size={48} className="text-brand-purple/50" />
                  </div>
                  <p className="font-sans text-sm">Blanka fotója</p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 border border-brand-border animate-float stagger-5">
                <div className="w-10 h-10 bg-brand-purple-light rounded-xl flex items-center justify-center">
                  <Image src="/images/icon_vilag.png" alt="világ" width={24} height={24} className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-sans font-bold text-brand-blue text-sm">4 nyelv</p>
                  <p className="font-sans text-xs text-brand-muted">angolul, olaszul...</p>
                </div>
              </div>

              {/* Floating rating */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3 border border-brand-border animate-float stagger-3">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="font-sans text-xs text-brand-muted mt-0.5">500+ tanuló</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function User({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  );
}
