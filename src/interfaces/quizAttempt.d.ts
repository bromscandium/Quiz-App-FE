import { CompanySchema } from './company';
import { UserSchema } from './user';
import { UserAnswerCreate, UserAnswerSchema } from './user_answer';

export interface QuizAttemptSchema {
  id: string;
  user_id: string;
  company_id: string;
  quiz_id: string;
  correct_answers: number;
  total_questions: number;
  user_answers: UserAnswerSchema[];
  user?: UserSchema;
  company?: CompanySchema;
  quiz?: QuizSchema;
  created_at: string;
  updated_at: string;
}

export interface QuizAttemptCreate {
  quiz_id: string;
  company_id: string;
  user_answers: UserAnswerCreate[];
}

export interface QuizAttemptsList {
  quiz_attempts: QuizAttemptSchema[];
  total: number;
}
