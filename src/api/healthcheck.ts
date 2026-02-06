import { Endpoints } from '@constants/endpoints';

import api from '@libs/axios/axios';

export const getHealthCheck = () => api.get(Endpoints.HealthCheck.root);

export const getHealthCheckDB = () => api.get(Endpoints.HealthCheck.db);

export const getHealthCheckRedis = () => api.get(Endpoints.HealthCheck.redis);
