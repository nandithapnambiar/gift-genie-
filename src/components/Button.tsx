import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  isLoading,
  className,
  children,
  disabled,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-200 active:translate-y-0 active:scale-[0.985] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-coral to-[#f7aab8] text-white shadow-[0_10px_24px_rgba(239,149,157,0.34)] hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(239,149,157,0.24)]',
    secondary: 'bg-gradient-to-r from-[#d9f4e1] to-[#cfeee0] text-mauve shadow-[0_10px_22px_rgba(134,190,168,0.25)] hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(134,190,168,0.2)]',
    ghost: 'text-mauve ring-1 ring-[#dcd1f0] bg-gradient-to-r from-[#f7f0ff] to-[#f9f2d9] shadow-[0_10px_20px_rgba(181,170,210,0.14)] hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(181,170,210,0.16)]',
  };

  const sizeClasses = {
    sm: 'px-4 py-2.5 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[46px]',
    lg: 'px-8 py-4 text-lg min-h-[50px]',
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        Icon && <Icon size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />
      )}
      {children}
    </button>
  );
};
