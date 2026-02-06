import { Endpoints } from '@constants/endpoints';
import { ActionStatuses, ActionTypes } from '@enums';
import { CompanyActionsInterfaces, ParamsInterfaces } from '@interfaces';

import api from '@libs/axios/axios';

export const createCompanyActions = (
  data: CompanyActionsInterfaces.CompanyActionCreate
) =>
  api.post<CompanyActionsInterfaces.CompanyActionSchema>(
    Endpoints.CompanyActions.create,
    data
  );

export const readCompanyActionsById = (id: string) =>
  api.get<CompanyActionsInterfaces.CompanyActionSchema>(
    Endpoints.CompanyActions.byId(id)
  );

export const readAllCompanyActions = (
  params: ParamsInterfaces.paginationRequest & {
    action_type?: ActionTypes;
    company_id?: string;
    status?: ActionStatuses;
  }
) =>
  api.get<CompanyActionsInterfaces.CompanyActionsList>(
    Endpoints.CompanyActions.all,
    { params }
  );

export const updateCompanyActions = (
  id: string,
  data: CompanyActionsInterfaces.CompanyActionUpdate
) =>
  api.put<CompanyActionsInterfaces.CompanyActionSchema>(
    Endpoints.CompanyActions.update(id),
    data
  );

export const deleteCompanyActions = (id: string) =>
  api.delete<void>(Endpoints.CompanyActions.delete(id));
