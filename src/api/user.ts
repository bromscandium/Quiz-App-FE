import { Endpoints } from '@constants/endpoints';
import { UserInterfaces } from '@interfaces';

import api from '@libs/axios/axios';

export const createUser = (data: UserInterfaces.UserCreate) =>
  api.post<UserInterfaces.UserSchema>(Endpoints.Users.create, data);

export const readUserById = (id: string) =>
  api.get<UserInterfaces.UserSchema>(Endpoints.Users.byId(id));

export const readUserByEmail = (email: string) =>
  api.get<UserInterfaces.UserSchema>(Endpoints.Users.byEmail(email));

export const readUserByNickname = (nickname: string) =>
  api.get<UserInterfaces.UserSchema>(Endpoints.Users.byNickname(nickname));

export const readAllUsers = (offset = 0, limit = 20) =>
  api.get<UserInterfaces.UsersList>(Endpoints.Users.all, {
    params: { offset, limit },
  });

export const updateUser = (id: string, data: UserInterfaces.UserUpdate) =>
  api.put<UserInterfaces.UserSchema>(Endpoints.Users.update(id), data);

export const deleteUser = (id: string) =>
  api.delete<void>(Endpoints.Users.delete(id));

export const readUserCompanies = (id: string, offset: number, limit: number) =>
  api.get<UserInterfaces.UserOwnedCompaniesList>(
    Endpoints.Users.companies(id),
    {
      params: { offset, limit },
    }
  );
