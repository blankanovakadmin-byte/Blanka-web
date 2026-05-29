import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Users, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getAllWebinars } from '@/lib/airtable';

export const metadata: Metadata = { title: 'Webinárok | Admin' };

export default async function AdminWebinarokPage() {
  let webinars: Awaited<ReturnType<typeof getAllWebinars>> = [];
  let error = '';

  try {
    webinars = await getAllWebinars();
  } catch {
    error = 'Airtable nem konfigurált. Állítsd be az AIRTABLE_API_KEY és AIRTABLE_BASE_ID env változókat.';
  }

  return (
    <div className="min-h-screen bg-brand-bg p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin" className="text-brand-muted hover:text-brand-purple">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-display text-xl font-bold text-brand-blue">Webinárok (Airtable)</h1>
            <p className="font-sans text-xs text-brand-muted mt-0.5">
              Szerkesztés az Airtable-ben történik, itt csak előnézet látható.
            </p>
          </div>
        </div>

        {error ? (
          <Card className="bg-red-50 border-red-200">
            <p className="font-sans text-sm text-red-700">{error}</p>
          </Card>
        ) : webinars.length === 0 ? (
          <Card className="text-center py-12">
            <p className="font-sans text-brand-muted">Nincs webinár az Airtable-ben.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {webinars.map(w => {
              const dateFormatted = new Date(w.date).toLocaleDateString('hu-HU', {
                year: 'numeric', month: 'long', day: 'numeric',
              });
              const isUpcoming = new Date(w.date) >= new Date();
              return (
                <Card key={w.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-sans font-semibold text-brand-blue">{w.title}</h3>
                        <Badge variant={isUpcoming ? 'teal' : 'muted'}>
                          {isUpcoming ? 'Közelgő' : 'Lejárt'}
                        </Badge>
                        {w.registrationOpen ? (
                          <span className="flex items-center gap-1 text-green-600 text-xs font-sans">
                            <CheckCircle size={12} /> Nyitott
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-brand-muted text-xs font-sans">
                            <XCircle size={12} /> Zárva
                          </span>
                        )}
                      </div>
                      {w.description && (
                        <p className="font-sans text-sm text-brand-muted mb-2 line-clamp-2">{w.description}</p>
                      )}
                      <div className="flex flex-wrap gap-4">
                        <span className="flex items-center gap-1.5 text-xs text-brand-muted font-sans">
                          <Calendar size={12} /> {dateFormatted}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-brand-muted font-sans">
                          <Clock size={12} /> {w.time}
                        </span>
                        {w.maxParticipants > 0 && (
                          <span className="flex items-center gap-1.5 text-xs text-brand-muted font-sans">
                            <Users size={12} /> {w.maxParticipants} fő
                          </span>
                        )}
                      </div>
                    </div>
                    {w.zoomLink && (
                      <a
                        href={w.zoomLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-xs text-brand-purple hover:underline shrink-0"
                      >
                        Zoom link →
                      </a>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
