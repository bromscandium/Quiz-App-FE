'use client';

import React, {ReactNode} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from '@libs/redux/store';
import {NextIntlClientProvider} from 'next-intl';
import {ThemeProvider, CssBaseline} from '@mui/material';
import {theme} from '@styles/theme';
import type {Messages} from 'next-intl';

interface AppProvidersProps {
	children: ReactNode;
	locale: string;
	messages: Messages;
	timeZone: string;
}

export function AppProviders({
	children,
	locale,
	messages,
	timeZone,
}: AppProvidersProps) {
	return (
		<ReduxProvider store={store}>
			<NextIntlClientProvider
				locale={locale}
				messages={messages}
				timeZone={timeZone}
			>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					{children}
				</ThemeProvider>
			</NextIntlClientProvider>
		</ReduxProvider>
	);
}
