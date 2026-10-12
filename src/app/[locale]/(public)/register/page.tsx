'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { Routes } from '@constants/routes';
import { redirectWithLocale } from '@helpers/redirect';
import { hasErrors, validation } from '@helpers/validation';
import { Box, Link as MuiLink, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { loginAction } from '@actions/auth';

import { AuthForm } from '@components/forms/AuthForm';
import { LanguageSelect } from '@components/selects/LanguagesSelect';

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
import { createUserThunk, readUserByMeThunk } from '@libs/redux/slices/user';
import { AppDispatch, RootState } from '@libs/redux/store';

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();

  const { name, surname, nickname, email, password, errors } = useSelector(
    (state: RootState) => state.register
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearErrors());

    const errors = validation({ name, nickname, email, password }, t);

    if (hasErrors(errors)) {
      dispatch(setErrors(errors));
      return;
    }

    let signedIn = false;

    try {
      // An existing account with these credentials just signs in; only create a user when that fails.
      let result = await loginAction({ email, password });

      if (!result.success) {
        await dispatch(
          createUserThunk({ name, surname, nickname, email, password })
        ).unwrap();

        await new Promise((resolve) => setTimeout(resolve, 1000));

        result = await loginAction({ email, password });
      }

      if (result.success) {
        await dispatch(readUserByMeThunk());
        signedIn = true;
      } else {
        dispatch(setErrors({ general: result.error }));
      }
    } catch (error) {
      dispatch(setErrors({ general: String(error) }));
    }

    // redirect() works by throwing NEXT_REDIRECT, so it must not run inside the try above
    if (signedIn) {
      await redirectWithLocale(Routes.Home.href);
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
          {t('register.title')}
        </Typography>

        <AuthForm
          onSubmit={handleSubmit}
          submitLabel={t('common.signUp')}
          generalError={errors.general}
          fields={[
            {
              name: 'name',
              value: name,
              onChange: (v) => dispatch(setName(v)),
              error: errors.name,
              placeholder: t('common.namePlaceholder'),
              required: true,
            },
            {
              name: 'surname',
              value: surname,
              onChange: (v) => dispatch(setSurname(v)),
              error: errors.surname,
              placeholder: t('common.surnamePlaceholder'),
            },
            {
              name: 'nickname',
              value: nickname,
              onChange: (v) => dispatch(setNickname(v)),
              error: errors.nickname,
              placeholder: t('common.nicknamePlaceholder'),
              required: true,
            },
            {
              name: 'email',
              value: email,
              onChange: (v) => dispatch(setEmail(v)),
              error: errors.email,
              placeholder: t('common.emailPlaceholder'),
              type: 'email',
              required: true,
            },
            {
              name: 'password',
              value: password,
              onChange: (v) => dispatch(setPassword(v)),
              error: errors.password,
              placeholder: t('common.passwordPlaceholder'),
              type: 'password',
              required: true,
            },
          ]}
        />

        <Typography variant="body2" textAlign="center">
          {t('register.haveAccount')}{' '}
          <MuiLink
            component={Link}
            href={Routes.Login.href}
            sx={{ color: 'primary.main' }}
          >
            {t('common.signIn')}
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
