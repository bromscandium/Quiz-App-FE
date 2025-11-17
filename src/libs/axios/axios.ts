import axios from 'axios';

const apiBackend = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

apiBackend.interceptors.request.use((config) => {
	const token = document.cookie
		.split('; ')
		.find((row) => row.startsWith('token='))
		?.split('=')[1];

	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

apiBackend.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error),
);

export default apiBackend;
