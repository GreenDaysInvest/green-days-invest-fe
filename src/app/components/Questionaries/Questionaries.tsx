"use client";
import { useAuth } from "@/app/context/AuthContext";
import QuestionnaireService from "@/app/services/questionnaireService";
import { showErrorToast, showInfoToast } from "@/app/utils/toast";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
  { id: 1, text: "What time do you usually go to bed?", options: ["Before 10 PM", "10-11 PM", "After 11 PM"] },
  { id: 2, text: "Do you wake up often during the night?", options: ["Yes", "No", "Sometimes"] },
  { id: 3, text: "How many hours of sleep do you get on average?", options: ["Less than 5", "5-7", "More than 7"] },
  { id: 4, text: "Do you have any recurring dreams or nightmares?", options: ["Yes", "No"] },
  { id: 5, text: "How would you rate your sleep quality?", options: ["Poor", "Average", "Good"] },
];

const StepQuestionnaire: React.FC = () => {
  const t = useTranslations("Dashboard");
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<{ question: string; answer: string }[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [questionnaireStatus, setQuestionnaireStatus] = useState<string>("");

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
        showErrorToast("Error checking questionnaire submission status");
        console.error("Error checking questionnaire submission status:", error);
      }
    };

    if (user?.id) checkQuestionnaireSubmission();
  }, [user?.id]);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOptionSelect = (option: string) => {
    const questionText = questions[currentStep].text;
    const updatedResponses = [...responses];
    updatedResponses[currentStep] = { question: questionText, answer: option };
    setResponses(updatedResponses);
  };

  const handleSubmit = async () => {
    const questionnaireData = { questions: responses };
    try {
      await QuestionnaireService.createQuestionnaire(questionnaireData);
      showInfoToast("Questionnaire submitted successfully!");
      setHasSubmitted(true);
    } catch (error) {
      showErrorToast("Error submitting questionnaire");
      console.error("Error submitting questionnaire:", error);
    }
  };

  if (questionnaireStatus === "accepted" || questionnaireStatus === "pending") {
    return (
      <div className="flex flex-col items-center py-10 px-4 max-w-lg mx-auto">
        <h2 className="text-3xl font-semibold text-secondary mb-20">{t("Sidebar.questionnaire")}</h2>
        <p className="text-xl text-secondary">{t("questionnaireSubmited")}</p>
      </div>
    );
  }

  if (questionnaireStatus === "declined") {
    return (
      <div className="flex flex-col items-center py-10 px-4 max-w-lg mx-auto">
        <h2 className="text-3xl font-semibold text-secondary mb-20">{t("Sidebar.questionnaires")}</h2>
        <p className="text-xl text-red-600 mb-4">{t("medicationDeclined")}</p>
        <p className="text-secondary mb-8">{t("pleaseStartAgain")}</p>
        {/* Render step form */}
        <div className="w-full text-secondary text-center">
          <p className="text-2xl font-medium mb-8">{questions[currentStep].text}</p>
          <div className="grid grid-cols-2 gap-4">
            {questions[currentStep].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`px-4 py-2 border rounded-lg ${
                  responses[currentStep]?.answer === option
                    ? "bg-secondary text-white"
                    : "border-secondary text-secondary hover:bg-green-100"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between w-full mt-8">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 disabled:opacity-50"
          >
            {t("previous")}
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-secondary text-white rounded-lg"
          >
            {currentStep === questions.length - 1 ? t("finish") : t("next")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10 px-4 max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold text-secondary mb-20">{t("Sidebar.questionnaires")}</h2>
      {/* Render step form */}
      <div className="w-full text-secondary text-center">
        <p className="text-2xl font-medium mb-8">{questions[currentStep].text}</p>
        <div className="grid grid-cols-2 gap-4">
          {questions[currentStep].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`px-4 py-2 border rounded-lg ${
                responses[currentStep]?.answer === option
                  ? "bg-secondary text-white"
                  : "border-secondary text-secondary hover:bg-green-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between w-full mt-8">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 disabled:opacity-50"
        >
          {t("previous")}
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-secondary text-white rounded-lg"
        >
          {currentStep === questions.length - 1 ? t("finish") : t("next")}
        </button>
      </div>
    </div>
  );
};

export default StepQuestionnaire;
