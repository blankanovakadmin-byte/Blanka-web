import { Text } from '@react-email/components';
import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';

interface Props { email: string; productTitle: string; downloadUrl: string }

export function FreebieDeliveryEmail({ email, productTitle, downloadUrl }: Props) {
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com';

  return (
    <BaseEmail preview={`A te ingyenes anyagod: ${productTitle}`}>
      {heading('Íme az anyagod! 📚')}
      {paragraph(`Szia! Köszönöm, hogy letöltötted a "${productTitle}" anyagot. Az alább gombra kattintva érheted el:`)}
      <Text style={{ backgroundColor: '#F3EAFC', borderRadius: '12px', padding: '16px', fontSize: '14px', color: '#4A1C6F', margin: '0 0 20px' }}>
        ⏰ A link 72 óráig érvényes — mentsd el a fájlt!
      </Text>
      {ctaButton('Letöltés →', downloadUrl)}
      {divider()}
      {paragraph('Hasznos volt? Nézd meg a többi ingyenes anyagomat is!')}
      {ctaButton('Több ingyenes anyag →', `${BASE}/forrasok`)}
      {paragraph('Blanka 💜', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default FreebieDeliveryEmail;
