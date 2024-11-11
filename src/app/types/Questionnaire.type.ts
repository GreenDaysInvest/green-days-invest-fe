interface Question {
    question: string;
    answer: string; 
}
  
export interface CreateQuestionnaireRequest {
    questions: Question[];
}