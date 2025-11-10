'use client';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { TypographyH1, TypographyP } from '@ui/typography';

export default function LoginPage() {
    const t = useTranslations('login');
    const locale = useLocale();

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-paper p-8 rounded shadow-md bg-white flex flex-col gap-6">
                <TypographyH1 className="text-center">{t('title')}</TypographyH1>
                <div className="flex flex-col gap-4 w-full">
                    <Input
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        className="text-black placeholder-custom-primary-light py-5"
                        required
                    />
                    <Input
                        type="password"
                        placeholder={t('passwordPlaceholder')}
                        className="text-black placeholder-custom-primary-light py-5"
                        required
                    />
                    <Button
                        type="submit"
                        className="w-full bg-primary text-white rounded-md hover:bg-custom-primary-dark transition-colors duration-200 font-medium py-5"
                    >
                        {t('signIn')}
                    </Button>
                </div>

                <TypographyP className="text-center">
                    {t('noAccount')}{' '}
                    <Link
                        href={`/${locale}/register`}
                        className="text-primary hover:text-custom-primary-dark transition-colors duration-200"
                    >
                        {t('signUp')}
                    </Link>
                </TypographyP>
            </div>
        </div>
    );
}
