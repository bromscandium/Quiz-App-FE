import {
  AnswerOptionCreate,
  AnswerOptionSchema,
  AnswerOptionUpdate,
} from './answer_option';

export interface QuestionSchema {
  id: string;
  quiz_id: string;
  title: string;
  answer_options: AnswerOptionSchema[];
  created_at: string;
  updated_at: string;
}

export interface QuestionCreate {
  title: string;
  answer_options: AnswerOptionCreate[];
}

export interface QuestionsListCreate {
  questions: QuestionCreate[];
}

export interface QuestionUpdate {
  id?: string;
  title: string;
  answer_options: AnswerOptionUpdate[];
}
