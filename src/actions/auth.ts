'use server';

import {cookies} from 'next/headers';
import {login, logout} from '@api/auth';
import {LoginRequest} from '@schemas/auth';
import {redirect} from '@libs/i18n/navigation';
import {routing} from '@libs/i18n/routing';
import {Routes} from '@enums/routes';

export async function loginActions(data: LoginRequest) {
	const response = await login(data);

	const cookieStore = await cookies();

	cookieStore.set('ACCESS_TOKEN', response.data.access_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 3600,
		path: '/',
	});

	cookieStore.set('REFRESH_TOKEN', response.data.refresh_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 259200,
		path: '/',
	});

	return {success: true};
}

export async function logoutActions() {
	const cookieStore = await cookies();

	const refreshTokenCookie = cookieStore.get('REFRESH_TOKEN')!;
	const currentLocaleCookie = cookieStore.get('NEXT_LOCALE');

	if (!refreshTokenCookie) {
		redirect({
			href: Routes.Login.href,
			locale: currentLocaleCookie?.value || routing.defaultLocale,
		});
	}

	await logout({refresh_token: refreshTokenCookie.value});

	cookieStore.delete('REFRESH_TOKEN');
	cookieStore.delete('ACCESS_TOKEN');

	redirect({
		href: Routes.Login.href,
		locale: currentLocaleCookie?.value || routing.defaultLocale,
	});
}
