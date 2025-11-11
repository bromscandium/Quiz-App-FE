'use client';

import { Box, Typography, TextField, Button, Link as MuiLink } from '@mui/material';
import { Link } from '@libs/i18n/navigation';
import { useTranslations } from 'next-intl';
import { NavLinks } from '@enums/routes';

export default function LoginPage() {
    const t = useTranslations('login');

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
            >
                <Typography variant="h4" component="h1" textAlign="center" fontWeight={700}>
                    {t('title')}
                </Typography>

                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        required
                        fullWidth
                    />
                    <TextField
                        type="password"
                        placeholder={t('passwordPlaceholder')}
                        required
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ py: 1.5, fontWeight: 500 }}
                        fullWidth
                    >
                        {t('signIn')}
                    </Button>
                </Box>

                <Typography variant="body2" textAlign="center">
                    {t('noAccount')}{' '}
                    <MuiLink
                        component={Link}
                        href={NavLinks.Register}
                        sx={{ color: 'primary.main', '&:hover': { color: 'primary.dark' } }}
                    >
                        {t('signUp')}
                    </MuiLink>
                </Typography>
            </Box>
        </Box>
    );
}
