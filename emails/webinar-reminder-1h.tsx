import { Text } from '@react-email/components';
import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';
import type { Webinar } from '@/types';

interface Props { email: string; firstName?: string; webinar: Webinar }

export function WebinarReminder1hEmail({ email, firstName, webinar }: Props) {
  const dateFormatted = new Date(webinar.date).toLocaleDateString('hu-HU', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const greeting = firstName ? `Szia, ${firstName}!` : 'Szia!';

  return (
    <BaseEmail preview="🔴 1 óra múlva élőben! Kattints a linkre!">
      {heading('🔴 1 óra múlva élőben! Kattints a linkre!')}
      {paragraph(greeting)}
      {paragraph('Ez az a pont, ahol mindenki keres mindent, szóval itt van az a link, amire szükséged van. Semmi más dolgod nincs, csak erre a linkre kattintani.')}
      {divider()}
      <Text style={{ fontSize: '14px', fontWeight: '700', color: '#173A7A', margin: '0 0 8px' }}>
        🔗 Belépő link
      </Text>
      <Text style={{ backgroundColor: '#F3EAFC', borderRadius: '12px', padding: '16px', fontSize: '14px', color: '#173A7A', margin: '0 0 20px', lineHeight: '1.8' }}>
        {webinar.title} · {dateFormatted} · {webinar.time} · Zoom<br />
        {webinar.zoomLink && <>👉 <a href={webinar.zoomLink} style={{ color: '#B06AD9' }}>{webinar.zoomLink}</a></>}
      </Text>
      {webinar.zoomLink && ctaButton('Csatlakozás most →', webinar.zoomLink)}
      {divider()}
      {paragraph('Készülj fel egy kis teával, csendes környezettel, és egy notesszel ha van.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Nagyon örülök, hogy ott leszel.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Hamarosan találkozunk,', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 🤍', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default WebinarReminder1hEmail;
