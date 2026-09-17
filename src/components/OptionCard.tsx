import React from 'react';

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  label: string;
  emoji?: string;
  description?: string;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  selected,
  onClick,
  label,
  emoji,
  description,
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-2xl border-2 transition-all text-left ${
        selected
          ? 'border-coral bg-sage/20'
          : 'border-olive hover:border-sage'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            {emoji && <span className="text-2xl">{emoji}</span>}
            <h4 className="font-semibold text-mauve">{label}</h4>
          </div>
          {description && (
            <p className="text-sm text-mauve/60 mt-1">{description}</p>
          )}
        </div>
        {selected && (
          <div className="w-5 h-5 rounded-full bg-coral flex items-center justify-center flex-shrink-0 ml-2">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
};

interface FilterChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
        selected
          ? 'bg-coral text-white'
          : 'bg-olive text-mauve hover:bg-olive/70'
      }`}
    >
      {label}
    </button>
  );
};
