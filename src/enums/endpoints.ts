export const Endpoints = {
	HealthCheck: {
		root: '/',
		db: '/health/db',
		redis: '/health/redis',
	},
	Auth: {
		login: '/auth/login',
		logout: '/auth/logout',
		refresh: '/auth/refresh',
		me: 'auth/me',
	},
	Users: {
		create: '/users',
	},
};
