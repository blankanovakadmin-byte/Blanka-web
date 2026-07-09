'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, RefreshCw, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface BlobFile { url: string; pathname: string; size: number }

export default function AdminLetoltesekPage() {
  const [files, setFiles] = useState<BlobFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatedUrls, setGeneratedUrls] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState('');

  useEffect(() => { fetchFiles(); }, []);

  async function fetchFiles() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blob-files');
      if (res.ok) setFiles(await res.json());
    } finally {
      setLoading(false);
    }
  }

  async function generateUrl(blobUrl: string) {
    const res = await fetch('/api/admin/signed-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blobUrl }),
    });
    if (res.ok) {
      const { signedUrl } = await res.json();
      setGeneratedUrls(prev => ({ ...prev, [blobUrl]: signedUrl }));
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(''), 2000);
  }

  return (
    <div className="min-h-screen bg-brand-bg p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-brand-muted hover:text-brand-purple">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="font-display text-xl font-bold text-brand-blue">Signed URL generálás</h1>
              <p className="font-sans text-xs text-brand-muted mt-0.5">72 órás letöltési link generálása Vercel Blob fájlokhoz</p>
            </div>
          </div>
          <button onClick={fetchFiles} className="p-2 rounded-lg text-brand-muted hover:text-brand-purple hover:bg-brand-purple-light transition-colors">
            <RefreshCw size={18} />
          </button>
        </div>

        {loading ? (
          <p className="font-sans text-brand-muted text-center py-12">Betöltés...</p>
        ) : files.length === 0 ? (
          <Card className="text-center py-12">
            <p className="font-sans text-brand-muted">Nincs feltöltött fájl a Vercel Blob-ban.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {files.map(f => (
              <Card key={f.url}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-medium text-brand-blue truncate">{f.pathname}</p>
                    <p className="font-sans text-xs text-brand-muted">{(f.size / 1024).toFixed(1)} KB</p>
                    {generatedUrls[f.url] && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="flex items-center gap-1 text-xs text-brand-muted font-sans">
                          <Clock size={10} /> 72h
                        </span>
                        <input
                          readOnly
                          value={generatedUrls[f.url]}
                          className="flex-1 text-xs border border-brand-border rounded-lg px-3 py-1.5 font-mono bg-white"
                          onClick={e => (e.target as HTMLInputElement).select()}
                        />
                        <button
                          onClick={() => copyUrl(generatedUrls[f.url])}
                          className="p-1.5 rounded-lg hover:bg-brand-purple-light text-brand-muted hover:text-brand-purple transition-colors"
                        >
                          {copied === generatedUrls[f.url] ? '✓' : <Copy size={14} />}
                        </button>
                      </div>
                    )}
                  </div>
                  <Button onClick={() => generateUrl(f.url)} size="sm" variant={generatedUrls[f.url] ? 'secondary' : 'primary'}>
                    {generatedUrls[f.url] ? 'Újra' : 'Link generálás'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
