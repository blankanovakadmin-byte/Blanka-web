import {
  Html, Head, Body, Container, Section, Text, Hr, Link, Preview,
} from '@react-email/components';

const COLORS = {
  bg: '#F4EFE6',
  surface: '#FFFFFF',
  blue: '#173A7A',
  purple: '#B06AD9',
  muted: '#7A7A8C',
  border: '#E9E5DD',
};

interface BaseEmailProps {
  preview: string;
  children: React.ReactNode;
  unsubscribeUrl?: string;
}

export function BaseEmail({ preview, children, unsubscribeUrl = '#' }: BaseEmailProps) {
  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: COLORS.bg, fontFamily: "'Inter', Arial, sans-serif", margin: 0, padding: '24px 0' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto' }}>
          {/* Header */}
          <Section style={{ textAlign: 'center', padding: '24px 0 16px' }}>
            <Text style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: '700', color: COLORS.blue, margin: 0 }}>
              blanka<span style={{ color: COLORS.purple, fontFamily: "'Dancing Script', Georgia, cursive", fontWeight: '700', fontStyle: 'normal', fontSize: '32px' }}>novak</span>
            </Text>
          </Section>

          {/* Card */}
          <Section style={{ backgroundColor: COLORS.surface, borderRadius: '20px', padding: '32px', border: `1px solid ${COLORS.border}` }}>
            {children}
          </Section>

          {/* Footer */}
          <Section style={{ textAlign: 'center', padding: '24px 0' }}>
            <Text style={{ fontSize: '12px', color: COLORS.muted, margin: '0 0 8px' }}>
              Instagram · YouTube · LinkedIn · TikTok
            </Text>
            <Hr style={{ borderColor: COLORS.border, margin: '8px 0' }} />
            <Text style={{ fontSize: '11px', color: COLORS.muted, margin: 0 }}>
              © 2026 Lybskin Kft. (Novák Blanka) ·{' '}
              <Link href={unsubscribeUrl} style={{ color: COLORS.muted }}>Leiratkozás</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export const heading = (text: string) => (
  <Text style={{
    fontFamily: 'Georgia, serif',
    fontSize: '26px',
    fontWeight: '700',
    color: '#173A7A',
    marginTop: 0,
    marginBottom: '12px',
  }}>
    {text}
  </Text>
);

export const paragraph = (text: string, style?: React.CSSProperties) => (
  <Text style={{ fontSize: '15px', color: '#2B2B2B', lineHeight: '1.6', marginBottom: '16px', ...style }}>
    {text}
  </Text>
);

export const ctaButton = (text: string, href: string) => (
  <Section style={{ textAlign: 'center', margin: '24px 0' }}>
    <Link
      href={href}
      style={{
        backgroundColor: '#B06AD9',
        color: '#FFFFFF',
        padding: '14px 32px',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '15px',
        textDecoration: 'none',
        display: 'inline-block',
      }}
    >
      {text}
    </Link>
  </Section>
);

export const divider = () => <Hr style={{ borderColor: '#E9E5DD', margin: '24px 0' }} />;
