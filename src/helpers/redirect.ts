import { CookieNames } from '@constants';

import { redirect } from '@libs/i18n/navigation';
import { routing } from '@libs/i18n/routing';

import { getCookie } from './cookies';

export async function redirectWithLocale(path: string) {
  const locale =
    (await getCookie({ name: CookieNames.LOCALE })) ?? routing.defaultLocale;
  redirect({ href: path, locale });
}
