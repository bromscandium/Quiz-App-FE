'use client';

import {useState} from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    Typography,
    Drawer,
    Menu,
    MenuItem,
} from '@mui/material';
import {Link} from '@libs/i18n/navigation';
import {useTranslations} from 'next-intl';
import {Routes} from '@enums/routes';
import LanguageSelect from '@templates/selects/languages';
import {logoutActions} from '@actions/auth';

export function Header() {
    const t = useTranslations('header');
    const applicationName = process.env.NEXT_PUBLIC_APP_NAME!;

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(
        null,
    );

    const closeProfile = () => {
        setProfileAnchor(null);
    };

    const navLinks = [
        { href: Routes.Users.href, label: t(Routes.Users.text) },
        { href: Routes.Companies.href, label: t(Routes.Companies.text) },
        { href: Routes.About.href, label: t(Routes.About.text) },
    ];

    return (
        <AppBar
            position="static"
            color="default"
            elevation={1}
            sx={{
                bgcolor: 'background.paper',
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
                    py: {xs: 1, md: 1.5},
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
                    {applicationName}
                </Typography>

                <Box
                    sx={{
                        display: {xs: 'none', md: 'flex'},
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
                        display: {xs: 'none', md: 'flex'},
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{textTransform: 'none'}}
                        onClick={(e) => setProfileAnchor(e.currentTarget)}
                    >
                        {t('profile')}
                    </Button>

                    <Menu
                        anchorEl={profileAnchor}
                        open={Boolean(profileAnchor)}
                        onClose={closeProfile}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{
                            '& .MuiPaper-root': {
                                borderRadius: 2,
                                minWidth: 160,
                            },
                        }}
                    >
                        <MenuItem component={Link} href={Routes.Profile.href}>
                            {t('profile')}
                        </MenuItem>
                        <MenuItem onClick={logoutActions}>
                            {t('logout')}
                        </MenuItem>
                    </Menu>

                    <LanguageSelect />
                </Box>

                <Button
                    variant="outlined"
                    onClick={() => setDrawerOpen(true)}
                    sx={{
                        display: {xs: 'flex', md: 'none'},
                        textTransform: 'none',
                    }}
                >
                    {t('menu')}
                </Button>
            </Toolbar>

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
                            sx={{
                                textTransform: 'none',
                                minWidth: 140,
                            }}
                        >
                            {t('profile')}
                        </Button>

                        {navLinks.map((link) => (
                            <Button
                                key={link.href}
                                component={Link}
                                href={link.href}
                                color="inherit"
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    minWidth: 140,
                                }}
                            >
                                {link.label}
                            </Button>
                        ))}

                        <Button
                            color="error"
                            onClick={logoutActions}
                            sx={{
                                textTransform: 'none',
                                minWidth: 140,
                            }}
                        >
                            {t('logout')}
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            mt: 2,
                        }}
                    >
                        <LanguageSelect />
                    </Box>
                </Box>
            </Drawer>
        </AppBar>
    );
}