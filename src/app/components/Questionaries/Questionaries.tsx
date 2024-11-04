"use client";
import { useState } from "react";

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
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOptionSelect = (option: string) => {
    setResponses({
      ...responses,
      [questions[currentStep].id]: option,
    });
  };

  return (
    <div className="flex flex-col items-center py-10 px-4 max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold text-secondary mb-20">Questionnaire</h2>
      
      <div className="w-full text-secondary text-center">
        <p className="text-2xl font-medium mb-8">{questions[currentStep].text}</p>
        <div className="grid grid-cols-2 gap-4">
          {questions[currentStep].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`px-4 py-2 border rounded-lg ${
                responses[questions[currentStep].id] === option
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
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === questions.length - 1}
          className="px-4 py-2 bg-secondary text-white rounded-lg"
        >
          {currentStep === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default StepQuestionnaire;
