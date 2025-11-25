import { useTranslations } from 'next-intl';

import { Routes } from '@constants/routes';

export interface NavLink {
  href: string;
  label: string;
}

export function useDesktopNavLinks(): NavLink[] {
  const t = useTranslations('header');

  return [
    { href: Routes.Users.href, label: t(Routes.Users.text) },
    { href: Routes.Companies.href, label: t(Routes.Companies.text) },
  ];
}

export function useMobileNavLinks(): NavLink[] {
  const t = useTranslations('header');

  return [
    { href: Routes.Users.href, label: t(Routes.Users.text) },
    { href: Routes.Companies.href, label: t(Routes.Companies.text) },
    { href: Routes.About.href, label: t(Routes.About.text) },
  ];
}
