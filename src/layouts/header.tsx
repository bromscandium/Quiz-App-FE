'use client';

import Link from 'next/link';
import { NavLinks } from '@enums/routes';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import LanguageSelect from '@templates/selects/languages';

export function Header() {
    const t = useTranslations('header');

    const locale = useLocale();
    const router = useRouter();

    const handleChangeLocale = (newLocale: string) => {
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/`;
        router.push(`/${newLocale}`);
    };

    const navLinks = [
        { href: `/${locale}${NavLinks.Users}`, label: t('users') },
        { href: `/${locale}${NavLinks.Companies}`, label: t('companies') },
        { href: `/${locale}${NavLinks.About}`, label: t('about') },
    ];
    return (
        <header className="bg-background shadow-md">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
                <div className="text-2xl font-bold text-primary">
                    <Link href="/">Quiz App</Link>
                </div>

                <nav className="flex-1 flex justify-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-primary hover:text-custom-primary-dark transition-colors duration-200 font-medium"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link
                        href={`/${locale}/login`}
                        className="px-4 py-1 bg-primary text-primary-foreground rounded-md hover:bg-custom-primary-dark transition-colors duration-200 font-medium"
                    >
                        {t('login')}
                    </Link>
                    <LanguageSelect />
                </div>
            </div>
        </header>
    );
}
