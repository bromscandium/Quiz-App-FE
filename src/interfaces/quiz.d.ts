import { QuestionSchema, QuestionUpdate } from './question';

export interface QuizSchema {
  id: string;
  company_id: string;
  title: string;
  description?: string;
  frequency: number;
  questions: QuestionSchema[];
  created_at: string;
  updated_at: string;
}

export interface QuizCreate {
  company_id: string;
  title: string;
  description?: string;
}

export interface QuizUpdate {
  title?: string;
  description?: string;
  frequency?: number;
  questions?: QuestionUpdate[];
}

export interface QuizList {
  quizzes: QuizSchema[];
  total: number;
}
