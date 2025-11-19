import {NextRequest, NextResponse} from 'next/server';
import {routing} from '@libs/i18n/routing';
import {refresh} from '@api/auth';
import {TokenResponse} from '@schemas/auth';

async function refreshAccessToken(
    refreshToken: string,
): Promise<TokenResponse | null> {
    try {
        const response = await refresh({refresh_token: refreshToken});
        return response.data;
    } catch {
        return null;
    }
}

export async function proxy(request: NextRequest) {
    const cookieLocale =
        request.cookies.get('NEXT_LOCALE')?.value ?? routing.defaultLocale;
    const {pathname} = request.nextUrl;

    const accessToken = request.cookies.get('ACCESS_TOKEN')?.value;
    const refreshToken = request.cookies.get('REFRESH_TOKEN')?.value;

    const isAuthPage =
        pathname === `/${cookieLocale}/login` ||
        pathname === `/${cookieLocale}/register` ||
        pathname.startsWith(`/${cookieLocale}/login`) ||
        pathname.startsWith(`/${cookieLocale}/register`);

    if (isAuthPage && (accessToken || refreshToken)) {
        return NextResponse.redirect(
            new URL(`/${cookieLocale}/`, request.url),
        );
    }

    if (isAuthPage) {
        return NextResponse.next();
    }

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
        if (!request.cookies.get('NEXT_LOCALE')) {
            response.cookies.set('NEXT_LOCALE', cookieLocale, {
                path: '/',
                maxAge: 315360000,
            });
        }
        return response;
    }

    if (!accessToken && !refreshToken) {
        return NextResponse.redirect(
            new URL(`/${cookieLocale}/login`, request.url),
        );
    }

    if (!accessToken && refreshToken) {
        const data = await refreshAccessToken(refreshToken);

        if (!data) {

            const response = NextResponse.redirect(
                new URL(`/${cookieLocale}/login`, request.url),
            );
            response.cookies.delete('REFRESH_TOKEN');
            response.cookies.delete('ACCESS_TOKEN');
            return response;
        }

        const response = NextResponse.next();

        response.cookies.set('ACCESS_TOKEN', data.access_token, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600,
        });

        response.cookies.set('REFRESH_TOKEN', data.refresh_token, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 2592000,
        });

        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_vercel).*)',
    ],
};