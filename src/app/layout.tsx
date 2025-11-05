import '@styles/globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import React from 'react';
import { ModalProvider } from '@providers/ModalProvider';
import { Header } from '@layouts/header';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={montserrat.variable}>
            <body className="min-h-screen antialiased bg-background font-sans">
                <ModalProvider>
                    <Header />
                    <main className="">{children}</main>
                </ModalProvider>
            </body>
        </html>
    );
}
