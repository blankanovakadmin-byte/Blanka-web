import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #C87BEA 0%, #8B3DBD 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '40px',
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: 128,
            fontWeight: 700,
            lineHeight: 1,
            fontFamily: 'Georgia, serif',
            marginTop: '6px',
          }}
        >
          B
        </span>
      </div>
    ),
    { ...size },
  );
}
