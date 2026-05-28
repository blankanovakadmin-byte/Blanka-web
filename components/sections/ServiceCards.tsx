import { ChevronRight } from 'lucide-react';
import { TargetIcon, GlobeGroupIcon, StarIcon, ClockIcon } from '@/components/ui/ServiceIcons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import Link from 'next/link';

const services = [
  {
    Icon: GlobeGroupIcon,
    badge: 'Kiscsoportos',
    title: 'Havi Mentorprogram',
    subtitle: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 🇮🇹 🇪🇸 🇨🇳',
    description: 'Nyelvtanulás, tervezés, támogatás és közösség kis létszámú csoportban.',
    href: '/programok#kiscsoportos',
    badgeVariant: 'blue' as const,
  },
  {
    Icon: StarIcon,
    badge: 'Privát',
    title: 'Havi Mentorprogram',
    subtitle: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 🇮🇹 🇪🇸 🇨🇳',
    description: 'Személyre szabott mentorálás és nyelvtanulás teljes figyelemmel rád szabva.',
    href: '/programok#privat',
    badgeVariant: 'purple' as const,
    popular: true,
  },
  {
    Icon: TargetIcon,
    badge: 'Magabiztosan Angolul',
    title: 'Kurzus Május',
    subtitle: '🎯',
    description: 'Fejleszd az önbizalmad angolul, és szólalj meg magabiztosan minden helyzetben.',
    href: '/programok#kurzus',
    badgeVariant: 'coral' as const,
  },
  {
    Icon: ClockIcon,
    badge: 'Stratégia Neked',
    title: 'Nyelvtanulási Tanácsadás',
    subtitle: '✅',
    description: 'Egyéni stratégia a hatékonyabb tanulásért és gyorsabb nyelvtudásért.',
    href: '/programok#strategia',
    badgeVariant: 'teal' as const,
  },
];

export function ServiceCards() {
  return (
    <SectionWrapper bg="default" id="szolgaltatasok">
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-blue mb-4">
          Válassz programot
        </h2>
        <p className="font-sans text-brand-muted text-lg max-w-xl mx-auto">
          Minden tanulónak más stílus illik — találd meg a tiedet.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service, i) => {
          const { Icon } = service;
          return (
            <Link key={service.badge} href={service.href} className="group">
              <Card
                hover
                className={[
                  'h-full relative animate-fade-in',
                  `stagger-${i + 1}`,
                  service.popular ? 'border-brand-purple ring-2 ring-brand-purple/20' : '',
                ].join(' ')}
              >
                {service.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-purple text-white text-xs font-semibold px-3 py-1 rounded-full font-sans">
                    Népszerű
                  </span>
                )}

                <div className="flex flex-col gap-4">
                  <Icon size={64} />

                  <div>
                    <Badge variant={service.badgeVariant} className="mb-2">
                      {service.badge}
                    </Badge>
                    <h3 className="font-display text-lg font-bold text-brand-blue mt-1">
                      {service.title}
                    </h3>
                    <p className="text-base mt-0.5">{service.subtitle}</p>
                  </div>

                  <p className="font-sans text-sm text-brand-muted leading-relaxed flex-1">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-1 text-brand-purple font-sans text-sm font-medium group-hover:gap-2 transition-all">
                    Részletek
                    <ChevronRight size={14} />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
