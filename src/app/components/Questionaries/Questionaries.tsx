"use client";
import { useAuth } from "@/app/context/AuthContext";
import QuestionnaireService from "@/app/services/questionnaireService";
import { showErrorToast, showInfoToast } from "@/app/utils/toast";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

interface Question {
  id: number;
  text: string;
  subtext?: string;
  options: Array<{
    text: string;
    subtext?: string;
    followUpQuestions?: {
      title: string;
      options: Array<{
        text: string;
        subtext?: string;
      }>;
    };
    hasInput?: boolean;
  }>;
  type: 'radio' | 'checkbox';
  followUpQuestions?: {
    yes: {
      title: string;
      type: 'checkbox';
      options: Array<{
        text: string;
        subtext?: string;
      }>;
    };
    no: {
      title: string;
      type: 'checkbox';
      options: Array<{
        text: string;
        subtext?: string;
      }>;
    };
  };
}

interface Response {
  answer?: string;
  subAnswer?: string | string[];
  customInput?: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Wurdest du bereits mit med. Cannabis durch eine Verschreibung von einem Arzt behandelt?",
    subtext: "Bitte aktuelles Rezept oder sonstigen Nachweis bereit halten.",
    options: [{ text: "Ja" }, { text: "Nein" }],
    type: 'radio'
  },
  {
    id: 2,
    text: "In welche Kategorie gehört deine Haupterkrankung oder falls deine Erkrankung nicht aufgeführt ist dein Hauptsymptom?",
    subtext: "Wenn du nicht sicher bist oder falsch gewählt hast, kannst du im Folgenden jederzeit zurückkehren und die Kategorie korrigieren.",
    options: [
      {
        text: "Chronische Schmerzen",
        followUpQuestions: {
          title: "Chronische Schmerzen",
          options: [
            { text: "Rückenschmerzen", subtext: "(z. B. Bandscheibenvorfall, Skoliose, Bechterewsche Krankheit)" },
            { text: "Gelenkschmerzen", subtext: "(z. B. Arthrose, Arthritis, Rheuma, Gicht)" },
            { text: "Nervenschmerzen", subtext: "(z. B. Neuropathie)" },
            { text: "Bauchschmerzen", subtext: "(z. B. Endometriose)" }
          ]
        }
      },
      {
        text: "Migräne/Kopfschmerzsyndrom",
        followUpQuestions: {
          title: "Migräne/Kopfschmerzsyndrom",
          options: [
            { text: "Migräne" },
            { text: "Chronischer Kopfschmerz", subtext: "(z. B. Spannungskopfschmerz)" },
            { text: "Clusterkopfschmerz" }
          ]
        }
      },
      {
        text: "AD(H)S",
        followUpQuestions: {
          title: "AD(H)S",
          options: [
            { text: "Aktivitäts- und Aufmerksamkeitsstörung (ADHS)" },
            { text: "Aufmerksamkeitsstörung ohne Hyperaktivität (ADS)" },
            { text: "Hyperkinetische Störung des Sozialverhaltens" }
          ]
        }
      },
      {
        text: "Schlafstörung",
        followUpQuestions: {
          title: "Schlafstörung",
          options: [
            { text: "Ein- und/oder Durchschlafstörungen" },
            { text: "Störung des Tag-Nacht-Rhythmus" },
            { text: "Nachtangst/Nachtträume" }
          ]
        }
      },
      {
        text: "Depression",
        followUpQuestions: {
          title: "Depression",
          options: [
            { text: "Depressive Episode" },
            { text: "Anhaltende Depression" },
            { text: "Wiederkehrende Depression" }
          ]
        }
      },
      {
        text: "Angststörung/PTBS",
        followUpQuestions: {
          title: "Angststörung/PTBS",
          options: [
            { text: "Angststörung" },
            { text: "Posttraumatische Belastungsstörung (PTBS)" },
            { text: "Anpassungsstörung" }
          ]
        }
      },
      {
        text: "Nervensystem-Erkrankung",
        followUpQuestions: {
          title: "Nervensystem-Erkrankung",
          options: [
            { text: "Multiple Sklerose/Spastik" },
            { text: "Paraplegie/Lähmungserscheinungen" },
            { text: "Epilepsie/Morbus Parkinson" },
            { text: "Restless-Legs-Syndrom" }
          ]
        }
      },
      {
        text: "Chronisch-entzündliche Darmerkrankungen",
        followUpQuestions: {
          title: "Chronisch-entzündliche Darmerkrankungen",
          options: [
            { text: "Morbus Crohn/Colitis ulcerosa" },
            { text: "Reizdarmsyndrom" },
            { text: "Chronische Magenschleimhautentzündung", subtext: "(chronische Gastritis)" }
          ]
        }
      },
      {
        text: "Hauterkrankungen",
        followUpQuestions: {
          title: "Hauterkrankungen",
          options: [
            { text: "Neurodermititis" },
            { text: "Psoriasis", subtext: "(Schuppenflechte)" },
            { text: "Akne Inversa" }
          ]
        }
      },
      {
        text: "Krebserkrankung",
        followUpQuestions: {
          title: "Krebserkrankung",
          options: [
            { text: "Brustkrebs" },
            { text: "Prostatakrebs" },
            { text: "Darmkrebs" },
            { text: "Lungenkrebs" },
            { text: "Hautkrebs" },
            { text: "Anderer Krebs" }
          ]
        }
      },
      { 
        text: "Andere nicht aufgeführte Haupterkrankung", 
        hasInput: true 
      }
    ],
    type: 'radio'
  },
  {
    id: 3,
    text: "Leidest du neben deiner Haupterkrankung an weiteren Krankheiten oder Allergien?",
    options: [{ text: "Ja" }, { text: "Nein" }],
    type: 'radio',
    followUpQuestions: {
      yes: {
        title: "Wähle die Art deiner Erkrankung(en)",
        type: 'checkbox',
        options: [
          { text: "Allergien" },
          { text: "Chronische Schmerzen" },
          { text: "Migräne/Kopfschmerzsyndrome" },
          { text: "Psychiatrische Erkrankungen" },
          { text: "Nervensystem-Erkrankungen" },
          { text: "Herz-Kreislauf-/Lungenerkrankungen" },
          { text: "Verdauungstrakterkrankungen/Stoffwechselstörungen" },
          { text: "Infektionskrankheiten" },
          { text: "Krebserkrankung" }
        ]
      },
      no: {
        title: "Bitte bestätige an keiner der folgenden Erkrankungen zu leiden ODER wähle die Erkrankung aus, sofern Sie auf dich zutrifft.",
        type: 'checkbox',
        options: [
          { text: "Hiermit bestätige ich an keiner der genannten Erkrankungen zu leiden" },
          { 
            text: "Psychose",
            subtext: "(Schizophrenie, Wahnvorstellungen, Halluzinationen)"
          },
          {
            text: "Persönlichkeitsstörung",
            subtext: "(z. B. Borderline)"
          },
          { text: "Bipolare Störung" },
          { text: "Suchterkrankung" },
          { text: "Koronare Herzkrankheit, Herzinsuffizienz, Herzrhythmusstörung" },
          { text: "Herzinfarkt, Schlaganfall, Thrombose/Embolie" },
          { text: "Schwere Leber- oder Nierenerkrankung" },
          { text: "Allergie gegen THC/CBD-haltige Produkte" }
        ]
      }
    }
  }
];

