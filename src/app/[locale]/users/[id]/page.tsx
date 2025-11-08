'use client';
import { useTranslations } from 'next-intl';

export default function UserPage() {
    const t = useTranslations('users');

    return (
        <div>
            <h1 className="text-4xl text-text-primary font-bold">{t('user.title')}</h1>
            <h3 className="text-2xl">{t('user.note')}</h3>
        </div>
    );
}
