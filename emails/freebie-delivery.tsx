import { Text } from '@react-email/components';
import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';

interface Props { email: string; productTitle: string; downloadUrl: string }

export function FreebieDeliveryEmail({ email, productTitle, downloadUrl }: Props) {
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com';

  return (
    <BaseEmail preview="🎁 A te ingyenes anyagod - itt a link!">
      {heading('🎁 A te ingyenes anyagod - itt a link!')}
      {paragraph('Szia!')}
      {paragraph('Örülök, hogy megtaláltad ezt az anyagot, és hogy kíváncsi vagy rá. Ez a fajta kíváncsiság az, ami valóban előre visz. Szóval ezzel már jó úton jársz. 😊')}
      {divider()}
      <Text style={{ fontSize: '14px', fontWeight: '700', color: '#173A7A', margin: '0 0 8px' }}>
        🎁 Az ingyenes anyagod
      </Text>
      <Text style={{ backgroundColor: '#F3EAFC', borderRadius: '12px', padding: '16px', fontSize: '14px', color: '#173A7A', margin: '0 0 20px', lineHeight: '1.8' }}>
        {productTitle}<br />
        👉 <a href={downloadUrl} style={{ color: '#B06AD9' }}>{downloadUrl}</a>
      </Text>
      {ctaButton('Letöltés →', downloadUrl)}
      {divider()}
      {paragraph('💡 Tipp: Töltsd le és mentsd el a saját eszközödre, így bármikor eléred, akár internet nélkül is.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Ezentúl időnként küldök neked tippeket, gondolatokat, anyagokat — mindig csak olyat, amiben biztos vagyok, hogy hasznos lesz. Ha valaha nem szeretnél ilyet kapni, a leiratkozás egy kattintás. 🤍', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Sok örömet kívánok hozzá,', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 🤍', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default FreebieDeliveryEmail;
