import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ hoverable, className, ...props }) => {
  return (
    <div
      className={`card ${hoverable ? 'card-hover' : ''} ${className}`}
      {...props}
    />
  );
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'info';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, className }) => {
  const variantClasses = {
    default: 'bg-olive text-mauve',
    success: 'bg-sage text-mauve',
    warning: 'bg-coral text-white',
    info: 'bg-cream text-mauve',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
