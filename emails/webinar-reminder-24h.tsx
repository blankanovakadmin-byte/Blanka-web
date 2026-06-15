import { Text } from '@react-email/components';
import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';
import type { Webinar } from '@/types';

interface Props { email: string; firstName?: string; webinar: Webinar }

export function WebinarReminder24hEmail({ email, firstName, webinar }: Props) {
  const dateFormatted = new Date(webinar.date).toLocaleDateString('hu-HU', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const greeting = firstName ? `Szia, ${firstName}!` : 'Szia!';

  return (
    <BaseEmail preview="⏰ Holnap van! Már csak 24 óra a webinárig">
      {heading('⏰ Holnap van! Már csak 24 óra a webinárig')}
      {paragraph(greeting)}
      {paragraph('Csak egy gyors emlékeztető, hogy holnap van a webinárunk! Örülök, hogy ott leszel, izgatott vagyok, hogy megmutathatom neked, amivel készültem.')}
      {divider()}
      <Text style={{ fontSize: '14px', fontWeight: '700', color: '#173A7A', margin: '0 0 8px' }}>
        📌 Emlékeztető
      </Text>
      <Text style={{ backgroundColor: '#F3EAFC', borderRadius: '12px', padding: '16px', fontSize: '14px', color: '#173A7A', margin: '0 0 20px', lineHeight: '1.8' }}>
        <strong>Mikor:</strong> {dateFormatted}, {webinar.time}<br />
        {webinar.zoomLink && <><strong>Zoom link:</strong> <a href={webinar.zoomLink} style={{ color: '#B06AD9' }}>{webinar.zoomLink}</a></>}
      </Text>
      {webinar.zoomLink && ctaButton('Csatlakozás a Zoom linkkel →', webinar.zoomLink)}
      {divider()}
      {paragraph('Egy kis felkészülési tipp tőlem: ne nyiss meg 27 tabot egyszerre — csak ezt az egy linket, egy pohár teát vagy kávét, és légy jelen. A legtöbbet akkor hozod ki magadból, ha valóban ott vagy, nem csak „félfüllel" hallgatod. 😊', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Ha bármilyen kérdésed van előzetesen, csak válaszolj, olvasom.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Holnap találkozunk!', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 🤍', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default WebinarReminder24hEmail;
