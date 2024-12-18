import { User } from "./Auth.type";

export interface QuestionOption {
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
}

export interface Question {
  id: number;
  text: string;
  subtext?: string;
  options: QuestionOption[];
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

export interface Response {
  answer?: string;
  subAnswer?: string | string[];
  customInput?: string;
}

export interface QuestionnaireState {
  currentStep: number;
  responses: { [key: number]: Response };
  hasSubmitted: boolean;
  questionnaireStatus: string;
  consent: { accepted: boolean };
  showFollowUp: boolean;
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
