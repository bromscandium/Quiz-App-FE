'use client';

import {
    Box,
    Typography,
    TextField,
    Button,
    Link as MuiLink,
} from '@mui/material';
import {Link} from '@libs/i18n/navigation';
import {useTranslations} from 'next-intl';
import {NavLinks} from '@enums/routes';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@libs/redux/store';

import {setEmail, setPassword, setErrors, clearErrors} from '@libs/redux/slices/login';
import React from "react";

export default function LoginPage() {
    const dispatch = useDispatch<AppDispatch>();
    const t = useTranslations('login');

    const {email, password, errors} = useSelector(
        (state: RootState) => state.login,
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearErrors());

        const newErrors: { email?: string; password?: string } = {};

        if (!email) newErrors.email = t('errors.emailRequired');
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = t('errors.emailInvalid');

        if (!password) newErrors.password = t('errors.passwordRequired');
        else if (password.length < 8) newErrors.password = t('errors.passwordInvalid');

        if (Object.keys(newErrors).length > 0) {
            dispatch(setErrors(newErrors));
            return;
        }

        console.log("success");
    }

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
                <Typography
                    variant="h4"
                    component="h1"
                    textAlign="center"
                    fontWeight={700}
                >
                    {t('title')}
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <TextField
                        type="email"
                        value={email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                        error={!!errors.email}
                        helperText={errors.email}
                        placeholder={t('emailPlaceholder')}
                        fullWidth
                    />
                    <TextField
                        type="password"
                        value={password}
                        onChange={(e) => dispatch(setPassword(e.target.value))}
                        error={!!errors.password}
                        helperText={errors.password}
                        placeholder={t('passwordPlaceholder')}
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            py: 1.5,
                            fontWeight: 500,
                        }}
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
                        sx={{
                            color: 'primary.main',
                            '&:hover': {
                                color: 'primary.dark',
                            },
                        }}
                    >
                        {t('signUp')}
                    </MuiLink>
                </Typography>
            </Box>
        </Box>
    );
}
