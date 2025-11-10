'use client';
import { CompanyCard } from '@templates/cards/company';
import { useTranslations } from 'next-intl';

const mockCompanies = [
    { id: '1', name: 'Acme Corp', owner: 'John', description: 'Tech company', isPrivate: true },
    { id: '2', name: 'Beta Ltd', owner: 'Jane', description: 'Marketing agency', isPrivate: false },
];

export default function CompaniesPage() {
    const t = useTranslations('companies');

    return (
        <div className="max-w-screen-xl mx-auto px-6 py-12">
            <h1 className="text-4xl text-text-primary font-bold mb-6">{t('title')}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {mockCompanies.map((company) => (
                    <CompanyCard key={company.id} {...company} />
                ))}
            </div>
        </div>
    );
}
