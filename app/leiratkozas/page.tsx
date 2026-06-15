'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';

export default function LeiratkozasPage() {
  const params = useSearchParams();
  const email = params.get('email') || '';
  const token = params.get('t') || '';
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleUnsubscribe() {
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0 pt-24 min-h-screen">
        <SectionWrapper bg="default">
          <div className="max-w-md mx-auto text-center">
            {status === 'done' ? (
              <Card className="py-12">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h1 className="font-display text-2xl font-bold text-brand-blue mb-3">Leiratkoztál</h1>
                <p className="font-sans text-brand-muted mb-6">
                  Sikeresen leiratkoztál a hírlevélről. Nem fogok több hírlevelet küldeni erre a címre.
                </p>
                <Button href="/" variant="secondary">Vissza a főoldalra</Button>
              </Card>
            ) : status === 'error' ? (
              <Card className="py-12">
                <XCircle size={48} className="text-brand-coral mx-auto mb-4" />
                <h1 className="font-display text-2xl font-bold text-brand-blue mb-3">Valami nem sikerült</h1>
                <p className="font-sans text-brand-muted mb-6">
                  A leiratkozási link érvénytelen vagy lejárt. Írj egy emailt a{' '}
                  <a href="mailto:info@blankanovak.com" className="text-brand-purple underline">info@blankanovak.com</a>
                  {' '}címre és manuálisan eltávolítalak.
                </p>
                <Button href="/" variant="secondary">Vissza a főoldalra</Button>
              </Card>
            ) : (
              <Card className="py-12">
                <h1 className="font-display text-2xl font-bold text-brand-blue mb-3">Leiratkozás</h1>
                <p className="font-sans text-brand-muted mb-2">
                  Biztosan le szeretnél iratkozni a hírlevélről?
                </p>
                {email && (
                  <p className="font-sans text-sm text-brand-muted mb-8">
                    Email: <span className="font-medium text-brand-blue">{email}</span>
                  </p>
                )}
                <div className="flex flex-col gap-3">
                  <Button onClick={handleUnsubscribe} loading={status === 'loading'} variant="secondary">
                    Igen, leiratkozom
                  </Button>
                  <Link href="/" className="font-sans text-sm text-brand-muted hover:text-brand-purple">
                    Mégsem, maradok
                  </Link>
                </div>
              </Card>
            )}
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
