interface Props { size?: number; className?: string }

export function TargetIcon({ size = 64, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" overflow="visible" className={className}>
      {/* Background circle */}
      <circle cx="50" cy="50" r="50" fill="#F3EAFC"/>
      {/* Outer ring */}
      <circle cx="50" cy="56" r="26" stroke="#B06AD9" strokeWidth="6.5" fill="none"/>
      {/* Middle ring */}
      <circle cx="50" cy="56" r="15" stroke="#B06AD9" strokeWidth="6.5" fill="none"/>
      {/* Center dot */}
      <circle cx="50" cy="56" r="6.5" fill="#B06AD9"/>
      {/* Arrow shaft */}
      <line x1="70" y1="33" x2="53" y2="51" stroke="#B06AD9" strokeWidth="5" strokeLinecap="round"/>
      {/* Arrow head */}
      <polygon points="68,22 79,34 65,33" fill="#B06AD9"/>
    </svg>
  );
}

export function GlobeGroupIcon({ size = 64, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      <circle cx="50" cy="50" r="50" fill="#F3EAFC"/>
      {/* Globe body */}
      <circle cx="50" cy="36" r="22" fill="#B06AD9"/>
      {/* Globe latitude lines */}
      <ellipse cx="50" cy="36" rx="22" ry="8" fill="none" stroke="white" strokeWidth="1.8" opacity="0.9"/>
      <line x1="28" y1="36" x2="72" y2="36" stroke="white" strokeWidth="1.8" opacity="0.9"/>
      {/* Globe longitude lines */}
      <ellipse cx="50" cy="36" rx="10" ry="22" fill="none" stroke="white" strokeWidth="1.8" opacity="0.9"/>
      {/* Globe outer circle (highlight) */}
      <circle cx="50" cy="36" r="22" fill="none" stroke="white" strokeWidth="1.8" opacity="0.4"/>
      {/* 3 people below */}
      {/* Left person */}
      <circle cx="33" cy="68" r="5" fill="#8B3BBF"/>
      <path d="M24 83 Q33 76 42 83" fill="#8B3BBF"/>
      {/* Center person (larger) */}
      <circle cx="50" cy="66" r="6" fill="#B06AD9"/>
      <path d="M40 82 Q50 74 60 82" fill="#B06AD9"/>
      {/* Right person */}
      <circle cx="67" cy="68" r="5" fill="#8B3BBF"/>
      <path d="M58 83 Q67 76 76 83" fill="#8B3BBF"/>
    </svg>
  );
}

export function StarIcon({ size = 64, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      <circle cx="50" cy="50" r="50" fill="#F3EAFC"/>
      {/* 5-pointed star */}
      <polygon
        points="50,18 58,38 80,38 63,52 69,73 50,60 31,73 37,52 20,38 42,38"
        fill="#B06AD9"
        stroke="#8B3BBF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClockIcon({ size = 64, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      <circle cx="50" cy="50" r="50" fill="#F3EAFC"/>
      {/* Clock outer ring */}
      <circle cx="50" cy="50" r="28" stroke="#B06AD9" strokeWidth="4.5" fill="white"/>
      {/* Hour tick marks */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
        const rad = (deg - 90) * Math.PI / 180;
        const x1 = 50 + 22 * Math.cos(rad);
        const y1 = 50 + 22 * Math.sin(rad);
        const x2 = 50 + 26 * Math.cos(rad);
        const y2 = 50 + 26 * Math.sin(rad);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#B06AD9" strokeWidth={i % 3 === 0 ? 2.5 : 1.5} strokeLinecap="round"/>
        );
      })}
      {/* Hour dots */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
        const rad = (deg - 90) * Math.PI / 180;
        const x = 50 + 18 * Math.cos(rad);
        const y = 50 + 18 * Math.sin(rad);
        return <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 0 : 1.8} fill="#B06AD9"/>;
      })}
      {/* Minute hand (thin, pointing ~10 o'clock) */}
      <line x1="50" y1="50" x2="38" y2="30" stroke="#8B3BBF" strokeWidth="2" strokeLinecap="round"/>
      {/* Hour hand (thick, pointing ~2 o'clock) */}
      <line x1="50" y1="50" x2="62" y2="38" stroke="#B06AD9" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Center dot */}
      <circle cx="50" cy="50" r="3.5" fill="white" stroke="#B06AD9" strokeWidth="2"/>
    </svg>
  );
}
