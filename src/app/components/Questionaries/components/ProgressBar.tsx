import React from 'react';
import { useTranslations } from 'next-intl';
import { IoClose } from 'react-icons/io5';
import { IoChevronBack } from 'react-icons/io5';

interface ProgressBarProps {
  currentStep: number;
  onClose?: () => void;
  onPrev?: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, onClose, onPrev }) => {
  const t = useTranslations('Questionnaire');
  
  const getStepProgress = (step: number) => {
    switch (step) {
      case 1: // Data Privacy
        return currentStep > 0;
      case 2: // Patient Status (steps 1-6)
        return currentStep >= 1 && currentStep <= 6
          ? Math.min((currentStep - 1) / 5, 1) // Calculate progress within the range
          : currentStep > 6;
      case 3: // Diseases (steps 7-15)
        return currentStep >= 7 && currentStep <= 15
          ? Math.min((currentStep - 7) / 8, 1)
          : currentStep > 15;
      case 4: // Details (step 16)
        return currentStep === 16;
      default:
        return false;
    }
  };

  const steps = [
    { number: 1, label: t('steps.dataPrivacy') },
    { number: 2, label: t('steps.patientStatus') },
    { number: 3, label: t('steps.diseases') },
    { number: 4, label: t('steps.details') }
  ];

  return (
    <div className="w-full bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <button 
        onClick={onPrev} 
        className={`mr-4 text-gray-500 hover:text-secondary transition-colors ${currentStep <= 1 ? 'invisible' : ''}`}
      >
        <IoChevronBack size={24} />
      </button>
      
      <div className="flex-1 flex items-center justify-center">
        {steps.map((step, index) => {
          const isCompleted = getStepProgress(step.number);
          const isActive = (
            (step.number === 1 && currentStep === 0) ||
            (step.number === 2 && currentStep >= 1 && currentStep <= 6) ||
            (step.number === 3 && currentStep >= 7 && currentStep <= 15) ||
            (step.number === 4 && currentStep === 16)
          );
          
          return (
            <React.Fragment key={step.number}>
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  isCompleted
                    ? 'bg-secondary text-white'
                    : isActive
                      ? 'bg-secondary/20 text-secondary'
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.number}
                </div>
                <span className={`ml-2 text-sm ${
                  isCompleted
                    ? 'text-secondary font-medium'
                    : isActive
                      ? 'text-secondary'
                      : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  isCompleted
                    ? 'bg-secondary'
                    : isActive
                      ? 'bg-secondary/20'
                      : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <button 
        onClick={onClose} 
        className="ml-4 text-gray-500 hover:text-secondary transition-colors"
      >
        <IoClose size={24} />
      </button>
    </div>
  );
};

export default ProgressBar;
