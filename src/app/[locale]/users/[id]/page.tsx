'use client';
import { useTranslations } from 'next-intl';
import { TypographyH1, TypographyH3 } from '@ui/typography';

export default function UserPage() {
    const t = useTranslations('users');

    return (
        <div className="max-w-screen-xl mx-auto px-6 py-12">
            <TypographyH1>{t('user.title')}</TypographyH1>
            <TypographyH3>{t('user.note')}</TypographyH3>
        </div>
    );
}
