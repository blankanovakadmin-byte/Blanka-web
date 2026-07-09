import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';

interface Props { email: string; name?: string }

export function PaymentFailedEmail({ email, name }: Props) {
  const greeting = name ? `Szia, ${name}!` : 'Szia!';

  return (
    <BaseEmail preview="⚠️ Sikertelen fizetés – kérlek, frissítsd az adataidat">
      {heading('⚠️ Sikertelen fizetés')}
      {paragraph(greeting)}
      {paragraph('Az előfizetésed havi díjának levonása sajnos nem sikerült. Ez általában a kártya lejárata vagy elégtelen egyenleg miatt történik.')}
      {paragraph('Kérlek, frissítsd a fizetési adataidat, hogy az előfizetésed aktív maradhasson:')}
      {ctaButton('Fizetési adatok frissítése →', `${process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com'}/programok`)}
      {divider()}
      {paragraph('Ha kérdésed van, egyszerűen válaszolj erre az emailre.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 🤍', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default PaymentFailedEmail;
