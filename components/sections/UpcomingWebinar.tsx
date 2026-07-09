import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import type { Webinar } from '@/types';

interface UpcomingWebinarProps {
  webinar: Webinar;
}

export function UpcomingWebinar({ webinar }: UpcomingWebinarProps) {
  const dateFormatted = new Date(webinar.date).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <SectionWrapper bg="purple" id="webinar">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-purple rounded-2xl flex items-center justify-center shrink-0">
            <Calendar size={24} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="coral">Közelgő webinár</Badge>
              {webinar.registrationOpen && (
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              )}
            </div>
            <h2 className="font-display text-xl font-bold text-brand-blue">
              {webinar.title}
            </h2>
            <div className="flex flex-wrap gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-sm text-brand-muted font-sans">
                <Calendar size={14} />
                {dateFormatted}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-brand-muted font-sans">
                <Clock size={14} />
                {webinar.time}
              </span>
              {webinar.maxParticipants > 0 && (
                <span className="flex items-center gap-1.5 text-sm text-brand-muted font-sans">
                  <Users size={14} />
                  Max. {webinar.maxParticipants} fő
                </span>
              )}
            </div>
          </div>
        </div>

        <Button href={`/programok#webinar-${webinar.id}`} size="md">
          Regisztrálok
          <ArrowRight size={16} />
        </Button>
      </div>
    </SectionWrapper>
  );
}
