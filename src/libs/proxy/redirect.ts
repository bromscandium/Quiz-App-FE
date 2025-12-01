import { NextRequest, NextResponse } from 'next/server';

import { CookieNames } from '@constants';

import { getCookie } from '@libs/proxy/_cookies';

export function redirectWithLocale(request: NextRequest, path: string) {
  const locale = getCookie({ request, name: CookieNames.LOCALE }) ?? 'en';
  const url = new URL(path, request.url);
  url.pathname = `/${locale}${url.pathname}`;
  return NextResponse.redirect(url);
}
