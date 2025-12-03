'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { Routes } from '@constants/routes';
import { hasErrors, validation } from '@helpers/validation';
import { Box, Link as MuiLink, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { loginActions } from '@actions/auth';

import { AuthForm } from '@components/forms/AuthForm';
import { LanguageSelect } from '@components/selects/LanguagesSelect';

import { Link } from '@libs/i18n/navigation';
import {
  clearErrors,
  setEmail,
  setErrors,
  setPassword,
} from '@libs/redux/slices/login';
import { AppDispatch, RootState } from '@libs/redux/store';

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();

  const { email, password, errors } = useSelector(
    (state: RootState) => state.login
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearErrors());

    const errors = validation({ email, password }, t);

    if (hasErrors(errors)) {
      dispatch(setErrors(errors));
      return;
    }

    const loginResult = await loginActions({ email, password });
    if (loginResult) dispatch(setErrors({ general: loginResult }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Typography variant="h4" textAlign="center" fontWeight={700}>
          {t('login.title')}
        </Typography>

        <AuthForm
          onSubmit={handleSubmit}
          submitLabel={t('common.signIn')}
          generalError={errors.general}
          fields={[
            {
              name: 'email',
              value: email,
              onChange: (v) => dispatch(setEmail(v)),
              error: errors.email,
              placeholder: t('common.emailPlaceholder'),
              type: 'email',
            },
            {
              name: 'password',
              value: password,
              onChange: (v) => dispatch(setPassword(v)),
              error: errors.password,
              placeholder: t('common.passwordPlaceholder'),
              type: 'password',
            },
          ]}
        />

        <Typography variant="body2" textAlign="center">
          {t('login.noAccount')}{' '}
          <MuiLink
            component={Link}
            href={Routes.Register.href}
            sx={{ color: 'primary.main' }}
          >
            {t('common.signUp')}
          </MuiLink>
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <LanguageSelect />
      </Box>
    </Box>
  );
}
