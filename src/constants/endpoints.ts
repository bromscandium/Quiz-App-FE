export const authBase = '/auth';
export const companiesBase = '/companies';
export const usersBase = '/users';
export const healthBase = '/health';

export const Endpoints = {
  Auth: {
    login: `${authBase}/login`,
    logout: `${authBase}/logout`,
    refresh: `${authBase}/refresh`,
    me: `/auth/me`,
  },
  Companies: {
    create: `${companiesBase}`,
    byId: (id: string) => `${companiesBase}/id/${id}`,
    all: `${companiesBase}/all`,
    update: (id?: string) => `${companiesBase}/update/${id}`,
    delete: (id: string) => `${companiesBase}/delete/${id}`,
  },
  Users: {
    create: `${usersBase}`,
    byId: (id: string) => `${usersBase}/id/${id}`,
    byEmail: (email: string) => `${usersBase}/email/${email}`,
    byNickname: (nickname: string) => `${usersBase}/nickname/${nickname}`,
    all: `${usersBase}/all`,
    update: (id?: string) => `${usersBase}/update/${id}`,
    delete: (id: string) => `${usersBase}/delete/${id}`,
    companies: (id: string) => `${usersBase}/companies/${id}`,
  },
  HealthCheck: {
    root: '/',
    db: `${healthBase}/db`,
    redis: `${healthBase}/redis`,
  },
};
