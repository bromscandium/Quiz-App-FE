import { NextRequest, NextResponse } from 'next/server';

import { CookieNames, Limits } from '@constants';

import { routing } from '@libs/i18n/routing';
import { getCookie, setCookie } from '@libs/proxy/_cookies';

export function handleLanguage(request: NextRequest): NextResponse | null {
  const cookieLocale =
    getCookie({ request, name: CookieNames.LOCALE }) ?? routing.defaultLocale;
  const { pathname } = request.nextUrl;

  const pathParts = pathname.split('/').filter(Boolean);
  const hasValidLocale =
    pathParts[0] &&
    (routing.locales as readonly string[]).includes(pathParts[0]);

  if (!hasValidLocale || pathParts[0] !== cookieLocale) {
    const url = request.nextUrl.clone();
    const pathWithoutLocale = hasValidLocale
      ? pathname.replace(/^\/[^/]+/, '')
      : pathname;
    url.pathname = `/${cookieLocale}${pathWithoutLocale}`;

    const response = NextResponse.redirect(url);

    if (!getCookie({ request, name: CookieNames.LOCALE })) {
      setCookie({
        response,
        name: CookieNames.LOCALE,
        value: cookieLocale,
        maxAge: Limits.COOKIE_MAX_AGE.YEAR,
      });
    }

    return response;
  }

  return null;
}
