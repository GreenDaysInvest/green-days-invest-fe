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
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= step.number
                  ? 'bg-secondary text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step.number}
              </div>
              <span className={`ml-2 text-sm ${
                currentStep >= step.number
                  ? 'text-secondary font-medium'
                  : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${
                currentStep > step.number
                  ? 'bg-secondary'
                  : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
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
