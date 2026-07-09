'use client';

import { type ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-purple text-white hover:bg-[#9A55C4] active:scale-[0.98] shadow-md hover:shadow-lg',
  secondary:
    'border-2 border-brand-purple text-brand-purple bg-transparent hover:bg-brand-purple-light active:scale-[0.98]',
  ghost:
    'text-brand-blue hover:text-brand-purple hover:bg-brand-purple-light active:scale-[0.98]',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      href,
      external,
      loading,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = [
      'inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-200 cursor-pointer select-none',
      variantClasses[variant],
      sizeClasses[size],
      (disabled || loading) ? 'opacity-50 pointer-events-none' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
