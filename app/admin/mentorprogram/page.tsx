'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Video, Calendar } from 'lucide-react';

interface Settings {
  group_mentoring_zoom_url: string;
  group_mentoring_schedule: string;
}

export default function AdminMentorprogramPage() {
  const [settings, setSettings] = useState<Settings>({
    group_mentoring_zoom_url: '',
    group_mentoring_schedule: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(data => {
        if (!data.error) setSettings(data);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setMessage({ type: 'ok', text: 'Beállítások mentve!' });
      } else {
        const data = await res.json();
        setMessage({ type: 'err', text: data.error || 'Hiba történt' });
      }
    } catch {
      setMessage({ type: 'err', text: 'Hálózati hiba' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-purple" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg p-6">
      <div className="max-w-xl mx-auto">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 font-sans text-sm text-brand-muted hover:text-brand-purple transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Vissza az admin felületre
        </Link>

        <h1 className="font-display text-2xl font-bold text-brand-blue mb-2">
          Kiscsoportos mentorprogram
        </h1>
        <p className="font-sans text-sm text-brand-muted mb-8">
          Itt tudod beállítani a kiscsoportos mentorprogram Zoom linkjét és a következő alkalom időpontját.
          Ezek jelennek meg a weboldalon és a fizetés utáni emailben.
        </p>

        <div className="bg-white rounded-2xl border border-brand-border p-6 space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-brand-text font-sans mb-2">
              <Video size={16} className="text-brand-purple" />
              Zoom link
            </label>
            <input
              type="url"
              value={settings.group_mentoring_zoom_url}
              onChange={e => setSettings(s => ({ ...s, group_mentoring_zoom_url: e.target.value }))}
              placeholder="https://zoom.us/j/..."
              className="w-full px-4 py-3 rounded-xl border border-brand-border font-sans text-sm focus:border-brand-purple focus:outline-none"
            />
            <p className="font-sans text-xs text-brand-muted mt-1">
              A résztvevők ezt a linket kapják a fizetés utáni emailben.
            </p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-brand-text font-sans mb-2">
              <Calendar size={16} className="text-brand-purple" />
              Következő alkalom időpontja
            </label>
            <input
              type="text"
              value={settings.group_mentoring_schedule}
              onChange={e => setSettings(s => ({ ...s, group_mentoring_schedule: e.target.value }))}
              placeholder="pl. 2026. június 24., kedd 18:00"
              className="w-full px-4 py-3 rounded-xl border border-brand-border font-sans text-sm focus:border-brand-purple focus:outline-none"
            />
            <p className="font-sans text-xs text-brand-muted mt-1">
              Ez jelenik meg a programok oldalon és az emailben is.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-brand-purple text-white font-sans text-sm font-semibold px-6 py-3 rounded-xl hover:bg-brand-purple/90 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Mentés
          </button>
          {message && (
            <p className={`font-sans text-sm ${message.type === 'ok' ? 'text-green-600' : 'text-red-600'}`}>
              {message.text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
