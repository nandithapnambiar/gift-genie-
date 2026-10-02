import React from 'react';
import { ArrowLeft, Eye, LayoutGrid, Sparkles } from 'lucide-react';
import { useAppStore } from '../store';

type AccessibilityToggleKey = 'highContrast' | 'reduceMotion' | 'simplifiedMode';

interface AccessibilityToggleProps {
  keyName: AccessibilityToggleKey;
  label: string;
  description: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
}

const AccessibilityToggle: React.FC<AccessibilityToggleProps> = ({
  keyName,
  label,
  description,
  icon: Icon,
}) => {
  const { preferences, updatePreferences } = useAppStore();
  const checked = preferences[keyName];
  const titleId = `${keyName}-title`;
  const descId = `${keyName}-description`;

  const handleToggle = () => {
    updatePreferences({ [keyName]: !checked });
  };

  const handleRowKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      className="min-h-[44px] rounded-2xl bg-white p-5 shadow-soft transition-all duration-200 hover:bg-[#fffdfc]"
      role="button"
      tabIndex={0}
      onClick={handleToggle}
      onKeyDown={handleRowKeyDown}
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-olive/50 text-mauve">
            <Icon size={18} className="stroke-[1.8]" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 id={titleId} className="font-bold text-mauve">{label}</h2>
            <p id={descId} className="mt-1 text-sm leading-relaxed text-[#584d5a]">
              {description}
            </p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={titleId}
          aria-describedby={descId}
          onClick={(event) => {
            event.stopPropagation();
            handleToggle();
          }}
          className={`relative inline-flex h-[30px] w-[52px] shrink-0 items-center rounded-full border border-[#d9d0c6] p-[2px] shadow-inner transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 ${
            checked ? 'bg-[#bfd5be]' : 'bg-[#e9e2df]'
          }`}
        >
          <span
            className={`h-[26px] w-[26px] rounded-full bg-white shadow-[0_2px_8px_rgba(76,58,79,0.18)] transition-transform duration-200 ${
              checked ? 'translate-x-[22px]' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export const AccessibilityPage: React.FC = () => {
  const { setCurrentPage } = useAppStore();

  const toggles: AccessibilityToggleProps[] = [
    {
      keyName: 'highContrast',
      label: 'High contrast mode',
      description: 'Improve readability with stronger text and background contrast.',
      icon: Eye,
    },
    {
      keyName: 'reduceMotion',
      label: 'Reduce motion',
      description: 'Slow down or remove animation effects for a calmer experience.',
      icon: Sparkles,
    },
    {
      keyName: 'simplifiedMode',
      label: 'Simplified layout',
      description: 'Use large controls and less visual clutter when needed.',
      icon: LayoutGrid,
    },
  ];

  return (
    <main className="md:ml-64 pb-20 md:pb-0">
      <div className="page-container max-w-2xl py-8">
        <button
          type="button"
          onClick={() => setCurrentPage('home')}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-mauve/75 hover:text-mauve"
        >
          <ArrowLeft size={18} />
          Back home
        </button>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-mauve/60">Accessibility</p>
          <h1 className="heading-2 mt-2">Comfort settings</h1>
        </div>

        <div className="space-y-4">
          {toggles.map((toggle) => (
            <AccessibilityToggle key={toggle.keyName} {...toggle} />
          ))}
        </div>
      </div>
    </main>
  );
};
