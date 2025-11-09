'use client';

import { useTranslations } from 'next-intl';

export default function AboutUsPage() {
    const t = useTranslations('about');
    const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL!;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-text-primary flex flex-col gap-6">
            <h1 className="text-4xl font-bold">{t('title')}</h1>

            <p className="text-lg">{t('welcome')}</p>

            <h2 className="text-2xl font-semibold">{t('visionTitle')}</h2>
            <p>{t('visionText')}</p>

            <h2 className="text-2xl font-semibold">{t('offerTitle')}</h2>
            <ul className="list-disc list-inside flex flex-col gap-2">
                <li>{t('offerList.firstPoint')}</li>
                <li>{t('offerList.secondPoint')}</li>
                <li>{t('offerList.thirdPoint')}</li>
                <li>{t('offerList.fourthPoint')}</li>
            </ul>

            <h2 className="text-2xl font-semibold">{t('contactTitle')}</h2>
            <p>{t('contactQuestion')}</p>
            <p>
                {t('contactEmail', { email }) && (
                    <a className="text-primary hover:text-primary-dark" href={`mailto:${email}`}>
                        {email}
                    </a>
                )}
            </p>
            <p>{t('contactEnd')}</p>
        </div>
    );
}
