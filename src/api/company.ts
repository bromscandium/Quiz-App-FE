import { Endpoints } from '@constants/endpoints';
import { ParamsInterfaces, CompanyInterfaces } from '@interfaces';

import api from '@libs/axios/axios';


export const createCompany = (data: CompanyInterfaces.CompanyCreate) =>
  api.post<CompanyInterfaces.CompanySchema>(Endpoints.Companies.create, data);

export const readCompanyById = (id: string) =>
  api.get<CompanyInterfaces.CompanySchema>(Endpoints.Companies.byId(id));

export const readAllCompanies = (params: ParamsInterfaces.paginationRequest) =>
  api.get<CompanyInterfaces.CompaniesList>(Endpoints.Companies.all, {
    params: params,
  });

export const updateCompany = (
  id: string,
  data: CompanyInterfaces.CompanyUpdate
) =>
  api.put<CompanyInterfaces.CompanySchema>(
    Endpoints.Companies.update(id),
    data
  );

export const deleteCompany = (id: string) =>
  api.delete<void>(Endpoints.Companies.delete(id));