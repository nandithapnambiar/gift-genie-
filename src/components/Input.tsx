import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon: Icon,
  helperText,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-mauve mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-mauve/50">
            <Icon size={20} />
          </div>
        )}
        <input
          className={`input-field ${Icon ? 'pl-12' : 'pl-4'} ${error ? 'border-coral' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-coral">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-mauve/60">{helperText}</p>}
    </div>
  );
};
