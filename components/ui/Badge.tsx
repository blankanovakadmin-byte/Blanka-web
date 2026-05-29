interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'coral' | 'teal' | 'blue' | 'muted' | 'green';
  className?: string;
}

const variants = {
  purple: 'bg-brand-purple-light text-brand-purple',
  coral:  'bg-[#FEE8E8] text-brand-coral',
  teal:   'bg-[#E0F5F6] text-[#2A9EA4]',
  blue:   'bg-[#E8EDF8] text-brand-blue',
  muted:  'bg-brand-border text-brand-muted',
  green:  'bg-[#E6F2EC] text-[#2D7A4F]',
};

export function Badge({ children, variant = 'purple', className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-sans uppercase tracking-wide',
        variants[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
