import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';

interface Props { email: string; name?: string }

const CAL_MENTORING_URL = process.env.NEXT_PUBLIC_CAL_MENTORING_URL || 'https://cal.com/novakblanka/privat';

export function MentoringBookingEmail({ email, name }: Props) {
  const greeting = name ? `Szia ${name}!` : 'Szia!';

  return (
    <BaseEmail preview="Foglald le a havi két alkalmadat! 📅">
      {heading('Köszönjük a feliratkozást! 🎉')}
      {paragraph(`${greeting} Az előfizetésed aktív — mostantól minden hónapban 2 × 75 perces mentoralkalom vár rád.`)}
      {paragraph('Foglald le a két időpontodat az alábbi linkre kattintva:')}
      {ctaButton('1. alkalom foglalása →', CAL_MENTORING_URL)}
      {ctaButton('2. alkalom foglalása →', CAL_MENTORING_URL)}
      {divider()}
      {paragraph('Ha kérdésed van az időpontokkal kapcsolatban, írj nekem erre az emailre.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Várlak hamarosan!', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 💜', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default MentoringBookingEmail;
