import { CookieNames, Limits, Routes } from '@constants';
import { deleteCookie, getCookie, setCookie } from '@helpers/cookies';
import { AuthInterfaces } from '@interfaces';

import { login, logout } from '@api/auth';

export async function loginActions(data: AuthInterfaces.LoginRequest) {
  try {
    const response = await login(data);

    await setCookie({
      name: CookieNames.ACCESS_TOKEN,
      value: response.data.access_token,
      maxAge: Limits.COOKIE_MAX_AGE.HOUR,
    });

    await setCookie({
      name: CookieNames.REFRESH_TOKEN,
      value: response.data.refresh_token,
      maxAge: Limits.COOKIE_MAX_AGE.MONTH,
    });
  } catch (error: any) {
    return error?.response?.data?.detail ?? 'Unknown error occurred.';
  }

  window.location.href = Routes.Home.href;
}

export async function logoutActions() {
  const refreshToken = await getCookie({ name: CookieNames.REFRESH_TOKEN });

  if (refreshToken) {
    await logout({ refresh_token: refreshToken });
  }

  await deleteCookie({ name: CookieNames.ACCESS_TOKEN });
  await deleteCookie({ name: CookieNames.REFRESH_TOKEN });

  window.location.href = Routes.Login.href;
}
