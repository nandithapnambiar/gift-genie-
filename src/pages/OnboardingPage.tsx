import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button, OptionCard, GenieMascot } from '../components';
import { useAppStore } from '../store';

export const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<string[]>([]);
  const { setCurrentPage } = useAppStore();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setCurrentPage('home');
    }
  };

  const handleSkip = () => {
    setCurrentPage('home');
  };

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left - Illustration */}
          <div className="hidden md:flex">
            <GenieMascot size="lg" variant="celebrating" />
          </div>

          {/* Right - Content */}
          <div>
            {step === 1 && (
              <div>
                <h1 className="heading-2 mb-4">What kind of gifts do you love giving?</h1>
                <p className="text-mauve/70 mb-6">This helps us personalize your experience.</p>
                <div className="space-y-3 mb-8">
                  {[
                    'Thoughtful',
                    'Practical',
                    'Personalized',
                    'Luxury',
                    'Fun',
                    'Experiential',
                  ].map((type) => (
                    <OptionCard
                      key={type}
                      label={type}
                      selected={preferences.includes(type)}
                      onClick={() => {
                        setPreferences(
                          preferences.includes(type)
                            ? preferences.filter((p) => p !== type)
                            : [...preferences, type]
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h1 className="heading-2 mb-4">What matters most?</h1>
                <p className="text-mauve/70 mb-6">Help us find better gifts for you.</p>
                <div className="space-y-3 mb-8">
                  {['Budget', 'Personalization', 'Quality', 'Uniqueness', 'Speed'].map((item) => (
                    <OptionCard
                      key={item}
                      label={item}
                      selected={preferences.includes(item)}
                      onClick={() => {
                        setPreferences(
                          preferences.includes(item)
                            ? preferences.filter((p) => p !== item)
                            : [...preferences, item]
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h1 className="heading-2 mb-4">Ready to find some magic? ✨</h1>
                <p className="text-mauve/70 mb-8">
                  You're all set! Let's start exploring beautiful gifts for your loved ones.
                </p>
                <div className="bg-sage/20 rounded-xl p-6 mb-8">
                  <p className="font-semibold text-mauve mb-3">Quick Tips:</p>
                  <ul className="space-y-2 text-sm text-mauve/70">
                    <li>✨ Use Gift Finder for personalized recommendations</li>
                    <li>❤️ Save gifts to your wishlist</li>
                    <li>🔍 Discover new gifts by category</li>
                    <li>⚙️ Customize your preferences anytime</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4">
              <Button variant="ghost" onClick={handleSkip} className="flex-1">
                Skip for now
              </Button>
              <Button variant="primary" onClick={handleNext} className="flex-1">
                {step === 3 ? 'Start Discovering ✨' : 'Continue'}
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
