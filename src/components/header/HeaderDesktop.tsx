import { useTranslations } from 'next-intl';

import { Routes } from '@constants/routes';
import { Box, Button } from '@mui/material';

import { logoutActions } from '@actions/auth';

import { DropdownButton } from '@components/dropdown/Dropdown';
import { LanguageSelect } from '@components/selects/LanguagesSelect';

import { Link } from '@libs/i18n/navigation';

import { NavLink } from './NavLinks';

interface HeaderDesktopProps {
  navLinks: NavLink[];
  userId: string | undefined;
}

export const HeaderDesktop = ({ navLinks }: HeaderDesktopProps) => {
  const t = useTranslations();

  return (
    <>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: 3,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {navLinks.map((link) => (
          <Button
            key={link.href}
            component={Link}
            href={link.href}
            color="inherit"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            {link.label}
          </Button>
        ))}
      </Box>

      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: 2,
        }}
      >
        <DropdownButton
          buttonLabel={t('header.profile')}
          buttonProps={{
            variant: 'contained',
            color: 'primary',
            sx: { textTransform: 'none' },
          }}
          menuItems={[
            { label: t('header.profile'), href: Routes.Profile.href },
            { label: t('header.about'), href: Routes.About.href },
            {
              label: t('header.logout'),
              onClick: () => logoutActions(),
            },
          ]}
        />

        <LanguageSelect />
      </Box>
    </>
  );
};
