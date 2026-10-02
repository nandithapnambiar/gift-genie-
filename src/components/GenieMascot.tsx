import React, { useEffect, useMemo, useState } from 'react';

interface GenieProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'thinking' | 'celebrating' | 'welcoming';
  mood?: 'happy' | 'excited' | 'calm' | 'thoughtful';
  animated?: boolean;
  className?: string;
}

export const GenieMascot: React.FC<GenieProps> = ({
  size = 'md',
  variant = 'welcoming',
  mood = 'happy',
  animated = true,
  className = '',
}) => {
  const [sparkleMode, setSparkleMode] = useState(false);
  const [speechIndex, setSpeechIndex] = useState(0);

  const speechLines = useMemo(
    () => [
      'Ooh, who\'s the lucky one?',
      'Let\'s find something magical!',
      'A perfect surprise is waiting!',
      'Your next favorite gift is close!',
    ],
    []
  );

  useEffect(() => {
    if (!animated) {
      setSparkleMode(false);
      return undefined;
    }

    if (variant === 'celebrating' || variant === 'thinking' || mood === 'excited') {
      setSparkleMode(true);
      const timer = window.setTimeout(() => setSparkleMode(false), 900);
      return () => window.clearTimeout(timer);
    }

    setSparkleMode(false);
    return undefined;
  }, [animated, mood, variant]);

  useEffect(() => {
    if (!animated) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setSpeechIndex((value) => (value + 1) % speechLines.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [animated, speechLines]);

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-56 h-56',
  };

  const moodStyles = {
    happy: { eyeY: 82, eyebrow: 1, mouth: 112, blush: 0.75 },
    excited: { eyeY: 80, eyebrow: 1.25, mouth: 110, blush: 1 },
    calm: { eyeY: 84, eyebrow: 0.7, mouth: 116, blush: 0.4 },
    thoughtful: { eyeY: 82, eyebrow: 0.5, mouth: 114, blush: 0.6 },
  };

  const currentMood = moodStyles[mood] ?? moodStyles.happy;

  return (
    <div
      className={`${sizeClasses[size]} genie-mascot relative mx-auto ${animated ? 'genie-bob' : ''} ${sparkleMode ? 'genie-sparkle' : ''} ${className}`}
      aria-label="Gift Genie mascot"
      role="img"
    >
      <div className="genie-speech-bubble">{speechLines[speechIndex]}</div>

      <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        <path d="M34 67L38 77L49 78L41 85L43 96L34 90L25 96L28 85L20 78L31 77L34 67Z" fill="#F5D75E" stroke="#14505A" strokeWidth="2" strokeLinejoin="round" />
        <path d="M183 91L186 98L194 99L188 104L190 112L183 108L176 112L178 104L172 99L180 98L183 91Z" fill="#F3A8C4" stroke="#14505A" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="57" cy="113" r="4" fill="#D9A8E8" stroke="#14505A" strokeWidth="1.5" />
        <circle cx="180" cy="48" r="5" fill="#F6E768" stroke="#14505A" strokeWidth="1.5" />
        <path d="M153 35C157 22 168 18 178 22C187 26 189 36 184 43C179 50 168 51 160 46L153 35Z" fill="#15515D" stroke="#103F4A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M156 39C164 43 173 42 179 37" stroke="#34A5A6" strokeWidth="4" strokeLinecap="round" />
        <path d="M145 47C151 34 164 29 176 34C181 36 185 41 187 47C178 45 171 48 165 55L145 47Z" fill="#15515D" stroke="#103F4A" strokeWidth="3" strokeLinejoin="round" />

        <path d="M87 137C77 133 70 125 65 117C61 111 57 110 53 113C48 117 53 126 59 132C66 141 77 147 91 149L87 137Z" fill="#7FE0DC" stroke="#14505A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M143 137C153 132 159 124 164 116C168 110 173 110 177 114C181 118 177 127 171 134C164 142 153 148 139 150L143 137Z" fill="#7FE0DC" stroke="#14505A" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="53" cy="113" r="5" fill="#B9F2EA" stroke="#14505A" strokeWidth="2.5" />
        <circle cx="177" cy="114" r="5" fill="#B9F2EA" stroke="#14505A" strokeWidth="2.5" />

        <path d="M91 130C86 143 87 157 95 167C101 175 104 182 96 189C89 195 79 192 75 186C82 201 99 204 111 195C124 186 117 173 112 163L129 132L91 130Z" fill="#71D8D4" stroke="#14505A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M100 136C105 151 113 160 126 166C137 171 145 167 145 160C145 154 137 152 132 148C125 142 124 136 128 129L100 136Z" fill="#A7ECE4" stroke="#14505A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M92 127C100 122 132 122 142 129L137 153C127 160 105 159 95 152L92 127Z" fill="#F596B8" stroke="#14505A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M91 134C103 140 129 141 140 134" stroke="#F6D85E" strokeWidth="7" strokeLinecap="round" />
        <path d="M109 127L117 139L125 127" fill="#F6D85E" stroke="#14505A" strokeWidth="2.5" strokeLinejoin="round" />

        <circle cx="109" cy="82" r="48" fill="#9BE9E8" stroke="#14505A" strokeWidth="3.5" />
        <path d="M70 68C75 51 89 40 105 38C90 46 84 58 82 71C78 91 86 107 101 123C79 119 65 100 65 82C65 77 67 72 70 68Z" fill="#C9F7F0" opacity="0.8" />
        <path d="M69 55C75 39 91 31 108 34C120 36 128 43 133 51C121 47 113 49 104 55C91 64 81 66 69 62V55Z" fill="#15515D" stroke="#103F4A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M98 37C104 27 116 24 125 28C132 31 136 37 136 44C127 40 119 42 113 48L98 37Z" fill="#15515D" stroke="#103F4A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M118 39C124 35 131 35 136 39" stroke="#42B5AF" strokeWidth="4" strokeLinecap="round" />

        <ellipse cx="91" cy="105" rx="9" ry="5.5" fill="#F28FB3" opacity={currentMood.blush} />
        <ellipse cx="132" cy="105" rx="9" ry="5.5" fill="#F28FB3" opacity={currentMood.blush} />
        <ellipse cx="91" cy={currentMood.eyeY} rx="7" ry="9" fill="#fff" />
        <ellipse cx="130" cy={currentMood.eyeY} rx="7" ry="9" fill="#fff" />
        <ellipse cx="93" cy={currentMood.eyeY + 2} rx="4" ry="6" fill="#123F4C" className="genie-eye" />
        <ellipse cx="128" cy={currentMood.eyeY + 2} rx="4" ry="6" fill="#123F4C" className="genie-eye" />
        <circle cx="94" cy={currentMood.eyeY - 1} r="1.8" fill="#fff" />
        <circle cx="129" cy={currentMood.eyeY - 1} r="1.8" fill="#fff" />
        <path d={mood === 'thoughtful' ? 'M105 111C110 108 115 108 120 111' : `M105 ${currentMood.mouth - 2}C109 ${currentMood.mouth + 5} 116 ${currentMood.mouth + 5} 121 ${currentMood.mouth - 2}`} stroke="#14505A" strokeWidth="3" strokeLinecap="round" />

        <path d="M44 132L47 138L54 139L49 144L50 151L44 147L38 151L39 144L34 139L41 138L44 132Z" fill="#F3A8C4" stroke="#14505A" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M166 71L169 77L176 78L171 83L172 90L166 86L160 90L161 83L156 78L163 77L166 71Z" fill="#F6D85E" stroke="#14505A" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="62" cy="49" r="3" fill="#B8A0DE" stroke="#14505A" strokeWidth="1.5" />
        <circle cx="159" cy="128" r="3" fill="#B8A0DE" stroke="#14505A" strokeWidth="1.5" />
      </svg>
    </div>
  );
};
