import { Endpoints } from '@constants/endpoints';
import { StatsInterfaces } from '@interfaces';

import api from '@libs/axios/axios';

export const readUserStats = (params: StatsInterfaces.UserStatsParams) =>
  api.get<StatsInterfaces.UserStats>(Endpoints.Stats.user, { params });

export const readUserStatsQuizzes = (params: StatsInterfaces.UserStatsParams) =>
  api.get<StatsInterfaces.UserStatsQuizzesList>(Endpoints.Stats.userQuizzes, {
    params,
  });

export const readUserStatsLastAttempts = (
  params: StatsInterfaces.UserStatsParams
) =>
  api.get<StatsInterfaces.UserLastAttemptsList>(
    Endpoints.Stats.userLastAttempts,
    { params }
  );

export const readCompanyUsersStats = (
  companyId: string,
  params: StatsInterfaces.CompanyStatsParams
) =>
  api.get<StatsInterfaces.CompanyUserStatsList>(
    Endpoints.Stats.companyUsers(companyId),
    { params }
  );

export const readCompanyUserQuizzesStats = (
  companyId: string,
  userId: string,
  params: StatsInterfaces.CompanyStatsParams
) =>
  api.get<StatsInterfaces.CompanyUserQuizStatsList>(
    Endpoints.Stats.companyUserQuizzes(companyId, userId),
    { params }
  );

export const readCompanyUsersLastAttempts = (companyId: string) =>
  api.get<StatsInterfaces.CompanyUserLastAttemptsList>(
    Endpoints.Stats.companyLastAttempts(companyId)
  );
