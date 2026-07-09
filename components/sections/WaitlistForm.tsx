'use client';

import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function WaitlistForm({ program = 'kiscsoportos' }: { program?: string }) {
  const [form, setForm] = useState({ fullName: '', email: '', _hp: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, program }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setTimeout(() => {
        window.location.href = `/kerdoiv?email=${encodeURIComponent(form.email)}`;
      }, 500);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-600 font-sans text-sm bg-green-50 rounded-xl p-3 border border-green-200">
        <Check size={16} />
        Felkerültél a várólistára! Átirányítás...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }} aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" value={form._hp} onChange={e => setForm(f => ({ ...f, _hp: e.target.value }))} />
      </div>
      <Input
        placeholder="Neved"
        value={form.fullName}
        onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
      />
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Email címed"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
        </div>
        <Button type="submit" loading={status === 'loading'} size="sm" className="shrink-0">
          Várólistára <ArrowRight size={14} />
        </Button>
      </div>
      {status === 'error' && (
        <p className="text-brand-coral text-xs font-sans">Hiba történt, próbáld újra.</p>
      )}
    </form>
  );
}
