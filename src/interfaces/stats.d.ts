export interface UserStats {
  user_id: string;
  company_id?: string | null;
  total_correct_answers: number;
  total_answered_questions: number;
  average_score: number;
  last_attempt_at?: string | null;
  start_date?: string | null;
  end_date?: string | null;
}

export interface UserQuizStats {
  quiz_id: string;
  quiz_title: string;
  average_score: number;
  attempts_count: number;
  last_attempt_at: string;
}

export interface UserStatsQuizzesList {
  user_attempts: UserQuizStats[];
}

export interface UserLastAttempt {
  quiz_id: string;
  quiz_title: string;
  last_attempt_at: string;
}

export interface UserLastAttemptsList {
  user_attempts: UserLastAttempt[];
}

export interface CompanyUserStats {
  user_id: string;
  user_name: string;
  average_score: number;
  total_attempts: number;
  last_attempt_at?: string | null;
}

export interface CompanyUserStatsList {
  user_stats: CompanyUserStats[];
}

export interface CompanyUserQuizStats {
  quiz_id: string;
  quiz_title: string;
  average_score: number;
  attempts_count: number;
  last_attempt_at?: string | null;
}

export interface CompanyUserQuizStatsList {
  quiz_stats: CompanyUserQuizStats[];
}

export interface CompanyUserLastAttempt {
  user_id: string;
  user_name: string;
  last_attempt_at?: string | null;
}

export interface CompanyUserLastAttemptsList {
  user_attempts: CompanyUserLastAttempt[];
}

export interface UserStatsParams {
  user_id?: string;
  company_id?: string;
  quiz_id?: string;
  start_date?: string;
  end_date?: string;
}

export interface CompanyStatsParams {
  start_date?: string;
  end_date?: string;
}
