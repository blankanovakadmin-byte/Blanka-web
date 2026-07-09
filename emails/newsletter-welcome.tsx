import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';
import { unsubscribeUrl } from '@/lib/unsubscribe';

interface Props { email: string; firstName?: string }

export function NewsletterWelcomeEmail({ email, firstName }: Props) {
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com';
  const unsub = unsubscribeUrl(email);
  const greeting = firstName ? `Szia, ${firstName}!` : 'Szia!';

  return (
    <BaseEmail preview="🌿 Üdvözöllek! Örülök, hogy itt vagy" unsubscribeUrl={unsub}>
      {heading('🌿 Üdvözöllek! Örülök, hogy itt vagy')}
      {paragraph(greeting)}
      {paragraph('Sikeresen feliratkoztál a hírlevelemre, örülök, hogy itt vagy!')}
      {paragraph('Igyekszem olyan dolgokat küldeni, amik valóban hasznosak neked, nem csak helyet foglalnak az inboxodban. Gondolatok, tippek, anyagok, és ha lesz valami program vagy webinár, arról is az elsők között fogsz értesülni.')}
      {paragraph('Ha valami megmozgat, amit küldök, válaszolhatsz rá, olvasom az üzeneteket, és szeretek visszaírni.')}
      {divider()}
      {paragraph('Addig is nézz körbe, ha van kedved:')}
      {ctaButton('blankanovak.com →', BASE)}
      {divider()}
      {paragraph('Hamarosan jelentkezem,', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 🤍', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default NewsletterWelcomeEmail;
