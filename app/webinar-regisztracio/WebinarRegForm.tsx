'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Clock, Users, Check } from 'lucide-react';

interface Webinar {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  maxParticipants: number;
  registrationOpen: boolean;
  registrationCount: number;
}

function RegForm() {
  const searchParams = useSearchParams();
  const webinarId = searchParams.get('id');

  const [webinar, setWebinar] = useState<Webinar | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ fullName: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!webinarId) { setLoading(false); return; }
    fetch(`/api/webinar/info?id=${webinarId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { setWebinar(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [webinarId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/webinar/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, webinarId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Hiba történt.');
      }
      setStatus('success');
      setTimeout(() => {
        window.location.href = `/kerdoiv?email=${encodeURIComponent(form.email)}`;
      }, 500);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Hiba történt. Próbáld újra!');
    }
  }

  const dateFormatted = webinar
    ? new Date(webinar.date).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <SectionWrapper bg="default">
      <div className="max-w-xl mx-auto">
        {loading && (
          <div className="text-center py-16 font-sans text-brand-muted">Betöltés...</div>
        )}
        {!loading && !webinarId && (
          <div className="text-center py-16 font-sans text-brand-muted">Hiányzó webinár azonosító.</div>
        )}
        {!loading && webinarId && !webinar && (
          <div className="text-center py-16 font-sans text-brand-muted">A webinár nem található.</div>
        )}
        {!loading && webinar && (
          <>
            <div className="mb-8 animate-fade-in">
              <Badge variant="blue" className="mb-3">Webinár</Badge>
              <h1 className="font-display text-3xl font-bold text-brand-blue mb-4">{webinar.title}</h1>
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="flex items-center gap-1.5 text-sm text-brand-muted font-sans">
                  <Calendar size={14} /> {dateFormatted}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-brand-muted font-sans">
                  <Clock size={14} /> {webinar.time}
                </span>
                {webinar.maxParticipants > 0 && (
                  <span className="flex items-center gap-1.5 text-sm text-brand-muted font-sans">
                    <Users size={14} /> Max. {webinar.maxParticipants} fő
                  </span>
                )}
              </div>
              {webinar.description && (
                <p className="font-sans text-brand-muted leading-relaxed">{webinar.description}</p>
              )}
            </div>

            <Card className="animate-fade-in stagger-1">
              {!webinar.registrationOpen ? (
                <div className="text-center py-8 font-sans text-brand-muted">
                  A regisztráció jelenleg zárva van.
                </div>
              ) : webinar.maxParticipants > 0 && webinar.registrationCount >= webinar.maxParticipants ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={24} className="text-brand-coral" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-brand-blue mb-2">Ez az esemény betelt</h2>
                  <p className="font-sans text-brand-muted text-sm">
                    Sajnos már nem tudunk több résztvevőt fogadni erre a webinárra.<br />
                    Iratkozz fel a hírlevélre, hogy értesülj a következő alkalomról!
                  </p>
                </div>
              ) : status === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-green-600" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-brand-blue mb-2">Sikeres regisztráció!</h2>
                  <p className="font-sans text-brand-muted text-sm">
                    Visszaigazolót küldtünk a megadott email-címre. Átirányítás...
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-xl font-bold text-brand-blue mb-6">Regisztráció</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      label="Teljes neved"
                      placeholder="Kiss Anna"
                      value={form.fullName}
                      onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="email@cimed.hu"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      required
                    />
                    {status === 'error' && (
                      <p className="text-brand-coral font-sans text-sm">{errorMsg}</p>
                    )}
                    <Button type="submit" loading={status === 'loading'} className="w-full justify-center">
                      Regisztrálok
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </>
        )}
      </div>
    </SectionWrapper>
  );
}

export function WebinarRegForm() {
  return (
    <Suspense fallback={null}>
      <RegForm />
    </Suspense>
  );
}
