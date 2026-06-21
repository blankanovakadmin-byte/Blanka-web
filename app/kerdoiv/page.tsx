'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const LANGUAGES = ['Angol', 'Olasz', 'Spanyol', 'Kínai'];
const LEVELS = [
  { value: 'A1', label: 'A1 (abszolút kezdő)' },
  { value: 'A2', label: 'A2 (alapszint)' },
  { value: 'B1', label: 'B1 (középhaladó)' },
  { value: 'B2', label: 'B2 (magabiztos kommunikáció)' },
  { value: 'C1', label: 'C1 (folyékony nyelvhasználat)' },
  { value: 'C2', label: 'C2 (anyanyelvihez közeli szint)' },
];

export default function KerdoivPage() {
  const [form, setForm] = useState({
    languages: [] as string[],
    level: '',
    goal: '',
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const email = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('email') || '' : '';

  function toggleLang(lang: string) {
    setForm(f => ({
      ...f,
      languages: f.languages.includes(lang)
        ? f.languages.filter(l => l !== lang)
        : [...f.languages, lang],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.languages.length === 0 || !form.level || !form.goal) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ...form }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 max-w-lg w-full text-center border border-brand-border">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-green-600" />
          </div>
          <h1 className="font-display text-2xl font-bold text-brand-blue mb-2">Köszönöm a válaszaidat!</h1>
          <p className="font-sans text-brand-muted">Ezek alapján még személyre szabottabb segítséget tudok nyújtani neked.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-brand-border">
        <h1 className="font-display text-2xl font-bold text-brand-blue mb-2">Ismerjünk meg jobban!</h1>
        <p className="font-sans text-brand-muted text-sm mb-8">Töltsd ki ezt a rövid kérdőívet, hogy személyre szabottabb segítséget tudjak nyújtani.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Languages */}
          <fieldset>
            <legend className="font-sans font-semibold text-brand-blue text-sm mb-3">
              Milyen nyelvet/nyelveket szeretnél tanulni? <span className="text-brand-coral">*</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map(lang => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLang(lang)}
                  className={`px-4 py-2 rounded-xl text-sm font-sans font-medium border transition-all ${
                    form.languages.includes(lang)
                      ? 'bg-brand-purple text-white border-brand-purple'
                      : 'bg-white text-brand-blue border-brand-border hover:border-brand-purple'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Level */}
          <fieldset>
            <legend className="font-sans font-semibold text-brand-blue text-sm mb-3">
              Milyen szinten vagy az adott nyelvből? <span className="text-brand-coral">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {LEVELS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, level: value }))}
                  className={`px-3 py-2 rounded-xl text-sm font-sans text-left border transition-all ${
                    form.level === value
                      ? 'bg-brand-purple text-white border-brand-purple'
                      : 'bg-white text-brand-blue border-brand-border hover:border-brand-purple'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Goal */}
          <div>
            <label className="font-sans font-semibold text-brand-blue text-sm mb-2 block">
              Mi a célod a nyelvvel? Miben szeretnél fejlődni? <span className="text-brand-coral">*</span>
            </label>
            <textarea
              value={form.goal}
              onChange={e => setForm(f => ({ ...f, goal: e.target.value.slice(0, 500) }))}
              maxLength={500}
              rows={3}
              required
              className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm font-sans text-brand-text focus:outline-none focus:border-brand-purple resize-none"
              placeholder="Pl. szeretnék magabiztosabban beszélni, állásinterjúra készülök..."
            />
            <p className="font-sans text-xs text-brand-muted mt-1 text-right">{500 - form.goal.length} karakter</p>
          </div>

          {/* Notes */}
          <div>
            <label className="font-sans font-semibold text-brand-blue text-sm mb-2 block">
              Egyéb, amit szívesen megosztanál? <span className="text-brand-muted font-normal">(opcionális)</span>
            </label>
            <textarea
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value.slice(0, 500) }))}
              maxLength={500}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm font-sans text-brand-text focus:outline-none focus:border-brand-purple resize-none"
            />
          </div>

          <Button
            type="submit"
            loading={status === 'loading'}
            size="lg"
            className="w-full justify-center"
            disabled={form.languages.length === 0 || !form.level || !form.goal}
          >
            Elküldöm
          </Button>
          {status === 'error' && (
            <p className="text-brand-coral text-sm font-sans text-center">Hiba történt, kérlek próbáld újra.</p>
          )}
        </form>
      </div>
    </div>
  );
}
