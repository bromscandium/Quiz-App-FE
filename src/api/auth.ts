import api from '@libs/axios/axios';
import {Endpoints} from '@enums/endpoints';
import {
	LoginRequest,
	TokenRequest,
	TokenResponse,
	UserResponse,
} from '@schemas/auth';

export const login = (data: LoginRequest) =>
	api.post<TokenResponse>(Endpoints.Auth.login, data);

export const refresh = (data: TokenRequest) =>
	api.post<TokenResponse>(Endpoints.Auth.refresh, data);

export const logout = (data: TokenRequest) =>
	api.post<void>(Endpoints.Auth.logout, data);

export const me = () => api.get<UserResponse>(Endpoints.Auth.me);
