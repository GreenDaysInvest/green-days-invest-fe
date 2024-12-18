"use client";
import { useAuth } from "@/app/context/AuthContext";
import QuestionnaireService from "@/app/services/questionnaireService";
import { showErrorToast, showInfoToast } from "@/app/utils/toast";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { Question, Response, QuestionnaireState } from "@/app/types/Questionnaire.type";
import { questions } from "./data/questions";
import ProgressBar from "./components/ProgressBar";

const StepQuestionnaire: React.FC = () => {
  const t = useTranslations("Questionnaire");
  const tNotifications = useTranslations('Notifications');
  const { user } = useAuth();
  const [state, setState] = useState<QuestionnaireState>({
    currentStep: -1,
    responses: {},
    hasSubmitted: false,
    questionnaireStatus: "",
    consent: { accepted: false },
    showFollowUp: false,
    selectedOption: null,
    customInput: '',
    selectedOptions: []
  });

  const totalSteps = questions.length;

  useEffect(() => {
    const checkQuestionnaireSubmission = async () => {
      try {
        const userQuestionnaires = await QuestionnaireService.getUserQuestionnaires(String(user?.id));
        const latestStatus = userQuestionnaires.slice(-1)[0]?.status || "";
        setState(prev => ({ ...prev, questionnaireStatus: latestStatus }));
        if (userQuestionnaires.length > 0) {
          setState(prev => ({ ...prev, hasSubmitted: true }));
        }
      } catch (error) {
        showErrorToast(tNotifications('errorQuestionnaireStatus'));
        console.error("Error checking questionnaire submission status:", error);
      }
    };

    if (user?.id) checkQuestionnaireSubmission();
  }, [user?.id]);

  const handleOptionSelect = (optionText: string) => {
    if (state.currentStep === 2 && state.showFollowUp) {
      const currentResponse = state.responses[state.currentStep] || {};
      const currentSelections = currentResponse.subAnswer as string[] || [];
      
      if (currentSelections.includes(optionText)) {
        const newSelections = currentSelections.filter(item => item !== optionText);
        setState(prev => ({
          ...prev,
          responses: {
            ...prev.responses,
            [prev.currentStep]: {
              ...currentResponse,
              answer: prev.responses[prev.currentStep]?.answer,
              subAnswer: newSelections
            }
          },
          selectedOptions: newSelections
        }));
      } else {
        const newSelections = [...currentSelections, optionText];
        setState(prev => ({
          ...prev,
          responses: {
            ...prev.responses,
            [prev.currentStep]: {
              ...currentResponse,
              answer: prev.responses[prev.currentStep]?.answer,
              subAnswer: newSelections
            }
          },
          selectedOptions: newSelections
        }));
      }
    } else {
      setState(prev => ({
        ...prev,
        responses: {
          ...prev.responses,
          [prev.currentStep]: {
            answer: optionText,
            subAnswer: []  
          }
        },
        selectedOption: optionText,
        selectedOptions: []
      }));
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState(prev => ({ ...prev, customInput: value }));
    
    const updatedResponses = { ...state.responses };
    updatedResponses[state.currentStep] = {
      ...updatedResponses[state.currentStep],
      customInput: value
    };
    setState(prev => ({ ...prev, responses: updatedResponses }));
  };

  const handleNext = () => {
    if (state.responses[state.currentStep]?.answer === "Andere nicht aufgeführte Haupterkrankung" && !state.customInput) {
      return;
    }

    if (state.currentStep === 2) {
      const answer = state.responses[state.currentStep].answer;
      if (answer === "Ja" || answer === "Nein") {
        setState(prev => ({ ...prev, showFollowUp: true, selectedOption: answer }));
      }
    } else if (state.showFollowUp) {
      setState(prev => ({ ...prev, showFollowUp: false, selectedOption: null }));
      if (state.currentStep < questions.length - 1) {
        setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
      } else {
        handleSubmit();
      }
    } else {
      if (state.currentStep < questions.length - 1) {
        setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrev = () => {
    if (state.showFollowUp) {
      setState(prev => ({ ...prev, showFollowUp: false, selectedOption: null }));
    } else if (state.currentStep >= 0) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const handleSubmit = async () => {
    const questionnaireData = { questions: Object.values(state.responses) };
    try {
      await QuestionnaireService.createQuestionnaire(questionnaireData);
      showInfoToast(tNotifications('questionnaireSubmitedSuccesfully'));
      setState(prev => ({ ...prev, hasSubmitted: true }));
    } catch (error) {
      showErrorToast(tNotifications('errorSubmitingQuestionnaire'));
      console.error("Error submitting questionnaire:", error);
    }
  };

  const handleClose = () => {
    if (window.confirm(t('confirmClose'))) {
      // Reset the questionnaire state
      setState({
        currentStep: -1,
        responses: {},
        hasSubmitted: false,
        questionnaireStatus: "",
        consent: { accepted: false },
        showFollowUp: false,
        selectedOption: null,
        customInput: '',
        selectedOptions: []
      });
    }
  };

  const renderConsentStep = () => {
    return (
      <div className="flex flex-col items-center py-10 px-4 mx-auto">
        <h2 className="text-3xl font-semibold text-secondary mb-8">Datenschutz</h2>
        <div className="bg-secondary p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">Einwilligung zur Verarbeitung besonderer personenbezogener Daten</h3>
          <p className="mb-4">
            Mir ist bekannt, dass die Bloomwell GmbH eine Plattform für mich als Nutzer zur Verfügung stellt, über die ich eine Behandlungsanfrage an Kooperationsärzte stellen, bei diesen Termine buchen und über Videotelefonie eine Sprechstunde wahrnehmen kann.
          </p>
          <p className="mb-4">
            Darüber hinaus ist es mir möglich, von den Kooperationsärzten ausgestellte Rezepte in meinem Nutzerkonto zu verwahren. Aus diesem Grund willige ich ein, dass Bloomwell GmbH alle von mir im Rahmen des medizinischen Fragebogens sowie auf anderem Weg mitgeteilten Kategorien besonderer personenbezogener Daten zur Verfügungstellung ihrer Leistungen verarbeitet.
          </p>
          <p className="mb-4">
            Ich kann diese Einwilligung jederzeit für die Zukunft widerrufen. In diesem Fall ist die Bloomwell GmbH über nicht mehr in der Lage ihre Leistungen zu erbringen. Die bis zum Widerruf erfolgte Verarbeitung bleibt rechtmäßig.
          </p>
          <p>
            Weitere Informationen finden sich in der Datenschutzerklärung (<a href="https://www.cannabisrezepte24.de/de/data-privacy" className="text-white hover:underline" target="_blank" rel="noopener noreferrer">https://www.cannabisrezepte24.de/de/data-privacy</a>).
          </p>
        </div>
        <div className="w-full text-secondary border border-1 border-secondary p-4 rounded-lg flex items-center justify-between mb-8">
          <span>Hiermit willige ich der Verarbeitung meiner besonderen personenbezogenen Daten ein</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={state.consent.accepted}
              onChange={() => setState(prev => ({ ...prev, consent: { accepted: !prev.consent.accepted } }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>
        <button
          onClick={() => {
            if (state.consent.accepted) {
              setState(prev => ({ ...prev, currentStep: 0 }));
            } else {
              showInfoToast(t('pleaseAcceptConsent'));
            }
          }}
          className="px-4 py-2 bg-secondary text-white rounded-lg w-full"
        >
          Weiter
        </button>
      </div>
    );
  };

  const renderQuestion = () => {
    const currentQuestion = questions[state.currentStep];
    const isMainConditionQuestion = state.currentStep === 1;

    if (state.showFollowUp) {
      if (state.currentStep === 2) {
        const followUpQuestions = state.responses[state.currentStep]?.answer === "Ja" 
          ? currentQuestion.followUpQuestions?.yes
          : currentQuestion.followUpQuestions?.no;

        const selectedAnswers = (state.responses[state.currentStep]?.subAnswer as string[]) || [];

        return (
          <>
            <h2 className="text-2xl font-semibold text-secondary mb-2">
              {followUpQuestions?.title}
            </h2>
            <div className="space-y-3">
              {followUpQuestions?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option.text)}
                  className={`w-full p-4 rounded-lg border ${
                    selectedAnswers.includes(option.text)
                      ? 'border-secondary bg-secondary/5'
                      : 'border-gray-200 hover:border-secondary'
                  } text-left flex items-center`}
                >
                  <div className={`w-5 h-5 border-2 mr-3 flex items-center justify-center
                    ${selectedAnswers.includes(option.text) ? 'border-secondary bg-secondary' : 'border-gray-300'}`}
                    style={{ borderRadius: '4px' }}
                  >
                    {selectedAnswers.includes(option.text) && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-medium text-secondary">{option.text}</p>
                    {option.subtext && (
                      <p className="text-sm text-gray-500">{option.subtext}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </>
        );
      } else {
        const selectedMainOption = questions[1].options.find(opt => opt.text === state.selectedOption);
        return (
          <>
            <h2 className="text-2xl font-semibold text-secondary mb-2">
              {selectedMainOption?.followUpQuestions?.title}
            </h2>
            <div className="space-y-3">
              {selectedMainOption?.followUpQuestions?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option.text)}
                  className={`w-full p-4 rounded-lg border ${
                    state.responses[state.currentStep]?.subAnswer === option.text
                      ? 'border-secondary bg-secondary/5'
                      : 'border-gray-200 hover:border-secondary'
                  } text-left flex items-center`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                    ${state.responses[state.currentStep]?.subAnswer === option.text ? 'border-secondary' : 'border-gray-300'}`}
                  >
                    {state.responses[state.currentStep]?.subAnswer === option.text && (
                      <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-medium text-secondary">{option.text}</p>
                    {option.subtext && (
                      <p className="text-sm text-gray-500">{option.subtext}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </>
        );
      }
    }

    return (
      <>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {isMainConditionQuestion ? 'Erkrankung(en)' : state.currentStep === 0 ? 'Patientenstatus' : 'Erkrankung(en)'}
        </h2>
        <div className="w-full text-gray-900">
          <p className="text-xl font-medium mb-2">{currentQuestion.text}</p>
          {currentQuestion.subtext && (
            <p className="text-sm text-gray-600 mb-6">{currentQuestion.subtext}</p>
          )}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div key={index}>
                <button
                  onClick={() => handleOptionSelect(option.text)}
                  className={`w-full p-4 rounded-lg border ${
                    state.responses[state.currentStep]?.answer === option.text
                      ? 'border-secondary bg-secondary/5'
                      : 'border-gray-200 hover:border-secondary'
                  } text-left flex items-center`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                    ${state.responses[state.currentStep]?.answer === option.text ? 'border-secondary' : 'border-gray-300'}`}
                  >
                    {state.responses[state.currentStep]?.answer === option.text && (
                      <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                    )}
                  </div>
                  {option.text}
                </button>
                {option.text === "Andere nicht aufgeführte Haupterkrankung" && 
                 state.responses[state.currentStep]?.answer === option.text && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={state.customInput}
                      onChange={handleCustomInputChange}
                      placeholder="Bitte geben Sie Ihre Erkrankung ein"
                      maxLength={255}
                      className="w-full p-4 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary"
                    />
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {state.customInput.length}/255
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center py-10 px-4 mx-auto">
      <ProgressBar 
        currentStep={state.currentStep + 2} 
        onClose={handleClose}
        onPrev={handlePrev}
      />

      {state.currentStep === -1 ? renderConsentStep() : (
        <div className="w-full max-w-2xl mt-8">
          {renderQuestion()}
          <div className="flex justify-end w-full mt-8">
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-secondary text-white rounded-lg flex items-center"
            >
              {state.currentStep === questions.length - 1 && !state.showFollowUp ? t("finish") : (
                <>
                  {t("next")}
                  <svg className="ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepQuestionnaire;
