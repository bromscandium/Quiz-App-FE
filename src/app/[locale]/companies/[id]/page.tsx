'use client';

import { useTranslations } from 'next-intl';

export default function CompanyPage() {
    const t = useTranslations('companies');

    return (
        <div>
            <h1 className="text-4xl text-text-primary font-bold">{t('company.title')}</h1>
            <h3 className="text-2xl">{t('company.note')}</h3>
        </div>
    );
}
