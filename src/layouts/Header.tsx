'use client';

import { AppBar, Toolbar, Box, Button, Typography } from '@mui/material';
import { Link } from '@libs/i18n/navigation';
import { useTranslations } from 'next-intl';
import { NavLinks } from '@enums/routes';
import LanguageSelect from '@templates/selects/languages';

export function Header() {
    const t = useTranslations('header');

    const navLinks = [
        { href: NavLinks.Users, label: t('users') },
        { href: NavLinks.Companies, label: t('companies') },
        { href: NavLinks.About, label: t('about') },
    ];

    return (
        <AppBar
            position="static"
            color="default"
            elevation={1}
            sx={{ bgcolor: 'background.paper', color: 'text.primary' }}
        >
            <Toolbar
                sx={{
                    maxWidth: 1200,
                    mx: 'auto',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1.5,
                }}
            >
                <Typography
                    variant="h5"
                    component={Link}
                    href={NavLinks.Home}
                    sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                        fontWeight: 'bold',
                    }}
                >
                    Quiz App
                </Typography>

                <Box sx={{ display: 'flex', gap: 3 }}>
                    {navLinks.map((link) => (
                        <Button
                            key={link.href}
                            component={Link}
                            href={link.href}
                            color="inherit"
                            sx={{ fontWeight: 500, textTransform: 'none' }}
                        >
                            {link.label}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button
                        component={Link}
                        href={NavLinks.Login}
                        variant="contained"
                        color="primary"
                    >
                        {t('login')}
                    </Button>
                    <LanguageSelect />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
