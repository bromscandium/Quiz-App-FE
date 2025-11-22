'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { Routes } from '@constants/routes';
import { Box, Link as MuiLink, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { loginActions } from '@actions/auth';

import { AuthForm } from '@components/forms/AuthForm';
import LanguageSelect from '@components/selects/Languages';

import { Link } from '@libs/i18n/navigation';
import {
  clearErrors,
  setEmail,
  setErrors,
  setName,
  setNickname,
  setPassword,
  setSurname,
} from '@libs/redux/slices/register';
import { createUserThunk } from '@libs/redux/slices/user';
import { AppDispatch, RootState } from '@libs/redux/store';

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations('register');

  const { name, surname, nickname, email, password, errors } = useSelector(
    (state: RootState) => state.register
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearErrors());

    const validation: {
      name?: string;
      nickname?: string;
      email?: string;
      password?: string;
    } = {};

    if (!name) validation.name = t('errors.nameRequired');

    if (!nickname) validation.nickname = t('errors.nicknameRequired');

    if (!email) validation.email = t('errors.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(email))
      validation.email = t('errors.emailInvalid');

    if (!password) validation.password = t('errors.passwordRequired');
    else if (password.length < 6)
      validation.password = t('errors.passwordInvalid');

    if (Object.keys(validation).length > 0) {
      dispatch(setErrors(validation));
      return;
    }

    try {
      await dispatch(
        createUserThunk({ name, surname, nickname, email, password })
      ).unwrap();

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const loginResult = await loginActions({ email, password });
      if (loginResult) {
        dispatch(setErrors({ general: loginResult }));
      }
    } catch (error: any) {
      const errorMessage =
        typeof error === 'string'
          ? error
          : error?.message || error?.toString() || 'Unknown error occurred.';

      dispatch(setErrors({ general: errorMessage }));
    }
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
          {t('title')}
        </Typography>

        <AuthForm
          onSubmit={handleSubmit}
          submitLabel={t('signUp')}
          generalError={errors.general}
          fields={[
            {
              name: 'name',
              value: name,
              onChange: (v) => dispatch(setName(v)),
              error: errors.name,
              placeholder: t('namePlaceholder'),
              required: true,
            },
            {
              name: 'surname',
              value: surname,
              onChange: (v) => dispatch(setSurname(v)),
              error: errors.surname,
              placeholder: t('surnamePlaceholder'),
            },
            {
              name: 'nickname',
              value: nickname,
              onChange: (v) => dispatch(setNickname(v)),
              error: errors.nickname,
              placeholder: t('nicknamePlaceholder'),
              required: true,
            },
            {
              name: 'email',
              value: email,
              onChange: (v) => dispatch(setEmail(v)),
              error: errors.email,
              placeholder: t('emailPlaceholder'),
              type: 'email',
              required: true,
            },
            {
              name: 'password',
              value: password,
              onChange: (v) => dispatch(setPassword(v)),
              error: errors.password,
              placeholder: t('passwordPlaceholder'),
              type: 'password',
              required: true,
            },
          ]}
        />

        <Typography variant="body2" textAlign="center">
          {t('haveAccount')}{' '}
          <MuiLink
            component={Link}
            href={Routes.Login.href}
            sx={{ color: 'primary.main' }}
          >
            {t('signIn')}
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
