import { Text } from '@react-email/components';
import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';
import type { Webinar } from '@/types';

interface Props { email: string; firstName: string; webinar: Webinar }

export function WebinarConfirmationEmail({ email, firstName, webinar }: Props) {
  const dateFormatted = new Date(webinar.date).toLocaleDateString('hu-HU', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const greeting = firstName ? `Szia, ${firstName}!` : 'Szia!';

  return (
    <BaseEmail preview="🎉 Bent vagy! Itt van minden részlet a webinárról">
      {heading('🎉 Bent vagy! Itt van minden részlet a webinárról')}
      {paragraph(greeting)}
      {paragraph('Nagyon örülök, hogy itt vagy! 😊')}
      {paragraph('Ez az egyik kedvenc workshopom, mert olyan módszereket mutatok meg benne, amelyeket azonnal be tudsz építeni a mindennapjaidba.')}
      {paragraph('🧠 Biológusként pontosan tudom, hogyan tanul az agy hatékonyan nyelvet. Mégis rengetegen elakadnak: nem mernek megszólalni, nehezen fogalmaznak önállóan, vagy egyszerűen nem tudják, hogyan kezdjenek bele egy új nyelvbe.')}
      {paragraph('A jó hír? Ez legtöbbször nem képesség kérdése, hanem módszertané.')}
      {paragraph('A workshopon megmutatom:')}
      <Text style={{ fontSize: '14px', color: '#2B2B2B', lineHeight: '1.8', margin: '0 0 16px', paddingLeft: '8px' }}>
        ❌ Miért érzed úgy, hogy nem haladsz, vagy mi tart vissza attól, hogy elkezdj egy új nyelvet<br /><br />
        ✅ Milyen egyszerű, tudományosan megalapozott technikákkal tudsz végre magabiztosabban és gyorsabban fejlődni
      </Text>
      {divider()}
      <Text style={{ fontSize: '15px', fontWeight: '700', color: '#173A7A', margin: '0 0 12px', fontFamily: 'Georgia, serif' }}>
        📅 A webinár részletei
      </Text>
      <Text style={{ backgroundColor: '#F3EAFC', borderRadius: '12px', padding: '16px', fontSize: '14px', color: '#173A7A', margin: '0 0 20px', lineHeight: '1.8' }}>
        <strong>Téma:</strong> {webinar.title}<br />
        <strong>Időpont:</strong> {dateFormatted} · {webinar.time}<br />
        <strong>Platform:</strong> Zoom (online, a saját otthonodból 🏡)<br />
        {webinar.zoomLink && <><strong>Csatlakozási link:</strong> <a href={webinar.zoomLink} style={{ color: '#B06AD9' }}>{webinar.zoomLink}</a></>}
      </Text>
      {paragraph('Egy gyors tipp addig is: írd be most a naptáradba az eseményt, hogy biztosan ne maradj le. Küldök majd emlékeztetőt is, de a naptár ritkán felejt. 😄')}
      {webinar.zoomLink && ctaButton('Csatlakozási link →', webinar.zoomLink)}
      {divider()}
      {paragraph('📋 Segíts, hogy még jobban megismerjelek! Töltsd ki ezt a rövid kérdőívet:')}
      {ctaButton('Kérdőív kitöltése →', `${process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com'}/kerdoiv?email=${encodeURIComponent(email)}`)}
      {divider()}
      {paragraph('Ha addig bármilyen kérdésed lenne, egyszerűen válaszolj erre az emailre – minden üzenetet elolvasok.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Hamarosan találkozunk!', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 🤍', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default WebinarConfirmationEmail;
