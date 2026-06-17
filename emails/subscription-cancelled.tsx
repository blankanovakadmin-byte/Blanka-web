import { BaseEmail, heading, paragraph, divider } from './_base';

interface Props {
  customerEmail: string;
  customerName?: string;
  productType: string;
}

export function SubscriptionCancelledEmail({ customerEmail, customerName, productType }: Props) {
  const label = productType === 'group-mentoring' ? 'Kiscsoportos mentorprogram' : 'Privát mentorprogram';

  return (
    <BaseEmail preview={`Lemondás: ${customerEmail} – ${label}`}>
      {heading('Előfizetés lemondva')}
      {paragraph(`${customerName || customerEmail} lemondta a(z) ${label} előfizetését.`)}
      {divider()}
      {paragraph(`Email: ${customerEmail}`, { fontSize: '14px', color: '#7A7A8C' })}
      {paragraph(`Típus: ${label}`, { fontSize: '14px', color: '#7A7A8C', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default SubscriptionCancelledEmail;
