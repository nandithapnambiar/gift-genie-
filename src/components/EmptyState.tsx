import React from 'react';
import { GenieMascot } from './GenieMascot';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  return (
    <div className="text-center py-12 px-4">
      {!icon && <GenieMascot size="md" />}
      {icon && <div className="mb-6 text-5xl">{icon}</div>}
      <h3 className="heading-2 mb-2">{title}</h3>
      {description && (
        <p className="text-body text-mauve/70 mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  showLabel = true,
}) => {
  const percentage = (current / total) * 100;

  return (
    <div>
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold text-mauve">
            Step {current} of {total}
          </span>
          <span className="text-sm font-semibold text-mauve">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-olive/30 rounded-full h-2 overflow-hidden">
        <div
          className="bg-coral h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: 'bg-sage',
    error: 'bg-coral',
    info: 'bg-olive',
  };

  return (
    <div className={`${bgColors[type]} text-white px-6 py-3 rounded-xl shadow-soft-lg`}>
      {message}
    </div>
  );
};
