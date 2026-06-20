import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import type { Testimonial } from '@/types';

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export function Testimonials({ testimonials, followerCount = '32 000+' }: { testimonials: Testimonial[]; followerCount?: string }) {
  if (testimonials.length === 0) return null;

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

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <Card
            key={t.id}
            className={`animate-fade-in stagger-${(i % 3) + 1} relative`}
          >
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
    </SectionWrapper>
  );
}
