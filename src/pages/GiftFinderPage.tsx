import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Button,
  OptionCard,
  ProgressBar,
  GenieMascot,
} from '../components';
import { useAppStore } from '../store';
import { api } from '../api';
import {
  RECIPIENT_TYPES,
  INTERESTS,
  OCCASIONS,
  BUDGET_RANGES,
  GIFT_STYLES,
  getPlayfulErrorMessage,
} from '../constants';

export const GiftFinderPage: React.FC = () => {
  const { questionnaire, updateQuestionnaire, setCurrentPage } = useAppStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFindGifts();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFindGifts = async () => {
    setIsLoading(true);
    setError('');
    try {
      await api.recommendations(questionnaire);
      setCurrentPage('recommendations');
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'Unable to find gifts right now';
      setError(getPlayfulErrorMessage(message));
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return questionnaire.recipient !== '';
      case 2:
        return questionnaire.interests.length > 0;
      case 3:
        return questionnaire.occasion !== '';
      case 4:
        return questionnaire.budget !== '';
      case 5:
        return questionnaire.giftStyle.length > 0;
      default:
        return false;
    }
  };

  return (
    <main className="md:ml-64 pb-20 md:pb-0">
      <div className="page-container max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 pt-8">
          <h1 className="heading-2 mb-2">Find a Gift</h1>
          <ProgressBar current={currentStep} total={totalSteps} />
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-8">
          {/* Step 1: Recipient */}
          {currentStep === 1 && (
            <div>
              <h2 className="heading-3 mb-6">Who is this gift for?</h2>
              <div className="space-y-3">
                {RECIPIENT_TYPES.map((type) => (
                  <OptionCard
                    key={type}
                    label={type}
                    selected={questionnaire.recipient === type}
                    onClick={() => updateQuestionnaire({ recipient: type })}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Interests */}
          {currentStep === 2 && (
            <div>
              <h2 className="heading-3 mb-6">What do they love?</h2>
              <p className="text-mauve/70 mb-4">Select multiple options</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTERESTS.map((interest) => (
                  <OptionCard
                    key={interest}
                    label={interest}
                    selected={questionnaire.interests.includes(interest)}
                    onClick={() => {
                      const updated = questionnaire.interests.includes(interest)
                        ? questionnaire.interests.filter((i) => i !== interest)
                        : [...questionnaire.interests, interest];
                      updateQuestionnaire({ interests: updated });
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Occasion */}
          {currentStep === 3 && (
            <div>
              <h2 className="heading-3 mb-6">What's the occasion?</h2>
              <div className="space-y-3">
                {OCCASIONS.map((occasion) => (
                  <OptionCard
                    key={occasion}
                    label={occasion}
                    selected={questionnaire.occasion === occasion}
                    onClick={() => updateQuestionnaire({ occasion })}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {currentStep === 4 && (
            <div>
              <h2 className="heading-3 mb-6">What's your budget?</h2>
              <div className="space-y-3">
                {BUDGET_RANGES.map(({ label, value }) => (
                  <OptionCard
                    key={value}
                    label={label}
                    selected={questionnaire.budget === value}
                    onClick={() => updateQuestionnaire({ budget: value })}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Gift Style */}
          {currentStep === 5 && (
            <div>
              <h2 className="heading-3 mb-6">What kind of gift are you looking for?</h2>
              <p className="text-mauve/70 mb-4">Select multiple options</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GIFT_STYLES.map((style) => (
                  <OptionCard
                    key={style}
                    label={style}
                    selected={questionnaire.giftStyle.includes(style)}
                    onClick={() => {
                      const updated = questionnaire.giftStyle.includes(style)
                        ? questionnaire.giftStyle.filter((s) => s !== style)
                        : [...questionnaire.giftStyle, style];
                      updateQuestionnaire({ giftStyle: updated });
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center">
              <GenieMascot size="md" variant="thinking" animated />
              <h3 className="heading-3 mt-4 mb-2">Your Genie is thinking...</h3>
              <p className="text-mauve/70">Finding gifts they'll love</p>
            </div>
          </div>
        )}
        {error && (
          <p role="alert" className="mb-6 rounded-xl bg-coral/10 p-4 text-coral">
            {error}
          </p>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center gap-4">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            <ChevronLeft size={20} />
            Back
          </Button>

          <div className="text-sm text-mauve/60">
            Step {currentStep} of {totalSteps}
          </div>

          {currentStep === totalSteps ? (
            <Button
              variant="primary"
              onClick={handleFindGifts}
              isLoading={isLoading}
              disabled={!isStepValid() || isLoading}
            >
              <span>Find My Gifts ✨</span>
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              <span>Continue</span>
              <ChevronRight size={20} />
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};
