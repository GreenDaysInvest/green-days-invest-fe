import { User } from "./Auth.type";

interface Question {
    question: string;
    answer: string; 
    status?: string;
}
  
export interface CreateQuestionnaireRequest {
    questions: Question[];
}
export interface Questionnaire {
  id: string;
  user: User;
  questions: { question: string; answer: string }[];
  status: string;
}
