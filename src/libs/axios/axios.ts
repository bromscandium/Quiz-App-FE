import { Env, Limits } from '@constants';
import axios from 'axios';

const api = axios.create({
  baseURL: Env.BACKEND_API,
  timeout: Limits.AXIOS_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
