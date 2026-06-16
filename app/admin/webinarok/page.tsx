'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, ArrowLeft, Calendar, Clock, Users, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import type { Webinar } from '@/types';

type FormData = Omit<Webinar, 'id'>;

const emptyForm: FormData = {
  title: '',
  date: '',
  time: '',
  zoomLink: '',
  registrationOpen: true,
  maxParticipants: 0,
  description: '',
};

export default function AdminWebinarokPage() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Webinar | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchWebinars(); }, []);

  async function fetchWebinars() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/webinars');
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error || `Hiba: ${res.status}`);
      } else {
        setWebinars(await res.json());
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Hálózati hiba');
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setFormOpen(true);
  }

  function openEdit(w: Webinar) {
    setEditing(w);
    setForm({ title: w.title, date: w.date, time: w.time, zoomLink: w.zoomLink, registrationOpen: w.registrationOpen, maxParticipants: w.maxParticipants, description: w.description });
    setFormOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editing ? `/api/admin/webinars/${editing.id}` : '/api/admin/webinars';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { await fetchWebinars(); setFormOpen(false); }
      else {
        const j = await res.json().catch(() => ({}));
        alert(j.error || 'Mentés sikertelen');
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Biztosan törlöd a webinart?')) return;
    const res = await fetch(`/api/admin/webinars/${id}`, { method: 'DELETE' });
    if (res.ok) await fetchWebinars();
    else alert('Törlés sikertelen');
  }

  async function toggleRegistration(w: Webinar) {
    const res = await fetch(`/api/admin/webinars/${w.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registrationOpen: !w.registrationOpen }),
    });
    if (res.ok) {
      await fetchWebinars();
    } else {
      const j = await res.json().catch(() => ({}));
      setError(j.error || 'Frissítés sikertelen');
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-brand-muted hover:text-brand-purple">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="font-display text-xl font-bold text-brand-blue">Webinárok</h1>
          </div>
          <Button onClick={openCreate} size="sm">
            <Plus size={16} /> Új webinár
          </Button>
        </div>

        {error && (
          <Card className="bg-red-50 border-red-200 mb-4">
            <p className="font-sans text-sm text-red-700">{error}</p>
          </Card>
        )}

        {loading ? (
          <p className="font-sans text-brand-muted text-center py-12">Betöltés...</p>
        ) : webinars.length === 0 ? (
          <Card className="text-center py-12">
            <p className="font-sans text-brand-muted">Nincs webinár. Adj hozzá egyet!</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {webinars.map(w => {
              const isUpcoming = new Date(w.date) >= new Date();
              const dateFormatted = new Date(w.date).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });
              return (
                <Card key={w.id} className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <h3 className="font-sans font-semibold text-brand-blue">{w.title}</h3>
                      <Badge variant={isUpcoming ? 'teal' : 'muted'}>{isUpcoming ? 'Közelgő' : 'Lejárt'}</Badge>
                      <button onClick={() => toggleRegistration(w)} className="flex items-center gap-1 text-xs font-sans px-2 py-0.5 rounded-full border transition-colors"
                        style={w.registrationOpen ? { color: '#16a34a', borderColor: '#86efac' } : { color: '#7A7A8C', borderColor: '#d1d5db' }}>
                        {w.registrationOpen ? <><CheckCircle size={11} /> Nyitott</> : <><XCircle size={11} /> Zárva</>}
                      </button>
                    </div>
                    {w.description && <p className="font-sans text-sm text-brand-muted mb-2 line-clamp-2">{w.description}</p>}
                    <div className="flex flex-wrap gap-4">
                      <span className="flex items-center gap-1.5 text-xs text-brand-muted font-sans"><Calendar size={12} /> {dateFormatted}</span>
                      <span className="flex items-center gap-1.5 text-xs text-brand-muted font-sans"><Clock size={12} /> {w.time}</span>
                      {w.maxParticipants > 0 && <span className="flex items-center gap-1.5 text-xs text-brand-muted font-sans"><Users size={12} /> {w.maxParticipants} fő</span>}
                      {w.zoomLink && <a href={w.zoomLink} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-purple hover:underline font-sans">Zoom link</a>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => openEdit(w)} className="p-2 rounded-lg hover:bg-brand-purple-light text-brand-muted hover:text-brand-purple transition-colors">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(w.id)} className="p-2 rounded-lg hover:bg-red-50 text-brand-muted hover:text-brand-coral transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {formOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <h2 className="font-display text-lg font-bold text-brand-blue mb-6">
                {editing ? 'Webinár szerkesztése' : 'Új webinár'}
              </h2>
              <form onSubmit={handleSave} className="space-y-4">
                <Input label="Cím" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                <Input label="Dátum (YYYY-MM-DD)" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
                <Input label="Időpont (pl. 18:00)" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} required />
                <Input label="Zoom link" value={form.zoomLink} onChange={e => setForm(f => ({ ...f, zoomLink: e.target.value }))} />
                <Input label="Max. résztvevők" type="number" value={form.maxParticipants} onChange={e => setForm(f => ({ ...f, maxParticipants: Number(e.target.value) }))} />
                <div>
                  <label className="text-sm font-medium text-brand-text font-sans block mb-1">Leírás</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border font-sans text-sm focus:border-brand-purple focus:outline-none resize-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="regOpen" checked={form.registrationOpen} onChange={e => setForm(f => ({ ...f, registrationOpen: e.target.checked }))} className="accent-brand-purple" />
                  <label htmlFor="regOpen" className="font-sans text-sm text-brand-text">Regisztráció nyitott</label>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="submit" loading={saving} className="flex-1 justify-center">Mentés</Button>
                  <Button type="button" variant="secondary" onClick={() => setFormOpen(false)} className="flex-1 justify-center">Mégse</Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
