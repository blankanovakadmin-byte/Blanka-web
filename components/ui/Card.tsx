import { type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ hover, padding = 'md', className = '', children, ...props }: CardProps) {
  const paddings = { sm: 'p-4', md: 'p-6', lg: 'p-8' };

  return (
    <div
      className={[
        'bg-brand-surface rounded-2xl border border-brand-border',
        paddings[padding],
        hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
