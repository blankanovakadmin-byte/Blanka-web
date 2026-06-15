import { Text } from '@react-email/components';
import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';

interface Props { email: string; firstName?: string }

export function NewsletterWelcomeEmail({ email, firstName }: Props) {
  const greeting = firstName ? `Szia ${firstName}!` : 'Szia!';
  return (
    <BaseEmail preview="Üdv a Novák Blanka közösségében! 🎉">
      {heading('Üdv a közösségben!')}
      {paragraph(`${greeting} Örülök, hogy csatlakoztál. Ez az email megerősíti, hogy ${email} sikeresen feliratkozott a hírlevélre.`)}
      {paragraph('Mostantól hetente kapsz tőlem:')}
      <Text style={{ fontSize: '14px', color: '#2B2B2B', lineHeight: '1.8', margin: '0 0 16px', paddingLeft: '16px' }}>
        ✅ Gyakorlati angol tanulási tippeket<br/>
        ✅ Ingyenes letölthető anyagokat<br/>
        ✅ Korai értesítést az új programokról<br/>
        ✅ Motivációt és közösségi élményeket
      </Text>
      {divider()}
      {paragraph('Addig is, nézd meg az ingyenes forrásaimat és válassz egyet számodra!')}
      {ctaButton('Ingyenes anyagok felfedezése →', `${process.env.NEXT_PUBLIC_BASE_URL || 'https://blankanovak.com'}/forrasok`)}
      {paragraph('Blanka 💜', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default NewsletterWelcomeEmail;
