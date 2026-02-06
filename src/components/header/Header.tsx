'use client';

import { Env } from '@constants';
import { Routes } from '@constants/routes';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Link } from '@libs/i18n/navigation';
import { RootState } from '@libs/redux/store';

import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';
import { useDesktopNavLinks, useMobileNavLinks } from './NavLinks';

export const Header = () => {
  const navDesktopLinks = useDesktopNavLinks();
  const navMobileLinks = useMobileNavLinks();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        color: 'text.primary',
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: { xs: 1, md: 1.5 },
        }}
      >
        <Typography
          variant="h5"
          component={Link}
          href={Routes.Home.href}
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 'bold',
          }}
        >
          {Env.APP_NAME}
        </Typography>

        <HeaderDesktop navLinks={navDesktopLinks} userId={currentUser?.id} />
        <HeaderMobile navLinks={navMobileLinks} userId={currentUser?.id} />
      </Toolbar>
    </AppBar>
  );
};
