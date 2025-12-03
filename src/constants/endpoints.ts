export const authBase = '/auth';
export const companiesBase = '/companies';
export const companyActionsBase = '/company_actions';
export const healthBase = '/health';
export const membershipsBase = '/memberships';
export const usersBase = '/users';
export const quizzesBase = '/quizzes';
export const quizAttemptsBase = '/quiz_attempts';

export const Endpoints = {
  Auth: {
    login: `${authBase}/login`,
    logout: `${authBase}/logout`,
    refresh: `${authBase}/refresh`,
    me: `${authBase}/me`,
  },
  Companies: {
    create: `${companiesBase}/`,
    byId: (id: string) => `${companiesBase}/id/${id}`,
    all: `${companiesBase}/all`,
    update: (id: string) => `${companiesBase}/update/${id}`,
    delete: (id: string) => `${companiesBase}/delete/${id}`,
  },
  CompanyActions: {
    create: `${companyActionsBase}`,
    byId: (id: string) => `${companyActionsBase}/${id}`,
    all: `${companyActionsBase}/all`,
    update: (id?: string) => `${companyActionsBase}/update/${id}`,
    delete: (id: string) => `${companyActionsBase}/delete/${id}`,
  },
  HealthCheck: {
    root: '/',
    db: `${healthBase}/db`,
    redis: `${healthBase}/redis`,
  },
  Membership: {
    create: `${membershipsBase}/`,
    byId: (id: string) => `${membershipsBase}/id/${id}`,
    user: `${membershipsBase}/user/`,
    company: (id: string) => `${membershipsBase}/company/${id}`,
    update: (id: string) => `${membershipsBase}/update/${id}`,
    delete: (id: string) => `${membershipsBase}/delete/${id}`,
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
  Quizzes: {
    create: `${quizzesBase}/`,
    byId: (id: string) => `${quizzesBase}/id/${id}`,
    byCompany: (companyId: string) => `${quizzesBase}/company/${companyId}`,
    update: (id: string) => `${quizzesBase}/update/${id}`,
    delete: (id: string) => `${quizzesBase}/delete/${id}`,
  },
  QuizAttempts: {
    create: `${quizAttemptsBase}/`,
    byId: (id: string, userId: string) =>
      `${quizAttemptsBase}/${id}?user_id=${userId}`,
    user: `${quizAttemptsBase}/user/`,
    company: `${quizAttemptsBase}/company/`,
  },
};
