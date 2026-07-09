import { Text } from '@react-email/components';
import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';

interface Props { email: string; name: string; eventTitle: string; startTime: string }

export function BookingConfirmationEmail({ email, name, eventTitle, startTime }: Props) {
  const dateFormatted = new Date(startTime).toLocaleDateString('hu-HU', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <BaseEmail preview={`Foglalásod megerősítve: ${eventTitle}`}>
      {heading('Foglalásod megerősítve! ✅')}
      {paragraph(`Szia ${name || 'kedves felhasználó'}! Az időpontfoglalásod sikeresen regisztrálva lett.`)}
      <Text style={{ backgroundColor: '#F3EAFC', borderRadius: '12px', padding: '16px', fontSize: '15px', color: '#173A7A', fontWeight: '600', margin: '0 0 20px' }}>
        📅 {eventTitle}<br/>
        🕐 {dateFormatted}
      </Text>
      {paragraph('A pontos linket és a részleteket Cal.com-on keresztül kapod meg. Nézd meg a naptáradat!')}
      {divider()}
      {paragraph('Ha módosítanod kell az időpontot, a Cal.com-on keresztül tudod megtenni.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Várlak az alkalmon!', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 💜', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default BookingConfirmationEmail;
