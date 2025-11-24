'use client';

import { Env } from '@constants';
import { Routes } from '@constants/routes';
import { AppBar, Toolbar, Typography } from '@mui/material';

import { Link } from '@libs/i18n/navigation';

import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';
import { useNavLinks } from './NavLinks';

export function Header() {
  const navLinks = useNavLinks();

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

        <HeaderDesktop navLinks={navLinks} />
        <HeaderMobile navLinks={navLinks} />
      </Toolbar>
    </AppBar>
  );
}
