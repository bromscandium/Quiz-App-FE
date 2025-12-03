export const Routes = {
  Home: {
    href: '/',
    text: 'home',
  },
  Users: {
    href: '/users',
    text: 'users',
  },
  Companies: {
    href: '/companies',
    text: 'companies',
    buildRoute: (id: string | number) => `/companies/${id}`,
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
    buildRoute: (id: string | number) => `/profile/${id}`,
  },
  Quiz: {
    href: '/quiz',
    label: 'Quiz',
  },
};

export const AuthRoutes = [Routes.Login.href, Routes.Register.href];
