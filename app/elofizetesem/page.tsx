'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/sections/Footer';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CreditCard } from 'lucide-react';

export default function ElofizetesemPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/customer-portal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json() as { url?: string; error?: string };
    setLoading(false);

    if (!res.ok || !data.url) {
      setError(data.error || 'Hiba történt, próbáld újra.');
      return;
    }

    window.location.href = data.url;
  }

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0 pt-20">
        <SectionWrapper bg="default">
          <div className="max-w-lg mx-auto">
            <Card className="animate-fade-in">
              <div className="w-14 h-14 bg-brand-purple-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CreditCard size={24} className="text-brand-purple" />
              </div>
              <h1 className="font-display text-2xl font-bold text-brand-blue mb-2 text-center">
                Előfizetésem kezelése
              </h1>
              <p className="font-sans text-brand-muted text-sm mb-6 text-center">
                Add meg a vásárláshoz használt email címedet, és átirányítunk a Stripe portálra ahol lemondhatod az előfizetést vagy frissítheted a kártyaadataidat.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="email@pelda.hu"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  error={error}
                  required
                />
                <Button type="submit" size="md" className="w-full justify-center" disabled={loading}>
                  {loading ? 'Keresés...' : 'Tovább'} <ArrowRight size={14} />
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
