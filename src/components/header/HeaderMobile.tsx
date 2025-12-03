import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Routes } from '@constants/routes';
import { Box, Button, Drawer } from '@mui/material';

import { logoutAction } from '@actions/auth';

import { LanguageSelect } from '@components/selects/LanguagesSelect';

import { Link } from '@libs/i18n/navigation';

import { NavLink } from './NavLinks';

interface HeaderMobileProps {
  navLinks: NavLink[];
  userId: string | undefined;
}

export const HeaderMobile = ({ navLinks }: HeaderMobileProps) => {
  const t = useTranslations();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setDrawerOpen(true)}
        sx={{ display: { xs: 'flex', md: 'none' }, textTransform: 'none' }}
      >
        {t('header.menu')}
      </Button>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 260,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: 2,
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              href={Routes.Profile.href}
              component={Link}
              color="primary"
              sx={{ textTransform: 'none', minWidth: 140 }}
            >
              {t('header.profile')}
            </Button>

            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                color="inherit"
                sx={{ textTransform: 'none', minWidth: 140 }}
              >
                {link.label}
              </Button>
            ))}

            <Button
              color="error"
              onClick={() => logoutAction()}
              sx={{ textTransform: 'none', minWidth: 140 }}
            >
              {t('header.logout')}
            </Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <LanguageSelect />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
