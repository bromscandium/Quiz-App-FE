import apiBackend from '@libs/axios/axios';
import { Endpoints } from '@enums/endpoints';

export const getHealthCheck = () =>
    apiBackend.get(Endpoints.HealthCheck);
export const getHealthCheckDB = () =>
	apiBackend.get(`${Endpoints.HealthCheck}db`);
export const getHealthCheckRedis = () =>
	apiBackend.get(`${Endpoints.HealthCheck}redis`);
