import { Endpoints } from '@constants/endpoints';
import { ParamsInterfaces, QuizInterfaces } from '@interfaces';

import api from '@libs/axios/axios';

export const createQuiz = (
  data: QuizInterfaces.QuizCreate,
  questionsData: {
    questions: Array<{
      title: string;
      answer_options: Array<{
        text: string;
        is_correct: boolean;
      }>;
    }>;
  }
) =>
  api.post<QuizInterfaces.QuizSchema>(Endpoints.Quizzes.create, {
    data: data,
    questions_data: questionsData,
  });

export const readQuizById = (id: string) =>
  api.get<QuizInterfaces.QuizSchema>(Endpoints.Quizzes.byId(id));

export const readCompanyQuizzes = (
  companyId: string,
  params: ParamsInterfaces.paginationRequest
) =>
  api.get<QuizInterfaces.QuizList>(Endpoints.Quizzes.byCompany(companyId), {
    params,
  });

export const updateQuiz = (id: string, data: QuizInterfaces.QuizUpdate) =>
  api.put<QuizInterfaces.QuizSchema>(Endpoints.Quizzes.update(id), data);

export const deleteQuiz = (id: string) =>
  api.delete<void>(Endpoints.Quizzes.delete(id));
