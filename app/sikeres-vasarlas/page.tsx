import type { Metadata } from 'next';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Sikeres vásárlás!',
  robots: { index: false, follow: false },
};

export default function SikeresVasarlasPage() {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="font-display text-3xl font-bold text-brand-blue mb-3">
          Sikeres vásárlás! 🎉
        </h1>
        <p className="font-sans text-brand-muted mb-8 leading-relaxed">
          Köszönjük a vásárlást! Hamarosan kapsz egy emailt a részletekkel és a letöltési linkkel.
          Nézd meg a spam mappát is, ha néhány percen belül nem érkezik meg.
        </p>
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
