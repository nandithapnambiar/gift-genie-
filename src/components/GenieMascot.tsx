import React from 'react';

interface GenieProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'thinking' | 'celebrating' | 'welcoming';
  animated?: boolean;
}

export const GenieMascot: React.FC<GenieProps> = ({
  size = 'md',
  variant = 'welcoming',
  animated = true,
}) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-56 h-56',
  };

  return (
    <div
      className={`${sizeClasses[size]} genie-mascot mx-auto ${
        animated ? 'animate-float' : ''
      }`}
      aria-label="Gift Genie mascot"
      role="img"
    >
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="genie-body" x1="65" y1="45" x2="145" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D7F0D8" />
            <stop offset="1" stopColor="#8FC99A" />
          </linearGradient>
          <linearGradient id="genie-gift" x1="135" y1="90" x2="170" y2="125" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F6AAB2" />
            <stop offset="1" stopColor="#E87587" />
          </linearGradient>
        </defs>

        <ellipse cx="100" cy="211" rx="55" ry="10" fill="#69585F" opacity="0.12" />

        {/* Genie Body */}
        <circle cx="100" cy="140" r="35" fill="url(#genie-body)" />

        {/* Genie Head */}
        <circle cx="100" cy="70" r="30" fill="url(#genie-body)" />

        {/* Eyes */}
        <ellipse cx="90" cy="65" rx="5" ry="6" fill="#69585F" className="genie-eye" />
        <ellipse cx="110" cy="65" rx="5" ry="6" fill="#69585F" className="genie-eye" />
        <circle cx="88.5" cy="63" r="1.5" fill="white" />
        <circle cx="108.5" cy="63" r="1.5" fill="white" />

        {/* Smile */}
        <path d="M 90 75 Q 100 82 110 75" stroke="#69585F" strokeWidth="2" fill="none" />

        {/* Left Arm */}
        <rect x="55" y="115" width="15" height="40" rx="7" fill="url(#genie-body)" />
        <circle cx="62" cy="160" r="8" fill="url(#genie-body)" />

        {/* Right Arm */}
        <rect x="130" y="115" width="15" height="40" rx="7" fill="url(#genie-body)" />
        <circle cx="143" cy="160" r="8" fill="url(#genie-body)" />

        {/* Gift Box in hand */}
        <rect x="135" y="90" width="35" height="35" rx="4" fill="url(#genie-gift)" />
        <rect x="140" y="95" width="25" height="25" fill="#FCDDBC" />
        {/* Gift Ribbon */}
        <rect x="150" y="85" width="4" height="55" fill="#D9DBBC" />
        <rect x="135" y="107" width="35" height="4" fill="#D9DBBC" />
        {/* Gift Top */}
        <polygon points="152,85 147,75 157,75" fill="#EF959D" />

        {/* Genie Smoke Trail (bottom) */}
        <circle cx="75" cy="190" r="8" fill="#B8D8BA" opacity="0.3" />
        <circle cx="125" cy="195" r="6" fill="#B8D8BA" opacity="0.2" />

        {/* Sparkles */}
        {variant !== 'thinking' && (
          <>
            <circle cx="140" cy="55" r="3" fill="#EF959D" />
            <circle cx="160" cy="85" r="2" fill="#EF959D" />
            <circle cx="50" cy="50" r="2.5" fill="#EF959D" />
          </>
        )}

        {/* Thinking indicator */}
        {variant === 'thinking' && (
          <>
            <circle cx="125" cy="40" r="4" fill="#D9DBBC" />
            <circle cx="140" cy="30" r="3" fill="#D9DBBC" />
            <circle cx="155" cy="25" r="2" fill="#D9DBBC" />
          </>
        )}
      </svg>
    </div>
  );
};
