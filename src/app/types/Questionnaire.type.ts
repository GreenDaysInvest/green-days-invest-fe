import { User } from "./Auth.type";

export interface QuestionOption {
  text: string;
  subtext?: string;
  hasFollowUp?: boolean;
  hasDifferentUi?: boolean;
  hasInput?: boolean;
  inputType?: 'text' | 'number' | 'percentage';
  inputPlaceholder?: string;
  hasSubQuestions?: boolean;
  redirectToOtherDiseases?: boolean;
}

export interface Question {
  id: number;
  text: string;
  type: 'radio' | 'checkbox' | 'textarea' | 'confirmation';
  options?: QuestionOption[];
  isAlternativeFlow?: boolean;
  isOptional?: boolean;
  getDynamicOptions?: (selectedOption: string) => QuestionOption[];
}

export interface SubQuestion {
  text: string;
  options: Array<{
    text: string;
    subtext?: string;
    hasInput?: boolean;
  }>;
}

export interface QuestionnaireResponse {
  answer: string | string[];
  customInput?: string;
  subResponses?: {
    [key: string]: {
      answers: string[];
      inputValue?: string | number;
    };
  };
  inputValue?: string | number;
}

export interface QuestionnaireState {
  currentStep: number;
  responses: {
    [key: number]: QuestionnaireResponse;
  };
  selectedOption: string | null;
  customInput: string;
  isAlternativeFlow: boolean;
  selectedOptions: any[];
  currentSubQuestion?: string;
  showingSubQuestions: boolean;
  stepHistory: number[]
}

export interface CreateQuestionnaireRequest {
  questions: {
    question: string;
    answer: string | string[];
  }[]
}

export interface Questionnaire {
  id: string;
  user: User;
  questions: {
    question: string;
    answer: string | string[];
  }[];
  status: string;
  createdAt?: Date;
}
