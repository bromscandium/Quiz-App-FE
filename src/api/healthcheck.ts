import api from '@libs/axios/axios';
import {Endpoints} from '@enums/endpoints';

export const getHealthCheck = () => api.get(Endpoints.HealthCheck.root);

export const getHealthCheckDB = () => api.get(Endpoints.HealthCheck.db);

export const getHealthCheckRedis = () => api.get(Endpoints.HealthCheck.redis);
