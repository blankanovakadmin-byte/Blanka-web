interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: 'default' | 'surface' | 'purple';
}

export function SectionWrapper({
  children,
  className = '',
  id,
  bg = 'default',
}: SectionWrapperProps) {
  const bgClasses = {
    default: 'bg-brand-bg',
    surface: 'bg-brand-surface',
    purple: 'bg-brand-purple-light',
  };

  return (
    <section
      id={id}
      className={[bgClasses[bg], 'py-16 md:py-24', className].join(' ')}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
