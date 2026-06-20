import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Novák Blanka – angol nyelvtanulás online: kurzus, mentorprogram, webinár';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F4EFE6',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Accent bar */}
        <div style={{ width: 6, height: 80, background: '#B06AD9', borderRadius: 3, marginBottom: 36 }} />

        <div style={{ fontSize: 18, color: '#B06AD9', fontWeight: 600, letterSpacing: 2, marginBottom: 20, fontFamily: 'Arial, sans-serif', textTransform: 'uppercase' }}>
          blankanovak.com
        </div>

        <div style={{ fontSize: 64, fontWeight: 700, color: '#173A7A', lineHeight: 1.1, marginBottom: 24, maxWidth: 800 }}>
          Magabiztosan
          <span style={{ color: '#B06AD9', fontStyle: 'italic' }}> Angolul</span>
        </div>

        <div style={{ fontSize: 26, color: '#5A5A7A', lineHeight: 1.5, maxWidth: 680, fontFamily: 'Arial, sans-serif' }}>
          Webinár, kurzus, 1-1 mentorálás és letölthető anyagok biológus-doktorandusz, nyelvtanártól.
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginTop: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#B06AD9', borderRadius: 40, padding: '12px 28px' }}>
            <span style={{ color: 'white', fontSize: 20, fontFamily: 'Arial, sans-serif', fontWeight: 600 }}>
              32 000+ követő
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#173A7A', borderRadius: 40, padding: '12px 28px' }}>
            <span style={{ color: 'white', fontSize: 20, fontFamily: 'Arial, sans-serif', fontWeight: 600 }}>
              500+ elégedett tanuló
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
