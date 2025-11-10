'use client';
import { CompanyCard } from '@templates/cards/company';
import { useTranslations } from 'next-intl';
import { TypographyH1 } from '@ui/typography';

const mockCompanies = [
    { id: '1', name: 'Acme Corp', owner: 'John', description: 'Tech company', isPrivate: true },
    { id: '2', name: 'Beta Ltd', owner: 'Jane', description: 'Marketing agency', isPrivate: false },
];

export default function CompaniesPage() {
    const t = useTranslations('companies');

    return (
        <div className="max-w-screen-xl mx-auto px-6 py-12 flex flex-col gap-6">
            <TypographyH1>{t('title')}</TypographyH1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {mockCompanies.map((company) => (
                    <CompanyCard key={company.id} {...company} />
                ))}
            </div>
        </div>
    );
}
