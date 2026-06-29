'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/sections/Footer';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Lock, ArrowRight, Check, Calendar } from 'lucide-react';

const GROUP_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_GROUP_MENTORING_PRICE_ID || '';

export default function ElofizetesPage() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [pwError, setPwError] = useState('');

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    const correct = process.env.NEXT_PUBLIC_SUBSCRIPTION_PAGE_PASSWORD;
    if (password === correct) {
      setUnlocked(true);
      setPwError('');
    } else {
      setPwError('Hibás jelszó.');
    }
  }

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0 pt-20">
        <SectionWrapper bg="default">
          <div className="max-w-lg mx-auto">

            {!unlocked ? (
              <Card className="text-center animate-fade-in">
                <div className="w-14 h-14 bg-brand-purple-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock size={24} className="text-brand-purple" />
                </div>
                <h1 className="font-display text-2xl font-bold text-brand-blue mb-2">
                  Előfizetés beállítása
                </h1>
                <p className="font-sans text-brand-muted text-sm mb-6">
                  Ez az oldal a meglévő kiscsoportos diákok számára készült.
                  Kérd el a jelszót Blankától.
                </p>
                <form onSubmit={handleUnlock} className="space-y-3 max-w-xs mx-auto">
                  <Input
                    type="password"
                    placeholder="Jelszó"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setPwError(''); }}
                    error={pwError}
                    required
                  />
                  <Button type="submit" size="md" className="w-full justify-center">
                    Belépés <ArrowRight size={14} />
                  </Button>
                </form>
              </Card>
            ) : (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <h1 className="font-display text-3xl font-bold text-brand-blue mb-2">
                    Kiscsoportos Havi Mentorprogram
                  </h1>
                  <p className="font-sans text-brand-muted">
                    Automatikus havi előfizetés beállítása
                  </p>
                </div>

                <Card>
                  <div className="space-y-4">
                    <p className="font-sans text-brand-muted text-sm leading-relaxed">
                      Az alábbi gombbal beállíthatod a havi automatikus fizetést bankkártyával.
                      A rendszer minden hónapban automatikusan levonja az előfizetés díját,
                      így nem kell manuálisan utalnod.
                    </p>

                    <div className="bg-brand-bg/60 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-brand-purple shrink-0" />
                        <p className="font-sans text-sm text-brand-text">
                          <span className="font-semibold">Havi díj:</span> 34 990 Ft
                        </p>
                      </div>
                      <ul className="space-y-1.5 ml-6">
                        {[
                          'Automatikus megújulás havonta',
                          'Bármikor lemondható',
                          'Számlát küldünk minden fizetésről',
                        ].map(f => (
                          <li key={f} className="flex items-start gap-2 font-sans text-xs text-brand-text">
                            <Check size={12} className="text-brand-purple shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      href={`/penztar?priceId=${GROUP_PRICE_ID}&type=group-mentoring`}
                      size="lg"
                      className="w-full justify-center"
                    >
                      Előfizetés indítása <ArrowRight size={16} />
                    </Button>
                  </div>
                </Card>
              </div>
            )}

          </div>
        </SectionWrapper>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
