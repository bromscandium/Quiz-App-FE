'use client';

import { useTranslations } from 'next-intl';
import { TypographyH1, TypographyH3 } from '@ui/typography';

export default function CompanyPage() {
    const t = useTranslations('companies');

    return (
        <div>
            <TypographyH1>{t('company.title')}</TypographyH1>
            <TypographyH3>{t('company.note')}</TypographyH3>
        </div>
    );
}
