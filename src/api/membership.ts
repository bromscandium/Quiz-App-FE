import { Endpoints } from '@constants/endpoints';
import { Roles } from '@enums';
import { MembershipInterfaces, ParamsInterfaces } from '@interfaces';

import api from '@libs/axios/axios';

export const createMembership = (data: MembershipInterfaces.MembershipCreate) =>
  api.post<MembershipInterfaces.MembershipSchema>(
    Endpoints.Membership.create,
    data
  );

export const readMembershipById = (id: string) =>
  api.get<MembershipInterfaces.MembershipSchema>(Endpoints.Membership.byId(id));

export const readUserMemberships = (
  params: ParamsInterfaces.paginationRequest
) =>
  api.get<MembershipInterfaces.UserMembershipsList>(Endpoints.Membership.user, {
    params,
  });

export const readCompanyMembers = (
  company_id: string,
  params: ParamsInterfaces.paginationRequest & { roles?: Roles[] }
) =>
  api.get<MembershipInterfaces.CompanyMembershipsList>(
    Endpoints.Membership.company(company_id),
    { params }
  );

export const updateMembership = (
  id: string,
  data: MembershipInterfaces.MembershipUpdate
) =>
  api.put<MembershipInterfaces.MembershipSchema>(
    Endpoints.Membership.update(id),
    data
  );

export const deleteMembership = (id: string) =>
  api.delete<void>(Endpoints.Membership.delete(id));
