'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import type { Testimonial } from '@/types';

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export function Testimonials({ testimonials, followerCount = '32 000+' }: { testimonials: Testimonial[]; followerCount?: string }) {
  if (testimonials.length === 0) return null;

  const [page, setPage] = useState(0);
  const [fade, setFade] = useState(true);

  const perPage = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;
  const totalPages = Math.ceil(testimonials.length / perPage);

  const goTo = useCallback((p: number) => {
    setFade(false);
    setTimeout(() => {
      setPage(p);
      setFade(true);
    }, 300);
  }, []);

  useEffect(() => {
    if (totalPages <= 1) return;
    const timer = setInterval(() => {
      goTo((page + 1) % totalPages);
    }, 6000);
    return () => clearInterval(timer);
  }, [page, totalPages, goTo]);

  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  return (
    <SectionWrapper bg="surface" id="velemenyek">
      <div className="text-center mb-12 animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-4">
          {[1,2,3,4,5].map(i => (
            <Star key={i} size={20} fill="#B06AD9" className="text-brand-purple" />
          ))}
          <span className="font-sans font-semibold text-brand-blue ml-2">4.9/5</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-blue mb-4">
          Mit mondanak a tanulóim?
        </h2>
        <p className="font-sans text-brand-muted">
          <span className="font-bold text-brand-purple">{followerCount}</span> organikus követő,{' '}
          <span className="font-bold text-brand-purple">500+</span> elégedett tanuló
        </p>
      </div>

      <div
        className="grid md:grid-cols-3 gap-6 transition-opacity duration-300"
        style={{ opacity: fade ? 1 : 0 }}
      >
        {visible.map((t) => (
          <Card key={t.id} className="relative">
            <Quote
              size={32}
              className="text-brand-purple/20 absolute top-4 right-4"
              fill="currentColor"
            />
            <div className="flex items-center gap-1 mb-4">
              {[...Array(t.stars)].map((_, j) => (
                <Star key={j} size={14} fill="#B06AD9" className="text-brand-purple" />
              ))}
            </div>
            <p className="font-sans text-brand-text leading-relaxed mb-6 text-sm">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-purple rounded-full flex items-center justify-center text-white font-display font-bold text-sm shrink-0">
                {initials(t.name)}
              </div>
              <div>
                <p className="font-sans font-semibold text-brand-blue text-sm">{t.name}</p>
                <p className="font-sans text-xs text-brand-muted">{t.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === page ? 'bg-brand-purple scale-125' : 'bg-brand-border hover:bg-brand-purple/40'
              }`}
              aria-label={`Vélemények ${i + 1}. oldal`}
            />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
