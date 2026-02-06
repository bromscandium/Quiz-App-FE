export interface AnswerOptionSchema {
  id: string;
  question_id: string;
  text: string;
  is_correct: boolean;
  created_at: string;
  updated_at: string;
}

export interface AnswerOptionCreate {
  text: string;
  is_correct: boolean;
}

export interface AnswerOptionUpdate {
  id?: string;
  text: string;
  is_correct: boolean;
}
