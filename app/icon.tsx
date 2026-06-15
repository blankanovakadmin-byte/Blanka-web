import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: '7px',
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: 700,
            lineHeight: 1,
            fontFamily: 'Georgia, serif',
            marginTop: '1px',
          }}
        >
          B
        </span>
      </div>
    ),
    { ...size },
  );
}
