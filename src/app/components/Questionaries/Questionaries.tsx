"use client";

import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Question, QuestionnaireState, SubQuestion } from "@/app/types/Questionnaire.type";
import { questions, subQuestions } from "./data/questions";
import ProgressBar from "./components/ProgressBar";
import { showInfoToast } from "@/app/utils/toast";
import { useAuth } from "@/app/context/AuthContext";
import QuestionnaireService from '@/app/services/questionnaireService';

const STORAGE_KEY = 'questionnaire_state';

const initialState: QuestionnaireState = {
  currentStep: 0,
  responses: {},
  selectedOption: null,
  customInput: "",
  isAlternativeFlow: false,
  selectedOptions: [],
  currentSubQuestion: undefined,
  showingSubQuestions: false,
  stepHistory: [0]
};

const StepQuestionnaire: React.FC = () => {
  const t = useTranslations("Questionnaire");
  const router = useRouter();
  const { user } = useAuth();
  const [isAccepted, setIsAccepted] = useState(false);
  const [state, setState] = useState<QuestionnaireState>(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState
      ? JSON.parse(savedState)
      : initialState;
  });

  // Load saved state on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(STORAGE_KEY);
      const savedAccepted = localStorage.getItem(STORAGE_KEY + '_accepted');
      
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setState(parsedState);
      }
      
      if (savedAccepted) {
        setIsAccepted(JSON.parse(savedAccepted));
      }
    }
  }, []);

  // Save state on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      localStorage.setItem(STORAGE_KEY + '_accepted', JSON.stringify(isAccepted));
    }
  }, [state, isAccepted]);

  useEffect(() => {
    if (!user?.id) {
      router.push("/");
    }
  }, [user?.id, router]);

  const handleClose = () => {
    if (window.confirm(t('confirmClose'))) {
      setState(initialState);
      setIsAccepted(false);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY + '_accepted');
    }
  };

  const handlePrev = () => {
    setState(prev => {
      // Get the previous step from history
      const newHistory = [...prev.stepHistory];
      newHistory.pop(); // Remove current step
      const previousStep = newHistory[newHistory.length - 1] || 0;

      // Get the previous step's responses to restore selection state
      const previousResponse = prev.responses[previousStep];
      const previousSelectedOptions = previousResponse?.answer 
        ? Array.isArray(previousResponse.answer)
          ? previousResponse.answer
          : [previousResponse.answer]
        : [];

      // Create new responses object without current step
      const newResponses = { ...prev.responses };
      delete newResponses[prev.currentStep];

      return {
        ...prev,
        currentStep: previousStep,
        stepHistory: newHistory,
        showingSubQuestions: false,
        selectedOptions: previousSelectedOptions,
        selectedOption: Array.isArray(previousResponse?.answer) ? null : previousResponse?.answer as string || null,
        responses: newResponses
      };
    });
  };

  const handleNext = () => {
    if (state.currentStep === 0) {
      if (!isAccepted) {
        showInfoToast(t('buttons.toast.pleaseAcceptConsentUpdated'));
        return;
      }
      setState(prev => ({ 
        ...prev, 
        currentStep: prev.currentStep + 1,
        stepHistory: [...prev.stepHistory, prev.currentStep + 1]
      }));
      return;
    }

    const currentQuestion = questions[state.currentStep - 1];
    
    if (currentQuestion.type === 'checkbox') {
      if (state.selectedOptions.length === 0) {
        showInfoToast(t('buttons.toast.pleaseSelectOption'));
        return;
      }

      // For question 5, check if we're showing subquestions
      if (state.currentStep === 5) {
        if (!state.showingSubQuestions) {
          setState(prev => ({ 
            ...prev,
            showingSubQuestions: true
          }));
          return;
        } else {
          const hasAllSubResponses = state.selectedOptions.every(option => {
            const subQuestion = subQuestions[option as keyof typeof subQuestions];
            if (!subQuestion) return true;
            const responses = state.responses[state.currentStep]?.subResponses?.[option]?.answers;
            return responses && responses.length > 0;
          });

          if (!hasAllSubResponses) {
            showInfoToast(t('buttons.toast.pleaseAnswerSubQuestions'));
            return;
          }
        }
      }

      // Special handling for question 6
      if (state.currentStep === 6) {
        const hasFirstOption = state.selectedOptions.includes("Hiermit bestätige ich an keiner der genannten Erkrankungen zu leiden");
        
        if (hasFirstOption) {
          setState(prev => ({ 
            ...prev,
            currentStep: hasFirstOption ? 11 : 7,
            showingSubQuestions: false,
            stepHistory: [...prev.stepHistory, hasFirstOption ? 11 : 7]
          }));
          return;
        }
      }

      // Move to next step
      setState(prev => ({ 
        ...prev,
        currentStep: prev.currentStep + 1,
        showingSubQuestions: false,
        selectedOptions: [], // Reset selectedOptions
        selectedOption: null, // Reset selectedOption as well for consistency
        stepHistory: [...prev.stepHistory, prev.currentStep + 1]
      }));
      return;
    }
    // For radio type questions, check for required percentage input
    if (currentQuestion.type === 'radio' && currentQuestion.options) {
      // Special handling for question 9 (medication question)
      if (state.currentStep === 9) {
        const selectedYes = state.selectedOptions.includes("Ja");
        const nextStep = selectedYes ? 10 : 11;
        setState(prev => ({ 
          ...prev,
          currentStep: nextStep,
          showingSubQuestions: false,
          stepHistory: [...prev.stepHistory, nextStep]
        }));
        return;
      }

      const selectedOption = currentQuestion.options?.find(opt => 
        opt.hasInput && opt.inputType === 'number' && state.selectedOptions.includes(opt.text)
      );
      
      if (selectedOption?.hasInput && selectedOption?.inputType === 'number') {
        const inputValue = state.responses[state.currentStep]?.inputValue;
        
        if (!inputValue && inputValue !== 0) {
          showInfoToast(t('buttons.toast.pleaseEnterPercentage'));
          return;
        }
        
        const numValue = Number(inputValue);
        if (isNaN(numValue) || numValue < 0 || numValue > 100) {
          showInfoToast(t('buttons.toast.pleaseEnterValidPercentage'));
          return;
        }
      }
    }

    if (!state.responses[state.currentStep]?.answer) {
      showInfoToast(t('buttons.toast.pleaseSelectOption'));
      return;
    }
    
    if (state.responses[state.currentStep]?.answer === "Sonstige" && !state.customInput) {
      showInfoToast(t('buttons.toast.pleaseSpecifyOther'));
      return;
    }

    // Check for redirections to other diseases question
    const selectedOption = questions[state.currentStep - 1].options?.find(
      opt => opt.text === state.responses[state.currentStep]?.answer
    );
    
    if (selectedOption?.redirectToOtherDiseases) {
      setState(prev => ({ 
        ...prev, 
        currentStep: 6, // Question 6 is the other diseases question
        isAlternativeFlow: true,
        stepHistory: [...prev.stepHistory, 6]
      }));
      return;
    }

    // Skip validation for optional questions
    if (!currentQuestion.isOptional) {
      if (state.selectedOptions.length === 0 && currentQuestion.type !== 'textarea') {
        showInfoToast(t('buttons.toast.pleaseSelectOption'));
        return;
      }
    }

    // If this is the last question, submit the questionnaire
    if (state.currentStep === questions.length) {
      submitQuestionnaire();
      return;
    }

    // Move to next step
    setState(prev => ({ 
      ...prev,
      currentStep: prev.currentStep + 1,
      showingSubQuestions: false,
      selectedOptions: [], // Reset selectedOptions
      selectedOption: null, // Reset selectedOption as well for consistency
      stepHistory: [...prev.stepHistory, prev.currentStep + 1]
    }));
  };

  const submitQuestionnaire = async () => {
    try {
      const formattedQuestions = {
        questions: Object.entries(state.responses).map(([step, response]) => ({
          id: questions[Number(step) - 1].id,
          question: questions[Number(step) - 1].text,
          answer: response.answer,
        }))
      };

      console.log(formattedQuestions,"formatedQuestions");

      // await QuestionnaireService.createQuestionnaire(formattedQuestions);

      // Show success message and redirect
      showInfoToast(t('buttons.toast.successfulSubmission'));
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      if (error instanceof Error) {
        showInfoToast(t('buttons.toast.errorOccurred') + ' ' + (error.message || ''));
      } else {
        showInfoToast(t('buttons.toast.errorOccurred'));
      }
    }
  };

  const handleSubQuestionResponse = (parentOption: string, optionText: string) => {
    setState(prev => {
      const currentAnswers = prev.responses[prev.currentStep]?.subResponses?.[parentOption]?.answers || [];
      const newAnswers = currentAnswers.includes(optionText)
        ? currentAnswers.filter(ans => ans !== optionText)
        : [...currentAnswers, optionText];

      return {
        ...prev,
        responses: {
          ...prev.responses,
          [prev.currentStep]: {
            ...prev.responses[prev.currentStep],
            subResponses: {
              ...prev.responses[prev.currentStep]?.subResponses,
              [parentOption]: {
                ...prev.responses[prev.currentStep]?.subResponses?.[
                  parentOption
                ],
                answers: newAnswers
              }
            }
          }
        }
      };
    });
  };

  const handleCheckboxChange = (optionText: string) => {
    setState(prev => {
      let newSelectedOptions;

      // Special handling for question 6
      if (state.currentStep === 6) {
        const isFirstOption = optionText === "Hiermit bestätige ich an keiner der genannten Erkrankungen zu leiden";
        
        if (isFirstOption) {
          // If clicking first option, clear all other selections
          newSelectedOptions = [optionText];
        } else {
          // If clicking other options
          const hasFirstOption = prev.selectedOptions.includes("Hiermit bestätige ich an keiner der genannten Erkrankungen zu leiden");
          if (hasFirstOption) {
            // If first option was selected, remove it and add the new option
            newSelectedOptions = [optionText];
          } else {
            // Normal toggle behavior for other options
            newSelectedOptions = prev.selectedOptions.includes(optionText)
              ? prev.selectedOptions.filter(opt => opt !== optionText)
              : [...prev.selectedOptions, optionText];
          }
        }
      } else {
        // Normal behavior for other questions
        newSelectedOptions = prev.selectedOptions.includes(optionText)
          ? prev.selectedOptions.filter(opt => opt !== optionText)
          : [...prev.selectedOptions, optionText];
      }
      
      return {
        ...prev,
        selectedOptions: newSelectedOptions,
        responses: {
          ...prev.responses,
          [prev.currentStep]: {
            answer: newSelectedOptions,
            subResponses: prev.responses[prev.currentStep]?.subResponses || {}
          }
        }
      };
    });
  };

  const handleOptionSelect = (optionText: string) => {
    setState(prev => ({
      ...prev,
      responses: {
        ...prev.responses,
        [prev.currentStep]: {
          ...prev.responses[prev.currentStep],
          answer: optionText,
          customInput: prev.customInput,
          // Clear input value if selecting an option without input
          inputValue: prev.responses[prev.currentStep]?.inputValue
        }
      },
      selectedOption: optionText,
      selectedOptions: [optionText],
      customInput: ""
    }));
  };

  const handleInputChange = (value: string, option: any) => {
    if (option.inputType === 'number') {
      // Only allow numbers and validate percentage range
      const numValue = parseInt(value);
      if (isNaN(numValue) || numValue < 0 || numValue > 100) {
        showInfoToast(t('buttons.toast.pleaseEnterValidPercentage'));
        return;
      }
    }

    setState(prev => ({
      ...prev,
      responses: {
        ...prev.responses,
        [prev.currentStep]: {
          ...prev.responses[prev.currentStep],
          inputValue: value
        }
      }
    }));
  };

  const renderSubQuestions = () => {


    return (
      <div className="space-y-12">
        {state.selectedOptions.map((optionText, optionIdx) => {
          const selectedAnswers = state.responses[state.currentStep]?.subResponses?.[optionText]?.answers || [];
       
          return (
            <div key={optionIdx} className="space-y-4">
              <h3 className="text-secondary font-semibold text-xl">{optionText}</h3>
              <h4 className="text-secondary font-medium text-lg">{subQuestions[optionText as keyof typeof subQuestions].text}</h4>
              <div className="space-y-3">
                {subQuestions[optionText as keyof typeof subQuestions].options.map((option, idx) => (
                  <div key={idx}>
                    <button
                      onClick={() => handleSubQuestionResponse(optionText, option.text)}
                      className={`w-full text-left p-4 rounded-lg border ${
                        (selectedAnswers.includes(option.text) || state.responses[state.currentStep]?.subResponses?.[optionText]?.answers?.includes(option.text))
                          ? 'border-secondary bg-secondary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-6 h-6 border-2 rounded flex-shrink-0 flex items-center justify-center ${
                            (selectedAnswers.includes(option.text) || state.responses[state.currentStep]?.subResponses?.[optionText]?.answers?.includes(option.text))
                              ? 'border-secondary'
                              : 'border-gray-300'
                          }`}
                        >
                          {(selectedAnswers.includes(option.text) || state.responses[state.currentStep]?.subResponses?.[optionText]?.answers?.includes(option.text)) && (
                            <svg
                              className="w-4 h-4 text-secondary"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="ml-3">
                          <span className="text-secondary text-lg font-semibold">
                            {option.text}
                          </span>
                          {('subtext' in option) && option.subtext && (
                            <span className="block text-gray-500 text-sm mt-1">
                              {option.subtext}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                    {('hasInput' in option) && option.hasInput && (selectedAnswers.includes(option.text) || state.responses[state.currentStep]?.subResponses?.[optionText]?.answers?.includes(option.text)) && (
                      <div className="mt-3 ml-8">
                        <input
                          type="text"
                          value={
                            state.responses[state.currentStep]?.subResponses?.[optionText]
                              ?.answers?.[0] || ''
                          }
                          onChange={(e) => {
                            const newValue = e.target.value;
                            setState((prev) => {
                              const newState = {
                                ...prev,
                                responses: {
                                  ...prev.responses,
                                  [prev.currentStep]: {
                                    ...prev.responses[prev.currentStep],
                                    subResponses: {
                                      ...prev.responses[prev.currentStep]?.subResponses,
                                      [optionText]: {
                                        ...prev.responses[prev.currentStep]?.subResponses?.[
                                          optionText
                                        ],
                                        answers: [newValue],
                                      },
                                    },
                                  },
                                },
                              };
                              return newState;
                            });
                          }}
                          placeholder="Bitte spezifizieren Sie"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrev}
            className="px-6 py-3 border border-secondary text-secondary rounded-lg flex items-center"
          >
            <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t('buttons.back')}
          </button>
          <button
            onClick={handleNext}
            disabled={
              state.selectedOptions
                .filter(opt => questions[4].options?.find(o => o.text === opt)?.hasSubQuestions)
                .some(opt => 
                  (state.responses[state.currentStep]?.subResponses?.[opt]?.answers?.length || 0) === 0
                )
            }
            className={`px-6 py-3 rounded-lg flex items-center ${
              !state.selectedOptions
                .filter(opt => questions[4].options?.find(o => o.text === opt)?.hasSubQuestions)
                .some(opt => 
                  (state.responses[state.currentStep]?.subResponses?.[opt]?.answers?.length || 0) === 0
                )
                ? 'bg-secondary text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {t("buttons.next")}
            <svg className="ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    );
  };

  const renderQuestion = () => {
  
    if (state.currentStep === 0) {
      return renderConsent();
    }

    const currentQuestion = questions[state.currentStep - 1];
    if (!currentQuestion) return null;

    // If we're in question 5 and showing subquestions
    if (state.currentStep === 5 && state.showingSubQuestions && state.selectedOptions.length > 0) {
      return renderSubQuestions();
    }

    switch (currentQuestion.type) {
      case 'radio':
        return renderRadioQuestion(currentQuestion);
      case 'checkbox':
        return renderCheckboxQuestion(currentQuestion);
      case 'textarea':
        return renderTextareaQuestion(currentQuestion);
      default:
        return null;
    }
  };

  const renderRadioQuestion = (question: Question) => {


    return (
      <div className="space-y-8">
        <h3 className="text-secondary font-semibold text-lg">{question.text}</h3>
        <div className="space-y-4">
          {question.options?.map((option, idx) => {
            const isSelected = state.responses[state.currentStep]?.answer === option.text || state.selectedOption === option.text;
            return (
              <div key={idx}>
                <button
                  onClick={() => handleOptionSelect(option.text)}
                  className={`w-full text-left p-4 rounded-lg border ${
                    isSelected
                      ? 'border-secondary bg-secondary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 border-2 rounded-full flex-shrink-0 flex items-center justify-center ${
                      isSelected
                        ? 'border-secondary'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <div className="w-3 h-3 rounded-full bg-secondary" />
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <span className="text-secondary text-lg font-semibold">{option.text}</span>
                      {option.subtext && (
                        <span className="block text-gray-500 text-sm mt-1">{option.subtext}</span>
                      )}
                    </div>
                  </div>
                </button>
                {option.hasInput && (state.responses[state.currentStep]?.answer === option.text || state.selectedOption === option.text) && (
                  <div className="mt-3 ml-8">
                    <input
                      type={'number'}
                      placeholder={option.inputPlaceholder || 'Bitte eingeben'}
                      value={state.responses[state.currentStep]?.inputValue || ''}
                      onChange={(e) => handleInputChange(e.target.value, option)}
                      className="border rounded p-2 w-32 text-secondary"
                      min={0}
                      max={100}
                    />
                    {option.inputType === 'number' && <span className="ml-2">%</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrev}
            className="px-6 py-3 border border-secondary text-secondary rounded-lg flex items-center"
          >
            <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t("buttons.back")}
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-secondary text-white rounded-lg flex items-center"
          >
            {t("buttons.next")}
            <svg className="ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    );
  };

  const renderConsent = () => {
    return (
      <div className="flex flex-col items-center py-10 px-4 max-w-2xl mx-auto">
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-secondary mb-8">
            Einwilligung zur Datenverarbeitung
          </h2>
          <div className="w-full text-secondary border border-1 border-secondary p-4 rounded-lg flex items-center justify-between mb-8">
            <span>Hiermit willige ich der Verarbeitung meiner besonderen personenbezogenen Daten ein</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAccepted}
                onChange={() => setIsAccepted(!isAccepted)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>
          <button
            onClick={handleNext}
            className={`px-4 py-2 text-white rounded-lg w-full ${
              isAccepted ? 'bg-secondary hover:bg-secondary/90' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Weiter
          </button>
        </div>
      </div>
    );
  };

  const renderCheckboxQuestion = (question: Question) => {
 

    return (
      <div className="space-y-8">
        <h3 className="text-secondary font-semibold text-lg">{question.text}</h3>
        <div className="space-y-3">
          {question.options?.map((option, idx) => {
            const isSelected = state.selectedOptions.includes(option.text) || 
              (Array.isArray(state.responses[state.currentStep]?.answer) && 
               state.responses[state.currentStep]?.answer?.includes(option.text));
            
        

            return (
              <div key={idx}>
                <button
                  onClick={() => handleCheckboxChange(option.text)}
                  className={`w-full text-left p-4 rounded-lg border ${
                    isSelected
                      ? 'border-secondary bg-secondary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }
                  ${option.hasDifferentUi ? 'mb-10': ''}
                  `}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 border-2 rounded flex items-center justify-center ${
                      isSelected
                        ? 'border-secondary'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <svg className="w-4 h-4 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-secondary text-lg font-semibold ml-3">{option.text}</span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrev}
            className="px-6 py-3 border border-secondary text-secondary rounded-lg flex items-center"
          >
            <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t('buttons.back')}
          </button>
          <button
            onClick={handleNext}
            disabled={state.selectedOptions.length === 0}
            className={`px-6 py-3 rounded-lg flex items-center ${
              state.selectedOptions.length > 0
                ? 'bg-secondary text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {t("buttons.next")}
            <svg className="ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    );
  };

  const renderTextareaQuestion = (question: Question) => {

    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-secondary">{question.text}</h2>
        <textarea
          value={state.responses[state.currentStep]?.answer || ''}
          onChange={(e) => setState(prev => ({
            ...prev,
            responses: {
              ...prev.responses,
              [prev.currentStep]: {
                answer: e.target.value
              }
            }
          }))}
          placeholder={t('optionalInfo')}
          className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary resize-none text-secondary"
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            className="px-6 py-2 text-secondary border border-secondary rounded-md hover:bg-secondary/5 transition-colors"
          >
            {t('buttons.back')}
          </button>
          <button
            onClick={submitQuestionnaire}
            className="px-6 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors flex items-center"
          >
            {t('buttons.finishQuestionnaire')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10 bg-white">
        <ProgressBar 
          currentStep={state.currentStep + 1}
          onClose={handleClose}
          onPrev={handlePrev}
        />
      </div>
      <div className="flex-1 container mx-auto px-4 py-8">
        {state.currentStep === 0 ? (
          renderConsent()
        ) : (
          <div className="max-w-2xl mx-auto">
            {renderQuestion()}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepQuestionnaire;