import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import Link from 'next/link';

const SPRITE = '/icons/Gemini_Generated_Image_bhlxbnbhlxbnbhlx.png';

const FLAGS = [
  { src: '/images/flag_en.png', alt: 'EN' },
  { src: '/images/flag_it.png', alt: 'IT' },
  { src: '/images/flag_es.png', alt: 'ES' },
  { src: '/images/flag_cn.png', alt: 'CN' },
];

function FlagRow() {
  return (
    <div className="flex items-center gap-1.5 mt-0.5">
      {FLAGS.map(f => (
        <Image key={f.alt} src={f.src} alt={f.alt} width={22} height={22} className="w-[22px] h-[22px]" />
      ))}
    </div>
  );
}

const services = [
  {
    spritePos: '100% 0%',
    badge: 'Kiscsoportos',
    title: 'Havi Mentorprogram',
    subtitle: <FlagRow />,
    description: 'Nyelvtanulás, tervezés, támogatás és közösség kis létszámú csoportban.',
    href: '/programok#kiscsoportos',
    badgeVariant: 'blue' as const,
  },
  {
    spritePos: '0% 100%',
    badge: 'Privát',
    title: 'Havi Mentorprogram',
    subtitle: <FlagRow />,
    description: 'Személyre szabott mentorálás és nyelvtanulás teljes figyelemmel rád szabva.',
    href: '/programok#privat',
    badgeVariant: 'blue' as const,
    popular: true,
  },
  {
    spritePos: '0% 0%',
    badge: 'Magabiztosan Angolul',
    title: 'Kurzus Május',
    subtitle: null,
    description: 'Fejleszd az önbizalmad angolul, és szólalj meg magabiztosan minden helyzetben.',
    href: '/programok#kurzus',
    badgeVariant: 'blue' as const,
  },
  {
    spritePos: '100% 100%',
    badge: 'Stratégia Neked',
    title: 'Nyelvtanulási Tanácsadás',
    subtitle: null,
    description: 'Egyéni stratégia a hatékonyabb tanulásért és gyorsabb nyelvtudásért.',
    href: '/programok#strategia',
    badgeVariant: 'blue' as const,
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
        {services.map((service, i) => (
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
                <div
                  className="w-16 h-16 rounded-full shrink-0"
                  style={{
                    backgroundImage: `url('${SPRITE}')`,
                    backgroundSize: '200% 200%',
                    backgroundPosition: service.spritePos,
                  }}
                />

                <div>
                  <Badge variant={service.badgeVariant} className="mb-2">{service.badge}</Badge>
                  <h3 className="font-display text-lg font-bold text-brand-blue mt-1">{service.title}</h3>
                  {service.subtitle}
                </div>

                <p className="font-sans text-sm text-brand-muted leading-relaxed flex-1">{service.description}</p>

                <div className="flex items-center gap-1 text-brand-purple font-sans text-sm font-medium group-hover:gap-2 transition-all">
                  Részletek
                  <ChevronRight size={14} />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
