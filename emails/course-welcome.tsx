import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';

interface Props { email: string }

export function CourseWelcomeEmail({ email }: Props) {
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com';

  return (
    <BaseEmail preview="Üdvözöljük a Magabiztosan Angolul kurzuson! 🎉">
      {heading('Üdvözöllek a kurzuson! 🎉')}
      {paragraph('Gratulálok a döntésedhez! Megvásároltad a "Magabiztosan Angolul" kurzust — ez egy nagy lépés a magabiztos angol kommunikáció felé.')}
      {paragraph('Hamarosan megkapod a belépési adatokat a Systeme.io platformra, ahol az összes kurzusanyag elérhető lesz.')}
      {paragraph('Addig is:')}
      {paragraph('→ Csatlakozz a privát Telegram csoporthoz (link a kurzus belső oldalán)\n→ Olvasd el a "Hogyan készülj?" útmutatót\n→ Jelöld meg a heti alkalmakat a naptáradban')}
      {divider()}
      {ctaButton('Kurzus megnyitása →', `${BASE}/programok`)}
      {paragraph('Ha bármilyen kérdésed van, válaszolj erre az emailre — személyesen segítek!', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 💜', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default CourseWelcomeEmail;
