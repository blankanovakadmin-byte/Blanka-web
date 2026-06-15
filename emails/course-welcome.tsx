import { Text } from '@react-email/components';
import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';

interface Props { email: string; name?: string }

export function CourseWelcomeEmail({ email, name }: Props) {
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com';
  const greeting = name ? `Szia, ${name}!` : 'Szia!';

  return (
    <BaseEmail preview="🎉 Bent vagy! Üdvözöllek a Magabiztosan Angolul kurzuson">
      {heading('🎉 Bent vagy! Üdvözöllek a kurzuson')}
      {paragraph(greeting)}
      {paragraph('Örülök, hogy meghozted ezt a döntést. Ez az a lépés, amin sokan sokáig gondolkoznak, és te megtetted. Ezzel máris előrébb tartasz.')}
      {paragraph('Hamarosan megkapod a belépési adatokat a kurzusplatformra, ahol az összes anyag elérhető lesz. Ha valamiért nem érkezne meg 24 órán belül, írj rám és megoldjuk.')}
      {divider()}
      <Text style={{ fontSize: '14px', fontWeight: '700', color: '#173A7A', margin: '0 0 8px' }}>
        📌 A következő lépések
      </Text>
      <Text style={{ backgroundColor: '#F3EAFC', borderRadius: '12px', padding: '16px', fontSize: '14px', color: '#173A7A', margin: '0 0 20px', lineHeight: '1.8' }}>
        ✅ Nézd meg a belépési emailt a kurzusplatformról<br />
        ✅ Jelöld meg a tanulási alkalmakat a naptáradban<br />
        ✅ Ha bármilyen kérdésed van, válaszolj erre az emailre
      </Text>
      {ctaButton('Kurzus megnyitása →', `${BASE}/programok`)}
      {divider()}
      {paragraph('Ha bármilyen kérdésed van, egyszerűen válaszolj erre az emailre, minden üzenetet elolvasok.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Örülök, hogy együtt dolgozhatunk!', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 🤍', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default CourseWelcomeEmail;
