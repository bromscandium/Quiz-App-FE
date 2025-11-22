import { useTranslations } from 'next-intl';

import { Routes } from '@constants/routes';

export interface NavLink {
  href: string;
  label: string;
}

export function useNavLinks(): NavLink[] {
  const t = useTranslations('header');

  return [
    { href: Routes.Users.href, label: t(Routes.Users.text) },
    { href: Routes.Companies.href, label: t(Routes.Companies.text) },
  ];
}
