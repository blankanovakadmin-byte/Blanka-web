'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/sections/Footer';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { InstagramIcon, YoutubeIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import { Mail, Check, Send, Calendar } from 'lucide-react';

const socialLinks = [
  { href: 'https://instagram.com/blankanovak_', icon: InstagramIcon, label: 'Instagram', handle: '@blankanovak_' },
  { href: 'https://youtube.com/@novakblanka',  icon: YoutubeIcon,   label: 'YouTube',   handle: '@novakblanka' },
  { href: 'https://www.linkedin.com/in/blanka-nov%C3%A1k/', icon: LinkedinIcon, label: 'LinkedIn',  handle: 'Novák Blanka' },
];

export default function KapcsolatPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletter, setNewsletter] = useState('');
  const [nlStatus, setNlStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleContact(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    setNlStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletter, source: 'kapcsolat' }),
      });
      if (!res.ok) throw new Error();
      setNlStatus('success');
    } catch {
      setNlStatus('error');
    }
  }

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0 pt-20">
        <SectionWrapper bg="default">
          <div className="text-center max-w-xl mx-auto mb-12 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-blue mb-4">
              Írj <span className="text-brand-purple italic">nekem</span>!
            </h1>
            <p className="font-sans text-brand-muted text-lg">
              Kérdésed van? Érdeklődsz egy programról? Szívesen válaszolok!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Contact form */}
            <Card className="animate-fade-in">
              <h2 className="font-display text-xl font-bold text-brand-blue mb-6">Kapcsolatfelvétel</h2>

              {status === 'success' ? (
                <div className="flex items-center gap-2 text-green-600 font-sans font-medium bg-green-50 rounded-xl p-4">
                  <Check size={20} /> Köszönöm! Hamarosan visszaírok.
                </div>
              ) : (
                <form onSubmit={handleContact} className="space-y-4">
                  <Input
                    label="Neved"
                    placeholder="Kovács Anna"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
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
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-brand-text font-sans">Üzeneted</label>
                    <textarea
                      rows={4}
                      placeholder="Sziasztok! Kérdésem lenne a privát mentorprogrammal kapcsolatban..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white font-sans text-brand-text placeholder:text-brand-muted focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20 resize-none"
                    />
                  </div>
                  {status === 'error' && (
                    <p className="text-brand-coral font-sans text-sm">Hiba történt. Próbáld újra!</p>
                  )}
                  <Button type="submit" loading={status === 'loading'} className="w-full justify-center">
                    <Send size={16} /> Küldés
                  </Button>
                </form>
              )}
            </Card>

            {/* Right column */}
            <div className="space-y-6 animate-fade-in stagger-2">
              {/* Cal.com booking */}
              <Card className="bg-brand-purple-light border-brand-purple/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center shrink-0">
                    <Calendar size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-brand-blue mb-1">
                      Foglalj időpontot
                    </h3>
                    <p className="font-sans text-sm text-brand-muted mb-3">
                      Ingyenes 30 perces bevezető konzultáció — nézzük meg együtt, mi illik hozzád.
                    </p>
                    <Button href="https://cal.com/novakblanka" external size="sm">
                      Időpontfoglalás
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Email */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-purple-light rounded-xl flex items-center justify-center">
                    <Mail size={20} className="text-brand-purple" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-brand-blue text-sm">Email</p>
                    <a href="mailto:hello@novakblanka.hu" className="font-sans text-sm text-brand-muted hover:text-brand-purple transition-colors">
                      hello@novakblanka.hu
                    </a>
                  </div>
                </div>

                <h3 className="font-sans font-semibold text-brand-blue text-sm mb-3">Kövess a közösségi médiában</h3>
                <div className="flex flex-col gap-2">
                  {socialLinks.map(({ href, icon: Icon, label, handle }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-brand-purple-light transition-colors group"
                    >
                      <Icon size={18} className="text-brand-muted group-hover:text-brand-purple transition-colors" />
                      <span className="font-sans text-sm text-brand-muted group-hover:text-brand-purple transition-colors">
                        {label} · {handle}
                      </span>
                    </a>
                  ))}
                </div>
              </Card>

              {/* Newsletter */}
              <Card>
                <h3 className="font-display text-lg font-bold text-brand-blue mb-2">
                  Hírlevél
                </h3>
                <p className="font-sans text-sm text-brand-muted mb-4">
                  Heti tippek és ingyenes anyagok egyenesen a postaládádba.
                </p>
                {nlStatus === 'success' ? (
                  <div className="flex items-center gap-2 text-green-600 text-sm font-sans">
                    <Check size={16} /> Feliratkoztál!
                  </div>
                ) : (
                  <form onSubmit={handleNewsletter} className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="email@cimed.hu"
                      value={newsletter}
                      onChange={e => setNewsletter(e.target.value)}
                      required
                      className="flex-1"
                      error={nlStatus === 'error' ? 'Hiba!' : ''}
                    />
                    <Button type="submit" size="sm" loading={nlStatus === 'loading'}>
                      OK
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
