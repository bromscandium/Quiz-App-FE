'use client';
import { useTranslations } from 'next-intl';

export default function RegisterPage() {
    const t = useTranslations('register');

    return <div className="min-h-screen flex items-center justify-center">{t('message')}</div>;
}
