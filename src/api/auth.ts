import { Endpoints } from '@constants/endpoints';
import { AuthInterfaces, UserInterfaces } from '@interfaces';

import api from '@libs/axios/axios';

export const login = (data: AuthInterfaces.LoginRequest) =>
  api.post<AuthInterfaces.TokenResponse>(Endpoints.Auth.login, data);

export const refresh = (data: AuthInterfaces.TokenRequest) =>
  api.post<AuthInterfaces.TokenResponse>(Endpoints.Auth.refresh, data);

export const logout = (data: AuthInterfaces.TokenRequest) =>
  api.post<void>(Endpoints.Auth.logout, data);

export const me = () => api.get<UserInterfaces.UserSchema>(Endpoints.Auth.me);
