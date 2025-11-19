import api from '@libs/axios/axios';
import {Endpoints} from '@enums/endpoints';
import {UserSchema, UserCreate} from '@schemas/users';

export const create = (data: UserCreate) =>
	api.post<UserSchema>(Endpoints.Users.create, data);
