'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function SikeresContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;

    async function redirect() {
      try {
        const res = await fetch(`/api/checkout/session?session_id=${sessionId}`);
        if (!res.ok) return;
        const { email } = await res.json();
        if (cancelled || !email) return;
        setRedirecting(true);
        window.location.href = `/kerdoiv?email=${encodeURIComponent(email)}`;
      } catch {
        // Stripe lookup failed, stay on success page
      }
    }

    redirect();
    return () => { cancelled = true; };
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="font-display text-3xl font-bold text-brand-blue mb-3">
          Sikeres vásárlás!
        </h1>
        <p className="font-sans text-brand-muted mb-8 leading-relaxed">
          Köszönjük a vásárlást! Hamarosan kapsz egy emailt a részletekkel és a letöltési linkkel.
          Nézd meg a spam mappát is, ha néhány percen belül nem érkezik meg.
        </p>
        {redirecting && (
          <div className="flex items-center justify-center gap-2 text-brand-purple font-sans text-sm mb-6">
            <Loader2 size={16} className="animate-spin" />
            Átirányítás a kérdőívhez...
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/" size="md">
            Vissza a főoldalra <ArrowRight size={16} />
          </Button>
          <Button href="/forrasok" variant="secondary" size="md">
            Több anyag felfedezése
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function SikeresVasarlasPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
        <Loader2 size={24} className="animate-spin text-brand-purple" />
      </div>
    }>
      <SikeresContent />
    </Suspense>
  );
}
