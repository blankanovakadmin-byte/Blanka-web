import { Text } from '@react-email/components';
import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';

interface Props { email: string; productTitle: string; downloadUrl: string }

export function DigitalProductDeliveryEmail({ email, productTitle, downloadUrl }: Props) {
  return (
    <BaseEmail preview="📥 A letöltési linked - 72 óra áll rendelkezésre">
      {heading('📥 A letöltési linked - 72 óra áll rendelkezésre')}
      {paragraph('Szia!')}
      {paragraph('Köszönöm a vásárlást! 🤍 Az anyagot rengeteg munkával és szeretettel állítottam össze — remélem, te is úgy fogod érezni, amikor végigmész rajta.')}
      {divider()}
      <Text style={{ fontSize: '14px', fontWeight: '700', color: '#173A7A', margin: '0 0 8px' }}>
        ⬇️ Letöltési link
      </Text>
      <Text style={{ backgroundColor: '#F3EAFC', borderRadius: '12px', padding: '16px', fontSize: '14px', color: '#173A7A', margin: '0 0 20px', lineHeight: '1.8' }}>
        {productTitle}<br />
        ⚠️ Ez a link <strong>72 óráig érvényes</strong> — töltsd le most a terméket!<br />
        👉 <a href={downloadUrl} style={{ color: '#B06AD9' }}>{downloadUrl}</a>
      </Text>
      {ctaButton('Letöltés →', downloadUrl)}
      {divider()}
      {paragraph('💡 Tipp: Töltsd le és mentsd el a saját eszközödre, így bármikor eléred, akár internet nélkül is. Ha a link lejárt és még nem töltötted le, írj rám, segítek.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Ha bármilyen kérdésed van az anyaggal kapcsolatban, várom az üzeneted.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Jó munkát!', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 🤍', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default DigitalProductDeliveryEmail;
