import { Endpoints } from '@constants/endpoints';
import { ExportInterfaces } from '@interfaces';

import api from '@libs/axios/axios';

export const exportMyResults = async (
  params: ExportInterfaces.ExportMyResultsParams
) => {
  const response = await api.get<Blob>(Endpoints.Export.myResults, {
    params,
    responseType: 'blob',
  });
  return response.data;
};

export const exportCompanyUserResults = async (
  params: ExportInterfaces.ExportCompanyUserParams
) => {
  const { company_id, user_id, ...queryParams } = params;
  const response = await api.get<Blob>(
    Endpoints.Export.companyUser(company_id, user_id),
    {
      params: queryParams,
      responseType: 'blob',
    }
  );
  return response.data;
};

export const exportCompanyAllResults = async (
  params: ExportInterfaces.ExportCompanyAllParams
) => {
  const { company_id, ...queryParams } = params;
  const response = await api.get<Blob>(
    Endpoints.Export.companyAll(company_id),
    {
      params: queryParams,
      responseType: 'blob',
    }
  );
  return response.data;
};

export const exportCompanyQuizResults = async (
  params: ExportInterfaces.ExportCompanyQuizParams
) => {
  const { company_id, quiz_id, ...queryParams } = params;
  const response = await api.get<Blob>(
    Endpoints.Export.companyQuiz(company_id, quiz_id),
    {
      params: queryParams,
      responseType: 'blob',
    }
  );
  return response.data;
};
