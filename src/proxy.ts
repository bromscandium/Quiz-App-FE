import { NextRequest, NextResponse } from 'next/server';
import { routing } from '@libs/i18n/routing';

export function proxy(request: NextRequest) {
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value ?? routing.defaultLocale;
    const { pathname } = request.nextUrl;

    const pathParts = pathname.split('/').filter(Boolean);

    if (!routing.locales.includes(pathParts[0]) || pathParts[0] !== cookieLocale) {
        const url = request.nextUrl.clone();
        url.pathname = `/${cookieLocale}${pathname.replace(/^\/[^/]+/, '')}`;

        const response = NextResponse.redirect(url);

        if (!request.cookies.get('NEXT_LOCALE')) {
            response.cookies.set('NEXT_LOCALE', cookieLocale, {
                path: '/',
                maxAge: 60 * 60 * 24 * 365,
            });
        }

        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_vercel).*)'],
};
