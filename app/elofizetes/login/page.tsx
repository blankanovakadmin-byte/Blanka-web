'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/sections/Footer';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export default function ElofizetesLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/elofizetes-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/elofizetes');
      router.refresh();
    } else {
      setError('Hibás jelszó.');
    }
  }

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0 pt-20">
        <SectionWrapper bg="default">
          <div className="max-w-lg mx-auto">
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
              <form onSubmit={handleSubmit} className="space-y-3 max-w-xs mx-auto">
                <Input
                  type="password"
                  placeholder="Jelszó"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  error={error}
                  required
                />
                <Button type="submit" size="md" className="w-full justify-center" disabled={loading}>
                  {loading ? 'Ellenőrzés...' : 'Belépés'} <ArrowRight size={14} />
                </Button>
              </form>
            </Card>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
