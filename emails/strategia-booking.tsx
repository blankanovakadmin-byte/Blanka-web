import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';

interface Props { email: string; name?: string }

const CAL_STRATEGY_URL = process.env.NEXT_PUBLIC_CAL_STRATEGY_URL || 'https://cal.com/blankanovak/strategia';

export function StrategiaBookingEmail({ name }: Props) {
  const greeting = name ? `Szia, ${name}!` : 'Szia!';

  return (
    <BaseEmail preview="📅 Foglald le a stratégia konzultációdat!">
      {heading('📅 Foglald le a konzultációdat!')}
      {paragraph(greeting)}
      {paragraph('Köszönöm, hogy megbíztál! A fizetés megérkezett, mostantól már csak az időpontot kell lefoglalnod.')}
      {paragraph('Az alábbi gombra kattintva kiválaszthatod a számodra legmegfelelőbb 45 perces időpontot:')}
      {divider()}
      {ctaButton('Időpont foglalása →', CAL_STRATEGY_URL)}
      {divider()}
      {paragraph('Ha bármilyen kérdésed van az időponttal kapcsolatban, vagy nem találsz megfelelő lehetőséget, egyszerűen válaszolj erre az emailre és megoldjuk.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Várom a találkozót!', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 🤍', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default StrategiaBookingEmail;
