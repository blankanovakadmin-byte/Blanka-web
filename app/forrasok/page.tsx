'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/sections/Footer';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Download, ShoppingCart, Check, Lock, Mail } from 'lucide-react';
import Image from 'next/image';

const categories = ['Összes', 'Ingyenes', 'Premium', 'Tanulási stratégia', 'Szókincs'];

const resources = [
  {
    id: 'free-vocab',
    title: '500 legfontosabb angol szó',
    description: 'A leggyakoribb 500 angol szó és használatuk — ideális kezdőknek és haladóknak egyaránt.',
    category: 'Ingyenes',
    type: 'free' as const,
    tags: ['Szókincs', 'PDF'],
    emoji: '/images/icon_konyv.png',
  },
  {
    id: 'free-strategy',
    title: 'Tanulási stratégia útmutató',
    description: 'Hogyan tanuljunk hatékonyan? 7 bevált módszer a gyorsabb nyelvtanuláshoz.',
    category: 'Ingyenes',
    type: 'free' as const,
    tags: ['Tanulási stratégia', 'PDF'],
    emoji: '/images/icon_agy.png',
  },
  {
    id: 'premium-interview',
    title: 'Állásinterjú angolul csomag',
    description: '50 leggyakoribb állásinterjú kérdés és minta válasz — azonnali letöltés.',
    category: 'Premium',
    type: 'premium' as const,
    price: 4990,
    tags: ['Premium', 'PDF'],
    emoji: '/images/icon_koffer.png',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_INTERVIEW_PRICE_ID,
  },
  {
    id: 'premium-phrases',
    title: 'Mindennapi angol kifejezések',
    description: '200 hasznos angol fordulat, amit a natív anyanyelvűek valóban használnak.',
    category: 'Premium',
    type: 'premium' as const,
    price: 3490,
    tags: ['Premium', 'Szókincs', 'PDF'],
    emoji: '/images/icon_chat.png',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PHRASES_PRICE_ID,
  },
];

type ResourceType = typeof resources[0];

function FreeClaimForm({ productId }: { productId: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/freebies/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, productId }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-600 text-sm font-sans">
        <Check size={16} /> Elküldtük az emailt! Ellenőrizd a postaládádat.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
      <Input
        type="email"
        placeholder="email@cimed.hu"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        error={status === 'error' ? 'Hiba történt, próbáld újra.' : ''}
        className="flex-1 text-sm py-2"
      />
      <Button type="submit" size="sm" loading={status === 'loading'}>
        <Mail size={14} /> Kérem
      </Button>
    </form>
  );
}

function ResourceCard({ resource }: { resource: ResourceType }) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 flex items-center justify-center">
          <Image src={resource.emoji} alt={resource.title} width={48} height={48} className="w-12 h-12 object-contain" />
        </div>
        <Badge variant={resource.type === 'free' ? 'green' : 'blue'}>
          {resource.type === 'free' ? 'Ingyenes' : `${resource.price?.toLocaleString('hu-HU')} Ft`}
        </Badge>
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="font-display text-lg font-bold text-brand-blue mb-1">{resource.title}</h3>
        <p className="font-sans text-sm text-brand-muted leading-relaxed line-clamp-2">{resource.description}</p>
        <div className="flex flex-wrap gap-1 mt-3 mt-auto pt-3">
          {resource.tags.map(t => (
            <span key={t} className="font-sans text-xs text-brand-muted bg-brand-border px-2 py-0.5 rounded-full">{t}</span>
          ))}
        </div>
      </div>

      {resource.type === 'free' ? (
        <FreeClaimForm productId={resource.id} />
      ) : (
        <Button
          href={`/api/checkout?priceId=${resource.stripePriceId}&type=digital`}
          size="sm"
          className="w-full justify-center"
        >
          <ShoppingCart size={14} />
          Megveszem — {resource.price?.toLocaleString('hu-HU')} Ft
          <Lock size={12} className="opacity-60" />
        </Button>
      )}
    </Card>
  );
}

export default function ForrasokPage() {
  const [activeCategory, setActiveCategory] = useState('Összes');

  const filtered = resources.filter(r =>
    activeCategory === 'Összes' ||
    r.category === activeCategory ||
    r.tags.includes(activeCategory)
  );

  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0 pt-20">
        {/* Hero */}
        <SectionWrapper bg="default">
          <div className="text-center max-w-2xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Download size={24} className="text-brand-purple" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-blue mb-4">
              Tanulási <span className="text-brand-purple italic">forrásaim</span>
            </h1>
            <p className="font-sans text-brand-muted text-lg">
              Ingyenes és fizetős anyagok, amelyek felgyorsítják a nyelvtanulási utadat.
            </p>
          </div>
        </SectionWrapper>

        {/* Category filter */}
        <SectionWrapper bg="surface">
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={[
                  'px-4 py-2 rounded-full font-sans text-sm font-medium transition-all',
                  activeCategory === cat
                    ? 'bg-brand-purple text-white shadow-md'
                    : 'bg-white text-brand-muted border border-brand-border hover:border-brand-purple hover:text-brand-purple',
                ].join(' ')}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-center font-sans text-brand-muted py-12">Nincs találat ebben a kategóriában.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((r, i) => (
                <div key={r.id} className={`animate-fade-in stagger-${(i % 4) + 1}`}>
                  <ResourceCard resource={r} />
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
