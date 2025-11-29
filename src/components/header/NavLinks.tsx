import { useTranslations } from 'next-intl';

import { Routes } from '@constants/routes';

export interface NavLink {
  href: string;
  label: string;
}
export const useDesktopNavLinks = (): NavLink[] => {
  const t = useTranslations('header');

  return [
    { href: Routes.Users.href, label: t('users') },
    { href: Routes.Companies.href, label: t('companies') },
  ];
};

export const useMobileNavLinks = (): NavLink[] => {
  const t = useTranslations('header');

  return [
    { href: Routes.Users.href, label: t('users') },
    { href: Routes.Companies.href, label: t('companies') },
    { href: Routes.About.href, label: t('about') },
  ];
};
