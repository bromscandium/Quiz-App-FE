'use client';

import React, { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import type { Messages } from 'next-intl';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SnackbarProvider } from 'notistack';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@libs/redux/store';

import { theme } from '@styles/theme';

interface AppProvidersProps {
  children: ReactNode;
  locale: string;
  messages: Messages;
  timeZone: string;
}

export const AppProviders = ({
  children,
  locale,
  messages,
  timeZone,
}: AppProvidersProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReduxProvider store={store}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone={timeZone}
        >
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </SnackbarProvider>
        </NextIntlClientProvider>
      </ReduxProvider>
    </LocalizationProvider>
  );
};
