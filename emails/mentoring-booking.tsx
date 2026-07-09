import { Text } from '@react-email/components';
import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';

interface Props { email: string; name?: string }

const CAL_MENTORING_URL = process.env.NEXT_PUBLIC_CAL_MENTORING_URL || 'https://cal.com/blankanovak/privat-havi';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com';

export function MentoringBookingEmail({ email, name }: Props) {
  const greeting = name ? `Szia, ${name}!` : 'Szia!';
  const portalUrl = `${BASE_URL}/elofizetesem`;

  return (
    <BaseEmail preview="📅 Foglald le a havi két alkalmadat!">
      {heading('📅 Foglald le a havi két alkalmadat!')}
      {paragraph(greeting)}
      {paragraph('Örülök, hogy itt vagy. Ez egy olyan elköteleződés, ami valódi változást hozhat. Várom, hogy elkezdjük.')}
      {paragraph('Az előfizetésed aktív. Mostantól minden hónapban 2 × 75 perces alkalom vár rád. Foglald le az időpontjaidat az alábbi linkekkel:')}
      {divider()}
      <Text style={{ backgroundColor: '#F3EAFC', borderRadius: '12px', padding: '16px', fontSize: '14px', color: '#173A7A', margin: '0 0 20px', lineHeight: '2' }}>
        👉 <a href={CAL_MENTORING_URL} style={{ color: '#B06AD9', fontWeight: '600' }}>1. alkalom foglalása →</a><br />
        👉 <a href={CAL_MENTORING_URL} style={{ color: '#B06AD9', fontWeight: '600' }}>2. alkalom foglalása →</a>
      </Text>
      {ctaButton('Időpont foglalása →', CAL_MENTORING_URL)}
      {divider()}
      {paragraph('Ha bármilyen kérdésed van az időpontokkal kapcsolatban, vagy valami miatt nem találsz megfelelő időpontot, egyszerűen válaszolj erre az emailre.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Hamarosan találkozunk!', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 🤍', { color: '#7A7A8C', fontSize: '14px' })}
      {divider()}
      <Text style={{ fontSize: '12px', color: '#7A7A8C', margin: '0' }}>
        Előfizetésed bármikor lemondhatod vagy bankkártyaadataidat módosíthatod itt:{' '}
        <a href={portalUrl} style={{ color: '#B06AD9' }}>Előfizetésem kezelése</a>
      </Text>
    </BaseEmail>
  );
}

export default MentoringBookingEmail;
