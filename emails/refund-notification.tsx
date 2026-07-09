import { BaseEmail, heading, paragraph, divider } from './_base';

interface Props {
  customerEmail: string;
  amount: string;
  reason?: string;
}

export function RefundNotificationEmail({ customerEmail, amount, reason }: Props) {
  return (
    <BaseEmail preview={`Visszatérítés: ${customerEmail} – ${amount}`}>
      {heading('Visszatérítés történt')}
      {paragraph(`Visszatérítés történt a következő vásárlónak: ${customerEmail}`)}
      {divider()}
      {paragraph(`Összeg: ${amount}`, { fontSize: '14px', color: '#7A7A8C' })}
      {reason && paragraph(`Ok: ${reason}`, { fontSize: '14px', color: '#7A7A8C' })}
      {paragraph(`Vásárló: ${customerEmail}`, { fontSize: '14px', color: '#7A7A8C', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default RefundNotificationEmail;
