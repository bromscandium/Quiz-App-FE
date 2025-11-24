import { NextRequest, NextResponse } from 'next/server';

import { handleAuth, handleLanguage } from '@libs/proxy';

export async function proxy(request: NextRequest) {
  const languageProxy = handleLanguage(request);
  if (languageProxy) return languageProxy;

  const authProxy = await handleAuth(request);
  if (authProxy) return authProxy;

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_vercel).*)',
  ],
};
