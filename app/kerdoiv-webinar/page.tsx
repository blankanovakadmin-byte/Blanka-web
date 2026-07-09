'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const PRESET_LANGUAGES = ['Angol', 'Kínai', 'Spanyol', 'Olasz'];

function KerdoivWebinarForm() {
  const searchParams = useSearchParams();
  const priceId = searchParams.get('priceId') || '';
  const type = searchParams.get('type') || '';
  const webinarId = searchParams.get('webinarId') || '';
  const prefillEmail = searchParams.get('email') || '';

  const [form, setForm] = useState({
    email: prefillEmail,
    languages: [] as string[],
    otherChecked: false,
    otherLanguage: '',
    level: '',
    obstacles: '',
    motivation: '',
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function toggleLang(lang: string) {
    setForm(f => ({
      ...f,
      languages: f.languages.includes(lang)
        ? f.languages.filter(l => l !== lang)
        : [...f.languages, lang],
    }));
  }

  function buildRedirectUrl(email: string) {
    const encoded = encodeURIComponent(email);
    if (webinarId && priceId) {
      return `/penztar?priceId=${priceId}&type=webinar&webinarId=${webinarId}&email=${encoded}`;
    }
    if (webinarId) {
      return `/webinar-regisztracio?id=${webinarId}&email=${encoded}`;
    }
    if (priceId && type) {
      return `/penztar?priceId=${priceId}&type=${type}&email=${encoded}`;
    }
    return '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allLanguages = [
      ...form.languages,
      ...(form.otherChecked && form.otherLanguage.trim() ? [form.otherLanguage.trim()] : []),
    ];
    if (allLanguages.length === 0 || !form.level || !form.obstacles || !form.motivation || !form.email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/survey-webinar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          languages: allLanguages,
          level: form.level,
          obstacles: form.obstacles,
          motivation: form.motivation,
          notes: form.notes,
        }),
      });
      if (!res.ok) throw new Error();
      const redirect = buildRedirectUrl(form.email);
      if (redirect) {
        window.location.href = redirect;
      } else {
        setStatus('success');
      }
    } catch {
      setStatus('error');
    }
  }

  const allLanguages = [
    ...form.languages,
    ...(form.otherChecked && form.otherLanguage.trim() ? [form.otherLanguage.trim()] : []),
  ];
  const canSubmit = allLanguages.length > 0 && !!form.level && !!form.obstacles && !!form.motivation && !!form.email;

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 max-w-lg w-full text-center border border-brand-border">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-green-600" />
          </div>
          <h1 className="font-display text-2xl font-bold text-brand-blue mb-2">Köszönöm a válaszaidat!</h1>
          <p className="font-sans text-brand-muted">Ezek alapján még személyre szabottabb lesz a workshop számodra.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-brand-border">
        <h1 className="font-display text-2xl font-bold text-brand-blue mb-2">
          Hogy igazán neked szóljon a workshop
        </h1>
        <p className="font-sans text-brand-muted text-sm mb-8">
          Kérlek, válaszolj pár kérdésre.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="font-sans font-semibold text-brand-blue text-sm mb-2 block">
              Email-cím <span className="text-brand-coral">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
              className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm font-sans text-brand-text focus:outline-none focus:border-brand-purple"
              placeholder="email@cimed.hu"
            />
          </div>

          {/* Languages */}
          <fieldset>
            <legend className="font-sans font-semibold text-brand-blue text-sm mb-3">
              Milyen nyelven / nyelveken szeretnél tanulni? <span className="text-brand-coral">*</span>
            </legend>
            <div className="flex flex-col gap-2">
              {PRESET_LANGUAGES.map(lang => (
                <label key={lang} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => toggleLang(lang)}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                      form.languages.includes(lang)
                        ? 'bg-brand-purple border-brand-purple'
                        : 'border-brand-border group-hover:border-brand-purple'
                    }`}
                  >
                    {form.languages.includes(lang) && <Check size={12} className="text-white" />}
                  </div>
                  <span
                    onClick={() => toggleLang(lang)}
                    className="font-sans text-sm text-brand-text"
                  >
                    {lang}
                  </span>
                </label>
              ))}
              {/* Egyéb */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => setForm(f => ({ ...f, otherChecked: !f.otherChecked, otherLanguage: f.otherChecked ? '' : f.otherLanguage }))}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                    form.otherChecked
                      ? 'bg-brand-purple border-brand-purple'
                      : 'border-brand-border group-hover:border-brand-purple'
                  }`}
                >
                  {form.otherChecked && <Check size={12} className="text-white" />}
                </div>
                <span
                  onClick={() => setForm(f => ({ ...f, otherChecked: !f.otherChecked, otherLanguage: f.otherChecked ? '' : f.otherLanguage }))}
                  className="font-sans text-sm text-brand-text"
                >
                  Egyéb:
                </span>
                {form.otherChecked && (
                  <input
                    type="text"
                    value={form.otherLanguage}
                    onChange={e => setForm(f => ({ ...f, otherLanguage: e.target.value }))}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-brand-border text-sm font-sans text-brand-text focus:outline-none focus:border-brand-purple"
                    placeholder="Pl. Japán"
                    autoFocus
                  />
                )}
              </label>
            </div>
          </fieldset>

          {/* Level */}
          <div>
            <label className="font-sans font-semibold text-brand-blue text-sm mb-2 block">
              Milyen szinten vagy jelenleg? <span className="text-brand-coral">*</span>
            </label>
            <input
              type="text"
              value={form.level}
              onChange={e => setForm(f => ({ ...f, level: e.target.value }))}
              required
              className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm font-sans text-brand-text focus:outline-none focus:border-brand-purple"
              placeholder="Pl. Kezdő, A2, B1, nem tudom pontosan..."
            />
          </div>

          {/* Obstacles */}
          <div>
            <label className="font-sans font-semibold text-brand-blue text-sm mb-2 block">
              Mik a legnagyobb akadályok a számodra? <span className="text-brand-coral">*</span>
            </label>
            <textarea
              value={form.obstacles}
              onChange={e => setForm(f => ({ ...f, obstacles: e.target.value.slice(0, 500) }))}
              maxLength={500}
              rows={3}
              required
              className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm font-sans text-brand-text focus:outline-none focus:border-brand-purple resize-none"
              placeholder="Pl. nem merek megszólalni, nincs időm rendszeresen tanulni..."
            />
            <p className="font-sans text-xs text-brand-muted mt-1 text-right">{500 - form.obstacles.length} karakter</p>
          </div>

          {/* Motivation */}
          <div>
            <label className="font-sans font-semibold text-brand-blue text-sm mb-2 block">
              Miért fontos számodra, hogy megtanuld ezt a nyelvet? Mi a célod? <span className="text-brand-coral">*</span>
            </label>
            <textarea
              value={form.motivation}
              onChange={e => setForm(f => ({ ...f, motivation: e.target.value.slice(0, 500) }))}
              maxLength={500}
              rows={3}
              required
              className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm font-sans text-brand-text focus:outline-none focus:border-brand-purple resize-none"
              placeholder="Pl. munkában kell, szeretnék külföldön élni, régi álmom..."
            />
            <p className="font-sans text-xs text-brand-muted mt-1 text-right">{500 - form.motivation.length} karakter</p>
          </div>

          {/* Notes */}
          <div>
            <label className="font-sans font-semibold text-brand-blue text-sm mb-2 block">
              Egyéb megjegyzés, amit szívesen megosztanál? 🙂{' '}
              <span className="text-brand-muted font-normal">(opcionális)</span>
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
            disabled={!canSubmit}
          >
            {(priceId || webinarId) ? 'Tovább a regisztrációra →' : 'Elküldöm'}
          </Button>
          {status === 'error' && (
            <p className="text-brand-coral text-sm font-sans text-center">Hiba történt, kérlek próbáld újra.</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default function KerdoivWebinarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-bg" />}>
      <KerdoivWebinarForm />
    </Suspense>
  );
}
