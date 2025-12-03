export interface UserAnswerSchema {
  id: string;
  quiz_attempt_id: string;
  question_id: string;
  answer_option_id: string;
  is_correct: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserAnswerCreate {
  question_id: string;
  answer_option_id: string;
}
