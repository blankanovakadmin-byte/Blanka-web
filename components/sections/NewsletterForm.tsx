'use client';

import { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export function NewsletterForm() {
  const [form, setForm] = useState({ email: '', fullName: '', _hp: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email) return;

    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, fullName: form.fullName, source: 'homepage', _hp: form._hp }),
      });

      if (!res.ok) throw new Error();
      setStatus('success');
      setTimeout(() => {
        window.location.href = `/kerdoiv?email=${encodeURIComponent(form.email)}`;
      }, 500);
    } catch {
      setStatus('error');
      setError('Valami hiba történt. Kérlek próbáld újra!');
    }
  }

  return (
    <SectionWrapper bg="default" id="hirlevel">
      <div className="max-w-xl mx-auto text-center animate-fade-in">
        <div className="w-14 h-14 bg-brand-purple-light rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Mail size={24} className="text-brand-purple" />
        </div>

        <h2 className="font-display text-3xl font-bold text-brand-blue mb-3">
          Csatlakozz a közösséghez!
        </h2>
        <p className="font-sans text-brand-muted mb-8">
          Tippek, ingyenes anyagok és elsők között értesülsz az új programokról.
          <br />
          <span className="text-xs">Iratkozz le bármikor, spam nélkül.</span>
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 text-green-600 font-sans font-medium bg-green-50 rounded-xl p-4 border border-green-200">
            <Check size={20} />
            Sikeresen feliratkoztál! Átirányítás...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }} aria-hidden="true">
              <input tabIndex={-1} autoComplete="off" value={form._hp} onChange={e => setForm(f => ({ ...f, _hp: e.target.value }))} />
            </div>
            <Input
              placeholder="Teljes neved (pl. Kiss Anna)"
              value={form.fullName}
              onChange={(e) => setForm(f => ({ ...f, fullName: e.target.value }))}
            />
            <div className="flex gap-3 flex-col sm:flex-row">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="email@cimed.hu"
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  error={error}
                />
              </div>
              <Button type="submit" loading={status === 'loading'} size="md" className="shrink-0">
                Feliratkozok
              </Button>
            </div>
          </form>
        )}

        {status === 'error' && !error && (
          <div className="flex items-center justify-center gap-2 text-brand-coral font-sans text-sm mt-3">
            <AlertCircle size={16} />
            Valami hiba történt. Kérlek próbáld újra!
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
