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
  showingSubQuestions: false
};

const StepQuestionnaire: React.FC = () => {
  const t = useTranslations("Questionnaire");
  const router = useRouter();
  const { user } = useAuth();
  const [isAccepted, setIsAccepted] = useState(false);
  const [state, setState] = useState<QuestionnaireState>(initialState);

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
      // If we're in a sub-question, go back to the main question
      if (prev.currentSubQuestion) {
        return {
          ...prev,
          currentSubQuestion: undefined
        };
      }

      // If we're in alternative flow, go back to the question that led us here
      if (prev.isAlternativeFlow) {
        return {
          ...prev,
          currentStep: prev.responses[3] ? 3 : 0,
          isAlternativeFlow: false
        };
      }

      // If we're at step 3 and came from chronic pain path
      if (prev.currentStep === 3 && prev.responses[1]?.answer === "Chronische Schmerzen") {
        return { ...prev, currentStep: 2 };
      }

      // If we're at step 2 (pain types), go back to step 1
      if (prev.currentStep === 2) {
        return { ...prev, currentStep: 1 };
      }

      // Default case: just go back one step
      return { ...prev, currentStep: Math.max(0, prev.currentStep - 1) };
    });
  };

  const handleNext = () => {
    console.log('handleNext called. Current state:', {
      currentStep: state.currentStep,
      currentSubQuestion: state.currentSubQuestion,
      selectedOptions: state.selectedOptions,
      responses: state.responses
    });

    if (state.currentStep === 0) {
      if (!isAccepted) {
        showInfoToast('Bitte akzeptieren Sie die Einwilligung zur Datenverarbeitung');
        return;
      }
      setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
      return;
    }

    const currentQuestion = questions[state.currentStep - 1];
    console.log('Current question:', currentQuestion, state.selectedOptions);
    
    if (currentQuestion.type === 'checkbox') {
      console.log('Handling checkbox/radio question. Selected options:', state.selectedOptions);
      
      if (state.selectedOptions.length === 0) {
        showInfoToast('Bitte wählen Sie mindestens eine Option aus');
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
            showInfoToast('Bitte beantworten Sie alle Unterfragen');
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
            showingSubQuestions: false
          }));
          return;
        }
      }

      // Special handling for question 9 (medication question)
      console.log(state.currentStep === 9,"currentstepi")
      if (state.currentStep === 9) {
        const selectedYes = state.selectedOptions.includes("Ja");
        setState(prev => ({ 
          ...prev,
          currentStep: selectedYes ? 10 : 11,
          showingSubQuestions: false
        }));
        return;
      }

      // Move to next step
      setState(prev => ({ 
        ...prev,
        currentStep: prev.currentStep + 1,
        showingSubQuestions: false
      }));
      return;
    }
    // For radio type questions, check for required percentage input
  // For radio type questions with percentage input
    if (currentQuestion.type === 'radio' && currentQuestion.options) {
      const selectedOption = currentQuestion.options?.find(opt => 
        opt.hasInput && opt.inputType === 'number' && state.selectedOptions.includes(opt.text)
      );
      console.log('test Selected option:', selectedOption);
      console.log('test state:', state);
      
      if (selectedOption?.hasInput && selectedOption?.inputType === 'number') {
        const inputValue = state.responses[state.currentStep]?.inputValue;
        console.log('test Input value:', inputValue);
        
        if (!inputValue && inputValue !== 0) {
          showInfoToast('Bitte geben Sie den Prozentsatz ein');
          return;
        }
        
        const numValue = Number(inputValue);
        if (isNaN(numValue) || numValue < 0 || numValue > 100) {
          showInfoToast('Bitte geben Sie einen gültigen Prozentsatz zwischen 0 und 100 ein');
          return;
        }
      }
    }

    if (!state.responses[state.currentStep]?.answer) {
      showInfoToast(t('pleaseSelectOption'));
      return;
    }
    
    if (state.responses[state.currentStep]?.answer === "Sonstige" && !state.customInput) {
      showInfoToast(t('pleaseSpecifyOther'));
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
        isAlternativeFlow: true 
      }));
      return;
    }

    // Skip validation for optional questions
    if (!currentQuestion.isOptional) {
      if (state.selectedOptions.length === 0 && currentQuestion.type !== 'textarea') {
        showInfoToast('Bitte wählen Sie mindestens eine Option aus');
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
      showingSubQuestions: false
    }));
  };

  const submitQuestionnaire = async () => {
    try {
      const formattedQuestions = {
        questions: Object.entries(state.responses).map(([step, response]) => ({
          id: questions[Number(step) - 1].id,
          text: questions[Number(step) - 1].text,
          answer: response.answer,
          inputValue: response.inputValue,
          subResponses: response.subResponses
        }))
      };

      // await QuestionnaireService.createQuestionnaire(formattedQuestions);

      // Show success message and redirect
      showInfoToast('Fragebogen erfolgreich eingereicht');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      if (error instanceof Error) {
        showInfoToast(error.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      } else {
        showInfoToast('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      }
    }
  };

  const handleSubQuestionResponse = (parentOption: string, optionText: string) => {
    console.log('handleSubQuestionResponse called with:', {
      parentOption,
      optionText,
      currentStep: state.currentStep
    });

    setState(prev => {
      const currentAnswers = prev.responses[prev.currentStep]?.subResponses?.[parentOption]?.answers || [];
      const newAnswers = currentAnswers.includes(optionText)
        ? currentAnswers.filter(ans => ans !== optionText)
        : [...currentAnswers, optionText];

      console.log('Updating answers:', {
        currentAnswers,
        newAnswers
      });

      return {
        ...prev,
        responses: {
          ...prev.responses,
          [prev.currentStep]: {
            ...prev.responses[prev.currentStep],
            subResponses: {
              ...prev.responses[prev.currentStep]?.subResponses,
              [parentOption]: {
                ...prev.responses[prev.currentStep]?.subResponses?.[parentOption],
                answers: newAnswers
              }
            }
          }
        }
      };
    });
  };

  const handleCheckboxChange = (optionText: string) => {
    console.log('handleCheckboxChange called with:', optionText);
    
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
      
      console.log('New selected options:', newSelectedOptions);
      
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
    console.log('handleOptionSelect called with:', optionText);
    
    const currentQuestion = questions[state.currentStep - 1];
    const selectedOption = currentQuestion.options?.find(opt => opt.text === optionText);
    
    setState(prev => ({
      ...prev,
      responses: {
        ...prev.responses,
        [prev.currentStep]: {
          ...prev.responses[prev.currentStep],
          answer: optionText,
          customInput: prev.customInput,
          // Clear input value if selecting an option without input
          inputValue: selectedOption?.hasInput ? prev.responses[prev.currentStep]?.inputValue : undefined
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
        showInfoToast('Bitte geben Sie einen gültigen Prozentsatz zwischen 0 und 100 ein');
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
    console.log('Rendering all sub-questions for selected options:', state.selectedOptions);
  
    return (
      <div className="space-y-12">
        {state.selectedOptions.map((optionText, index) => {
          const subQuestion = subQuestions[optionText as keyof typeof subQuestions];
          if (!subQuestion) return null;
  
          const selectedAnswers =
            state.responses[state.currentStep]?.subResponses?.[optionText]?.answers || [];
  
          return (
            <div
              key={index}
              className="space-y-8 pb-8 border-b border-gray-200 last:border-b-0"
            >
              <h3 className="text-secondary font-semibold text-xl">{optionText}</h3>
              <h4 className="text-secondary font-medium text-lg">{subQuestion.text}</h4>
              <div className="space-y-3">
                {subQuestion.options.map((option, idx) => (
                  <div key={idx}>
                    <button
                      onClick={() => handleSubQuestionResponse(optionText, option.text)}
                      className={`w-full text-left p-4 rounded-lg border ${
                        selectedAnswers.includes(option.text)
                          ? 'border-secondary bg-secondary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start">
                        <div
                          className={`w-6 h-6 mt-0.5 border-2 rounded flex items-center justify-center ${
                            selectedAnswers.includes(option.text)
                              ? 'border-secondary'
                              : 'border-gray-300'
                          }`}
                        >
                          {selectedAnswers.includes(option.text) && (
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
                    {('hasInput' in option) && option.hasInput && selectedAnswers.includes(option.text) && (
                      <div className="mt-3 ml-8">
                        <input
                          type="text"
                          value={
                            state.responses[state.currentStep]?.subResponses?.[optionText]
                              ?.answers?.[0] || ''
                          }
                          onChange={(e) =>
                            setState((prev) => ({
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
                                      answers: [e.target.value],
                                    },
                                  },
                                },
                              },
                            }))
                          }
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
            <svg
              className="mr-2"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19L8 12L15 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t('buttons.back')}
          </button>
          <button
            onClick={handleNext}
            disabled={
              !state.selectedOptions.every(
                (opt) =>
                  (state.responses[state.currentStep]?.subResponses?.[opt]?.answers?.length || 0) >
                  0
              )
            }
            className={`px-6 py-3 rounded-lg flex items-center ${
              state.selectedOptions.every(
                (opt) =>
                  (state.responses[state.currentStep]?.subResponses?.[opt]?.answers?.length || 0) >
                  0
              )
                ? 'bg-secondary text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {t('buttons.next')}
            <svg
              className="ml-2"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5L16 12L9 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  const renderQuestion = () => {
    console.log('renderQuestion called. State:', {
      currentStep: state.currentStep,
      currentSubQuestion: state.currentSubQuestion,
      isAlternativeFlow: state.isAlternativeFlow
    });

    if (state.currentStep === 0) {
      return renderConsent();
    }

    const currentQuestion = questions[state.currentStep - 1];
    if (!currentQuestion) return null;

    console.log(state,"state")
    
    // If we're in question 5 and showing subquestions
    if (state.currentStep === 5 && state.showingSubQuestions && state.selectedOptions.length > 0) {
      return renderSubQuestions();
    }

    if (currentQuestion.type === 'checkbox') {
      return renderCheckboxQuestion(currentQuestion);
    }

    if (currentQuestion.type === 'textarea') {
      return (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">{currentQuestion.text}</h2>
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
            placeholder="Optional: Geben Sie hier weitere Informationen ein"
            className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary resize-none"
          />
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <h3 className="text-secondary font-semibold text-lg">{currentQuestion.text}</h3>
        <div className="space-y-3">
          {currentQuestion.options?.map((option, idx) => (
            <div key={idx}>
              <button
                onClick={() => handleOptionSelect(option.text)}
                className={`w-full text-left p-4 rounded-lg border ${
                  state.responses[state.currentStep]?.answer === option.text
                    ? 'border-secondary bg-secondary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start">
                  <div className={`w-6 h-6 mt-0.5 border-2 rounded-full flex items-center justify-center ${
                    state.responses[state.currentStep]?.answer === option.text
                      ? 'border-secondary'
                      : 'border-gray-300'
                  }`}>
                    {state.responses[state.currentStep]?.answer === option.text && (
                      <div className="w-3 h-3 rounded-full bg-secondary" />
                    )}
                  </div>
                  <div className="ml-3">
                    <span className="text-secondary text-lg font-semibold">{option.text}</span>
                    {option.subtext && (
                      <span className="block text-gray-500 text-sm mt-1">{option.subtext}</span>
                    )}
                  </div>
                </div>
              </button>
              {option.hasInput && state.responses[state.currentStep]?.answer === option.text && (
                <div className="mt-3 ml-8">
                  <input
                    type={'number'}
                    placeholder={option.inputPlaceholder || 'Bitte eingeben'}
                    value={state.responses[state.currentStep]?.inputValue || ''}
                    onChange={(e) => handleInputChange(e.target.value, option)}
                    className="border rounded p-2 w-32"
                    min={0}
                    max={100}
                  />
                  {option.inputType === 'number' && <span className="ml-2">%</span>}
                </div>
              )}
            </div>
          ))}
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
          {question.options?.map((option, idx) => (
            <div key={idx}>
              <button
                onClick={() => handleCheckboxChange(option.text)}
                className={`w-full text-left p-4 rounded-lg border ${
                  state.selectedOptions.includes(option.text)
                    ? 'border-secondary bg-secondary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start">
                  <div className={`w-6 h-6 mt-0.5 border-2 rounded flex items-center justify-center ${
                    state.selectedOptions.includes(option.text)
                      ? 'border-secondary'
                      : 'border-gray-300'
                  }`}>
                    {state.selectedOptions.includes(option.text) && (
                      <svg className="w-4 h-4 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-secondary text-lg font-semibold ml-3">{option.text}</span>
                </div>
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-8">
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