import React from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { Header } from '@layouts/header';
import { Montserrat } from 'next/font/google';
import { routing } from '@libs/i18n/routing';
import { notFound } from 'next/navigation';
import '@styles/globals.css';
import { setRequestLocale } from 'next-intl/server';
import { StoreProvider } from '@libs/redux/StoreProvider';

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

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    setRequestLocale(locale);
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <StoreProvider>
            <html lang={locale} className={montserrat.variable}>
                <body className="min-h-screen antialiased font-sans">
                    <NextIntlClientProvider>
                        <Header />
                        {children}
                    </NextIntlClientProvider>
                </body>
            </html>
        </StoreProvider>
    );
}
