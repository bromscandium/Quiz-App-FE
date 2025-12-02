import { Env, Routes } from '@constants';
import { redirectWithLocale } from '@helpers/redirect';
import axios from 'axios';

const api = axios.create({
  baseURL: Env.BACKEND_API,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      redirectWithLocale(Routes.Login.href);
    }
    return Promise.reject(error);
  }
);

export default api;
