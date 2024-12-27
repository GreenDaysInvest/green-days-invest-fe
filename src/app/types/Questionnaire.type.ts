import { User } from "./Auth.type";

export interface Question {
  id: number;
  text: string;
  type: 'radio' | 'checkbox' | 'textarea' | 'confirmation';
  options?: Array<{
    text: string;
    subtext?: string;
    hasInput?: boolean;
    hasFollowUp?: boolean;
    hasSubQuestions?: boolean;
    redirectToConfirmation?: boolean;
  }>;
  isAlternativeFlow?: boolean;
}

export interface SubQuestion {
  text: string;
  options: Array<{
    text: string;
    subtext?: string;
    hasInput?: boolean;
  }>;
}

export interface Response {
  answer: string | string[];
  customInput?: string;
}

export interface QuestionnaireState {
  currentStep: number;
  responses: {
    [key: number]: {
      answer: string | string[];
      customInput?: string;
      subResponses?: {
        [key: string]: {
          answers: string[];
          customInput?: string;
        };
      };
    };
  };
  selectedOption: string | null;
  customInput: string;
  isAlternativeFlow: boolean;
  selectedOptions: any[];
  currentSubQuestion?: string;
}

export interface CreateQuestionnaireRequest {
  questions: Question[];
}

export interface Questionnaire {
  id: string;
  user: User;
  questions: Question[];
  status: string;
}