const StepQuestionnaire: React.FC = () => {
  const t = useTranslations("Dashboard");
  const tNotifications = useTranslations('Notifications');
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(-1);
  const [responses, setResponses] = useState<{ [key: number]: Response }>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [questionnaireStatus, setQuestionnaireStatus] = useState<string>("");
  const [consent, setConsent] = useState({ accepted: false });
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const totalSteps = questions.length;

  useEffect(() => {
    const checkQuestionnaireSubmission = async () => {
      try {
        const userQuestionnaires = await QuestionnaireService.getUserQuestionnaires(String(user?.id));
        const latestStatus = userQuestionnaires.slice(-1)[0]?.status || "";
        setQuestionnaireStatus(latestStatus);
        if (userQuestionnaires.length > 0) {
          setHasSubmitted(true);
        }
      } catch (error) {
        showErrorToast(tNotifications('errorQuestionnaireStatus'));
        console.error("Error checking questionnaire submission status:", error);
      }
    };

    if (user?.id) checkQuestionnaireSubmission();
  }, [user?.id]);

  const handleOptionSelect = (optionText: string) => {
    if (currentStep === 2 && showFollowUp) {
      const currentResponse = responses[currentStep] || {};
      const currentSelections = currentResponse.subAnswer as string[] || [];
      
      if (currentSelections.includes(optionText)) {
        const newSelections = currentSelections.filter(item => item !== optionText);
        setResponses({
          ...responses,
          [currentStep]: {
            ...currentResponse,
            answer: responses[currentStep]?.answer,
            subAnswer: newSelections
          }
        });
        setSelectedOptions(newSelections);
      } else {
        const newSelections = [...currentSelections, optionText];
        setResponses({
          ...responses,
          [currentStep]: {
            ...currentResponse,
            answer: responses[currentStep]?.answer,
            subAnswer: newSelections
          }
        });
        setSelectedOptions(newSelections);
      }
    } else {
      setResponses({
        ...responses,
        [currentStep]: {
          answer: optionText,
          subAnswer: []  
        }
      });
      setSelectedOption(optionText);
      setSelectedOptions([]);  
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomInput(value);
    
    const updatedResponses = { ...responses };
    updatedResponses[currentStep] = {
      ...updatedResponses[currentStep],
      customInput: value
    };
    setResponses(updatedResponses);
  };

  const handleNext = () => {
    if (responses[currentStep]?.answer === "Andere nicht aufgeführte Haupterkrankung" && !customInput) {
      return;
    }

    if (currentStep === 2) {
      const answer = responses[currentStep].answer;
      if (answer === "Ja" || answer === "Nein") {
        setShowFollowUp(true);
        setSelectedOption(answer);
      }
    } else if (showFollowUp) {
      setShowFollowUp(false);
      setSelectedOption(null);
      setCurrentStep(currentStep + 1);
    } else {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrev = () => {
    if (showFollowUp) {
      setShowFollowUp(false);
      setSelectedOption(null);
    } else if (currentStep >= 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const questionnaireData = { questions: Object.values(responses) };
    try {
      await QuestionnaireService.createQuestionnaire(questionnaireData);
      showInfoToast(tNotifications('questionnaireSubmitedSuccesfully'));
      setHasSubmitted(true);
    } catch (error) {
      showErrorToast(tNotifications('errorSubmitingQuestionnaire'));
      console.error("Error submitting questionnaire:", error);
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
              checked={consent.accepted}
              onChange={() => setConsent({ accepted: !consent.accepted })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>
        <button
          onClick={() => {
            if (consent.accepted) {
              setCurrentStep(0);
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
    const currentQuestion = questions[currentStep];
    const isMainConditionQuestion = currentStep === 1;

    if (showFollowUp) {
      if (currentStep === 2) {
        const followUpQuestions = responses[currentStep]?.answer === "Ja" 
          ? currentQuestion.followUpQuestions?.yes
          : currentQuestion.followUpQuestions?.no;

        const selectedAnswers = (responses[currentStep]?.subAnswer as string[]) || [];

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
        const selectedMainOption = questions[1].options.find(opt => opt.text === selectedOption);
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
                    responses[currentStep]?.subAnswer === option.text
                      ? 'border-secondary bg-secondary/5'
                      : 'border-gray-200 hover:border-secondary'
                  } text-left flex items-center`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                    ${responses[currentStep]?.subAnswer === option.text ? 'border-secondary' : 'border-gray-300'}`}
                  >
                    {responses[currentStep]?.subAnswer === option.text && (
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
          {isMainConditionQuestion ? 'Erkrankung(en)' : currentStep === 0 ? 'Patientenstatus' : 'Erkrankung(en)'}
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
                    responses[currentStep]?.answer === option.text
                      ? 'border-secondary bg-secondary/5'
                      : 'border-gray-200 hover:border-secondary'
                  } text-left flex items-center`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                    ${responses[currentStep]?.answer === option.text ? 'border-secondary' : 'border-gray-300'}`}
                  >
                    {responses[currentStep]?.answer === option.text && (
                      <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                    )}
                  </div>
                  {option.text}
                </button>
                {option.text === "Andere nicht aufgeführte Haupterkrankung" && 
                 responses[currentStep]?.answer === option.text && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={customInput}
                      onChange={handleCustomInputChange}
                      placeholder="Bitte geben Sie Ihre Erkrankung ein"
                      maxLength={255}
                      className="w-full p-4 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary"
                    />
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {customInput.length}/255
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
      <div className="flex items-center justify-between w-full max-w-2xl mb-8">
        <button onClick={handlePrev} className="text-secondary">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex items-center space-x-4">
          <div className={`flex items-center ${currentStep === -1 ? 'text-secondary' : 'text-gray-400'}`}>
            <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">1</div>
            <span className="ml-2">Datenschutz</span>
          </div>
          <div className="w-8 h-1 bg-gray-300"></div>
          <div className={`flex items-center ${currentStep === 0 ? 'text-secondary' : 'text-gray-400'}`}>
            <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center">2</div>
            <span className="ml-2">Patientenstatus</span>
          </div>
          <div className="w-8 h-1 bg-gray-300"></div>
          <div className={`flex items-center ${currentStep >= 1 ? 'text-secondary' : 'text-gray-400'}`}>
            <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center">3</div>
            <span className="ml-2">Erkrankung(en)</span>
          </div>
        </div>
        <button onClick={() => {}} className="text-secondary">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {currentStep === -1 ? renderConsentStep() : (
        <div className="w-full max-w-2xl">
          {renderQuestion()}
          <div className="flex justify-end w-full mt-8">
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-secondary text-white rounded-lg flex items-center"
            >
              {currentStep === questions.length - 1 && !showFollowUp ? t("finish") : (
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
