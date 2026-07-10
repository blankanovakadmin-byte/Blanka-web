'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ email: '', fullName: '', _hp: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    if (localStorage.getItem('newsletter_subscribed')) return;
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  function close() {
    setVisible(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, fullName: form.fullName, source: 'popup', _hp: form._hp }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      localStorage.setItem('newsletter_subscribed', '1');
      setTimeout(() => {
        setVisible(false);
        window.location.href = `/kerdoiv?email=${encodeURIComponent(form.email)}`;
      }, 1500);
    } catch {
      setStatus('idle');
    }
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 text-brand-muted hover:text-brand-blue transition-colors"
          aria-label="Bezárás"
        >
          <X size={20} />
        </button>

        <div className="w-12 h-12 bg-brand-purple-light rounded-2xl flex items-center justify-center mb-4">
          <Mail size={22} className="text-brand-purple" />
        </div>

        <h2 className="font-display text-2xl font-bold text-brand-blue mb-2">
          Csatlakozz a közösséghez!
        </h2>
        <p className="font-sans text-brand-muted text-sm mb-6">
          Tippek, ingyenes anyagok és elsők között értesülsz az új programokról.{' '}
          <span className="text-xs">Spam nélkül, bármikor leiratkozhatsz.</span>
        </p>

        {status === 'success' ? (
          <div className="flex items-center gap-2 text-green-600 font-sans font-medium bg-green-50 rounded-xl p-4 border border-green-200">
            <Check size={20} />
            Sikeresen feliratkoztál!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }} aria-hidden="true">
              <input tabIndex={-1} autoComplete="off" value={form._hp} onChange={e => setForm(f => ({ ...f, _hp: e.target.value }))} />
            </div>
            <Input
              placeholder="Teljes neved (pl. Kiss Anna)"
              value={form.fullName}
              onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
            />
            <Input
              type="email"
              placeholder="email@cimed.hu"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
            <Button type="submit" loading={status === 'loading'} size="lg" className="w-full justify-center">
              Feliratkozom
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
