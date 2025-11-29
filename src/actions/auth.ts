import { CookieNames, Periods, Routes } from '@constants';
import { deleteCookie, getCookie, setCookie } from '@helpers/cookies';
import { redirectWithLocale } from '@helpers/redirect';
import { AuthInterfaces } from '@interfaces';

import { login, logout } from '@api/auth';

import { store } from '@libs/redux/store';

export async function loginActions(data: AuthInterfaces.LoginRequest) {
  try {
    const response = await login(data);

    await setCookie({
      name: CookieNames.REFRESH_TOKEN,
      value: response.data.refresh_token,
      maxAge: Periods.MONTH,
    });
    await setCookie({
      name: CookieNames.ACCESS_TOKEN,
      value: response.data.access_token,
      maxAge: Periods.HOUR,
    });
  } catch (error: any) {
    return error?.response?.data?.detail ?? 'Unknown error occurred.';
  }

  await redirectWithLocale(Routes.Home.href);
}

export async function logoutActions() {
  const refreshToken = await getCookie({ name: CookieNames.REFRESH_TOKEN });

  if (refreshToken) {
    await logout({ refresh_token: refreshToken });
  }

  await deleteCookie({ name: CookieNames.REFRESH_TOKEN });
  await deleteCookie({ name: CookieNames.ACCESS_TOKEN });

  store.dispatch({ type: 'RESET' });

  await redirectWithLocale(Routes.Login.href);
}
