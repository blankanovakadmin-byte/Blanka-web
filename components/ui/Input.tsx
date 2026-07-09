import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-brand-text font-sans">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'w-full px-4 py-3 rounded-xl border bg-white font-sans text-brand-text placeholder:text-brand-muted',
            'transition-colors duration-200',
            error
              ? 'border-brand-coral focus:border-brand-coral focus:outline-none focus:ring-2 focus:ring-brand-coral/20'
              : 'border-brand-border focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20',
            className,
          ].join(' ')}
          {...props}
        />
        {error && <p className="text-xs text-brand-coral font-sans">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
