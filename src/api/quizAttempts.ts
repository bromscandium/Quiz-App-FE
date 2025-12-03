import { Endpoints } from '@constants/endpoints';
import { ParamsInterfaces, QuizAttemptInterfaces } from '@interfaces';

import api from '@libs/axios/axios';

export const createQuizAttempt = (
  data: QuizAttemptInterfaces.QuizAttemptCreate
) =>
  api.post<QuizAttemptInterfaces.QuizAttemptSchema>(
    Endpoints.QuizAttempts.create,
    data
  );

export const readQuizAttemptById = (id: string, userId: string) =>
  api.get<QuizAttemptInterfaces.QuizAttemptSchema>(
    Endpoints.QuizAttempts.byId(id, userId)
  );

export const readUserQuizAttempts = (
  params: ParamsInterfaces.paginationRequest
) =>
  api.get<QuizAttemptInterfaces.QuizAttemptsList>(Endpoints.QuizAttempts.user, {
    params,
  });

export const readCompanyQuizAttempts = (
  companyId: string,
  quizId: string | null,
  params: ParamsInterfaces.paginationRequest
) =>
  api.get<QuizAttemptInterfaces.QuizAttemptsList>(
    Endpoints.QuizAttempts.company,
    {
      params: {
        company_id: companyId,
        quiz_id: quizId,
        ...params,
      },
    }
  );
