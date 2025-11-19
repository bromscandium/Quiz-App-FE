import axios from 'axios';

const api = axios.create({
	baseURL: process.env.BACKEND_API,
	timeout: 10000,
	headers: {'Content-Type': 'application/json'},
	withCredentials: true,
});

api.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error),
);

export default api;
