export const authBase = '/auth';
export const usersBase = '/users';
export const healthBase = '/health';

export const Endpoints = {
  HealthCheck: {
    root: '/',
    db: `${healthBase}/db`,
    redis: `${healthBase}/redis`,
  },
  Auth: {
    login: `${authBase}/login`,
    logout: `${authBase}/logout`,
    refresh: `${authBase}/refresh`,
    me: `/auth/me`,
  },
  Users: {
    create: `${usersBase}`,
    byId: (id: string) => `${usersBase}/id/${id}`,
    byEmail: (email: string) => `${usersBase}/email/${email}`,
    byNickname: (nickname: string) => `${usersBase}/nickname/${nickname}`,
    all: `${usersBase}/all`,
    update: (id: string) => `${usersBase}/update/${id}`,
    delete: (id: string) => `${usersBase}/delete/${id}`,
    companies: (id: string) => `${usersBase}/companies/${id}`,
  },
};
