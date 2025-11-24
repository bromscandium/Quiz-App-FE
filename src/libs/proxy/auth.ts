import { NextRequest, NextResponse } from 'next/server';

import { AuthRoutes, CookieNames, Limits, Routes } from '@constants';
import { AuthInterfaces } from '@interfaces';

import { refresh } from '@api/auth';

import { deleteCookie, getCookie, setCookie } from '@libs/proxy/_cookies';
import { redirectWithLocale } from '@libs/proxy/_redirect';

export async function handleAuth(
  request: NextRequest
): Promise<NextResponse | null> {
  const accessToken = getCookie({ request, name: CookieNames.ACCESS_TOKEN });
  const refreshToken = getCookie({ request, name: CookieNames.REFRESH_TOKEN });

  const currentPath = request.nextUrl.pathname;
  const pathWithoutLocale = currentPath.replace(/^\/[^/]+/, '');

  if (AuthRoutes.includes(pathWithoutLocale) && accessToken && refreshToken) {
    return redirectWithLocale(request, Routes.Home.href);
  }

  if (
    !AuthRoutes.includes(pathWithoutLocale) &&
    !accessToken &&
    !refreshToken
  ) {
    return redirectWithLocale(request, Routes.Login.href);
  }

  if (!accessToken && refreshToken) {
    try {
      const response = await refresh({ refresh_token: refreshToken });
      const data: AuthInterfaces.TokenResponse = response.data;

      const nextResponse = NextResponse.next();

      setCookie({
        response: nextResponse,
        name: CookieNames.ACCESS_TOKEN,
        value: data.access_token,
        maxAge: Limits.COOKIE_MAX_AGE.YEAR,
      });
      setCookie({
        response: nextResponse,
        name: CookieNames.REFRESH_TOKEN,
        value: data.refresh_token,
        maxAge: Limits.COOKIE_MAX_AGE.YEAR,
      });

      return nextResponse;
    } catch {
      const nextResponse = redirectWithLocale(request, Routes.Login.href);

      deleteCookie({ response: nextResponse, name: CookieNames.ACCESS_TOKEN });
      deleteCookie({ response: nextResponse, name: CookieNames.REFRESH_TOKEN });

      return nextResponse;
    }
  }

  return null;
}
