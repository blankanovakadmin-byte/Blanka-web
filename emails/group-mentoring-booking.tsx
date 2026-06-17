import { Text } from '@react-email/components';
import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';

interface Props {
  email: string;
  name?: string;
  nextSessionDate?: string;
  zoomLink?: string;
}

export function GroupMentoringBookingEmail({ name, nextSessionDate, zoomLink }: Props) {
  const greeting = name ? `Szia, ${name}!` : 'Szia!';
  const zoom = zoomLink || process.env.NEXT_PUBLIC_GROUP_MENTORING_ZOOM_URL || '';
  const schedule = nextSessionDate || process.env.NEXT_PUBLIC_GROUP_MENTORING_SCHEDULE || '';

  return (
    <BaseEmail preview="🎉 Sikeres feliratkozás a kiscsoportos mentorprogramra!">
      {heading('🎉 Üdv a kiscsoportos mentorprogramban!')}
      {paragraph(greeting)}
      {paragraph('Örülök, hogy csatlakoztál! A kiscsoportos mentorprogramban havi 4 × 45 perces élő online alkalmon veszünk részt kis létszámú (3–5 fős) csoportban.')}
      {divider()}
      {schedule && (
        <Text style={{ backgroundColor: '#F3EAFC', borderRadius: '12px', padding: '16px', fontSize: '15px', color: '#173A7A', margin: '0 0 20px', lineHeight: '1.8' }}>
          📅 <strong>Következő alkalom:</strong> {schedule}
        </Text>
      )}
      {zoom && (
        <>
          {paragraph('Az alábbi linkkel tudsz csatlakozni az alkalmakhoz:')}
          {ctaButton('Csatlakozás Zoomon →', zoom)}
          <Text style={{ fontSize: '13px', color: '#7A7A8C', textAlign: 'center', margin: '0 0 16px', wordBreak: 'break-all' }}>
            {zoom}
          </Text>
        </>
      )}
      {divider()}
      {paragraph('Mentsd el ezt az emailt, hogy mindig kéznél legyen a Zoom link és az időpont. Minden hónapban küldök friss emlékeztetőt is.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Ha bármilyen kérdésed van, egyszerűen válaszolj erre az emailre.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Várlak a csoportban!', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 🤍', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default GroupMentoringBookingEmail;
