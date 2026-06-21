import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';
import { unsubscribeUrl } from '@/lib/unsubscribe';

interface Props { email: string; name?: string; program?: string }

export function WaitlistConfirmationEmail({ email, name, program }: Props) {
  const unsub = unsubscribeUrl(email);
  const greeting = name ? `Szia, ${name}!` : 'Szia!';
  const programName = program || 'Kiscsoportos Mentorprogram';

  return (
    <BaseEmail preview={`✨ Felkerültél a(z) ${programName} várólistájára!`} unsubscribeUrl={unsub}>
      {heading(`✨ Felkerültél a várólistára!`)}
      {paragraph(greeting)}
      {paragraph(`Köszönöm az érdeklődésedet a(z) ${programName} iránt! Sikeresen felkerültél a várólistára.`)}
      {paragraph('Amint elindul a következő csoport, az elsők között foglak értesíteni emailben, hogy biztosan legyen helyed.')}
      {divider()}
      {paragraph('📋 Segíts, hogy még jobban megismerjelek! Töltsd ki ezt a rövid kérdőívet:')}
      {ctaButton('Kérdőív kitöltése →', `${process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com'}/kerdoiv?email=${encodeURIComponent(email)}`)}
      {divider()}
      {paragraph('Ha bármilyen kérdésed van addig is, egyszerűen válaszolj erre az emailre.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 🤍', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default WaitlistConfirmationEmail;
