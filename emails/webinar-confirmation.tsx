import { Text } from '@react-email/components';
import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';
import type { Webinar } from '@/types';

interface Props { email: string; firstName: string; webinar: Webinar }

export function WebinarConfirmationEmail({ email, firstName, webinar }: Props) {
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com';
  const dateFormatted = new Date(webinar.date).toLocaleDateString('hu-HU', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <BaseEmail preview={`Regisztrációd megerősítve: ${webinar.title}`}>
      {heading(`Regisztrált! 🎉`)}
      {paragraph(`${firstName ? `Szia ${firstName}!` : 'Szia!'} Sikeresen regisztráltál a következő webinárra:`)}
      <Text style={{ backgroundColor: '#F3EAFC', borderRadius: '12px', padding: '16px', fontSize: '15px', color: '#173A7A', fontWeight: '600', margin: '0 0 20px' }}>
        📅 {webinar.title}<br/>
        🗓 {dateFormatted} — {webinar.time}<br/>
        👥 Max. {webinar.maxParticipants} fő
      </Text>
      {paragraph('Kérlek, mentsd el a dátumot és tartsd szabadon a naptáradat!')}
      {paragraph('Az esemény előtt 24 órával és 1 órával is küldjük a Zoom linket a visszaigazoló emailben.')}
      {divider()}
      {webinar.zoomLink && ctaButton('Zoom link mentése →', webinar.zoomLink)}
      {paragraph('Várlak a webináron! Ha kérdésed van, válaszolj erre az emailre.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 💜', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default WebinarConfirmationEmail;
