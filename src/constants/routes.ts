export const Routes = {
  Home: {
    href: '/',
    text: 'home',
  },
  Users: {
    href: '/users',
    text: 'users',
    buildRoute: (id: string | number) => `/users/${id}`,
  },
  Companies: {
    href: '/companies',
    text: 'companies',
    buildRoute: (id: string | number) => `/companies/${id}`,
    buildActivitiesRoute: (id: string | number) =>
      `/companies/${id}/activities`,
  },
  About: {
    href: '/about',
    text: 'about',
  },
  Login: {
    href: '/login',
    text: 'login',
  },
  Register: {
    href: '/register',
    text: 'register',
  },
  Profile: {
    href: '/profile',
    text: 'profile',
  },
};

export const AuthRoutes = [Routes.Login.href, Routes.Register.href];
