import { User } from "./Auth.type";

export interface QuestionOption {
  text: string;
  subtext?: string;
  hasFollowUp?: boolean;
  hasInput?: boolean;
  followUpQuestions?: {
    title: string;
    type?: string;
    options: QuestionOption[];
  };
}

export interface Question {
  id: number;
  text: string;
  type: 'radio' | 'checkbox' | 'textarea';
  options?: QuestionOption[];
  placeholder?: string;
  maxLength?: number;
  subtext?: string;
  followUpQuestions?: {
    yes?: {
      title: string;
      type: string;
      options: QuestionOption[];
    };
    no?: {
      title: string;
      type: string;
      options: QuestionOption[];
    };
  };
  confirmation?: {
    title: string;
    text: string;
    buttonText: string;
  };
}

export interface Response {
  answer?: string;
  subAnswer?: string | string[];
  customInput?: string;
  [key: string]: any; // Allow dynamic keys for follow-up answers
}

export interface QuestionnaireState {
  currentStep: number;
  responses: { [key: number]: Response };
  hasSubmitted: boolean;
  questionnaireStatus: string;
  consent: { accepted: boolean };
  showFollowUp: boolean;
  showFollowUpQuestions: boolean;
  selectedOption: string | null;
  customInput: string;
  selectedOptions: string[];
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
