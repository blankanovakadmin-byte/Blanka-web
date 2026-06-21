import { Text } from '@react-email/components';
import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';

interface Props { email: string; name?: string; courseTitle?: string; courseUrl?: string }

export function CourseWelcomeEmail({ email, name, courseTitle, courseUrl }: Props) {
  const greeting = name ? `Szia, ${name}!` : 'Szia!';
  const title = courseTitle || 'kurzuson';

  return (
    <BaseEmail preview={`🎉 Bent vagy! Üdvözöllek a(z) ${title} kurzuson`}>
      {heading(`🎉 Bent vagy! Üdvözöllek a(z) ${title} kurzuson`)}
      {paragraph(greeting)}
      {paragraph('Örülök, hogy meghozted ezt a döntést. Ez az a lépés, amin sokan sokáig gondolkoznak, és te megtetted. Ezzel máris előrébb tartasz.')}
      {paragraph('Az alábbi gombbal tudsz belépni a kurzusplatformra, ahol az összes anyag elérhető:')}
      {courseUrl ? ctaButton('Belépés a kurzusba →', courseUrl) : paragraph('A belépési linket hamarosan külön emailben kapod meg.')}
      {divider()}
      <Text style={{ fontSize: '14px', fontWeight: '700', color: '#173A7A', margin: '0 0 8px' }}>
        📌 A következő lépések
      </Text>
      <Text style={{ backgroundColor: '#F3EAFC', borderRadius: '12px', padding: '16px', fontSize: '14px', color: '#173A7A', margin: '0 0 20px', lineHeight: '1.8' }}>
        ✅ Lépj be a kurzusplatformra a fenti gombbal<br />
        ✅ Jelöld meg a tanulási alkalmakat a naptáradban<br />
        ✅ Ha bármilyen kérdésed van, válaszolj erre az emailre
      </Text>
      {divider()}
      {paragraph('📋 Segíts, hogy még jobban megismerjelek! Töltsd ki ezt a rövid kérdőívet:')}
      {ctaButton('Kérdőív kitöltése →', `${process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com'}/kerdoiv?email=${encodeURIComponent(email)}`)}
      {divider()}
      {paragraph('Ha bármilyen kérdésed van, egyszerűen válaszolj erre az emailre, minden üzenetet elolvasok.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Örülök, hogy együtt dolgozhatunk!', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 🤍', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default CourseWelcomeEmail;
