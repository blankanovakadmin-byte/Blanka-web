import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=block&text=B',
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot)' } }
    ).then(r => r.text());
    const urlMatch = css.match(/url\(([^)]+)\)/);
    if (!urlMatch) return null;
    return await fetch(urlMatch[1]).then(r => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function AppleIcon() {
  const font = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #F3EAFC 0%, #E8D5F9 100%)',
          borderRadius: '40px',
        }}
      >
        <span
          style={{
            color: '#B06AD9',
            fontSize: 140,
            fontFamily: font ? 'Dancing Script' : 'Georgia, serif',
            fontWeight: 700,
            fontStyle: font ? 'normal' : 'italic',
            lineHeight: 1,
            marginTop: font ? '20px' : '0',
          }}
        >
          B
        </span>
      </div>
    ),
    {
      ...size,
      ...(font ? { fonts: [{ name: 'Dancing Script', data: font, style: 'normal', weight: 700 }] } : {}),
    },
  );
}
