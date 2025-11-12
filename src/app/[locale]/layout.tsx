import React from 'react';
import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { Header } from '@layouts/Header';
import { Montserrat } from 'next/font/google';
import { routing } from '@libs/i18n/routing';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { AppProviders } from '@layouts/AppProviders';

const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'Quiz App',
	icons: {
		icon: '/icon.svg',
	},
};

interface RootLayoutProps {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}

export default async function RootLayout({
	children,
	params,
}: RootLayoutProps) {
	const { locale } = await params;
	const messages = (await import(`@messages/${locale}.json`)).default;
	const timeZone: string = process.env.NEXT_PUBLIC_TIMEZONE!;

	setRequestLocale(locale);
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html lang={locale} className={montserrat.variable}>
			<body className="min-h-screen antialiased font-sans">
				<AppProviders
					locale={locale}
					messages={messages}
					timeZone={timeZone}
				>
					<Header />
					{children}
				</AppProviders>
			</body>
		</html>
	);
}
