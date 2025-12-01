import { NextRequest, NextResponse } from 'next/server';

import { Routes } from '@constants';
import { getCurrentUserFromToken } from '@helpers/decoder';

import { redirectWithLocale } from '@libs/proxy/redirect';

export async function handleProfileRedirect(
  request: NextRequest
): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;

  const profileMatch = pathname.match(/^\/([a-z]{2}\/)?profile$/);

  if (!profileMatch) return null;

  const payload = await getCurrentUserFromToken();

  if (!payload) return redirectWithLocale(request, Routes.Login.href);

  return redirectWithLocale(request, Routes.Profile.buildRoute(payload.sub));
}
