'use client';

import { useTranslations } from 'next-intl';
import {
    TypographyH1,
    TypographyH2,
    TypographyList,
    TypographyListItem,
    TypographyP,
} from '@ui/typography';
import Link from 'next/link';

export default function AboutUsPage() {
    const t = useTranslations('about');
    const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL!;

    const offerPoints = [
        'offerList.firstPoint',
        'offerList.secondPoint',
        'offerList.thirdPoint',
        'offerList.fourthPoint',
    ];

    return (
        <div className="max-w-screen-xl mx-auto px-6 py-12 flex flex-col gap-6">
            <TypographyH1>{t('title')}</TypographyH1>
            <TypographyP>{t('welcome')}</TypographyP>
            <TypographyH2>{t('visionTitle')}</TypographyH2>
            <TypographyP>{t('visionText')}</TypographyP>
            <TypographyH2>{t('offerTitle')}</TypographyH2>
            <TypographyList>
                {offerPoints.map((key) => (
                    <TypographyListItem key={key}>{t(key)}</TypographyListItem>
                ))}
            </TypographyList>
            <TypographyH2>{t('contactTitle')}</TypographyH2>
            <TypographyP>
                {t('contactQuestion')}
                <br />
                {t('contactEmail', { email }) && (
                    <Link className="text-primary hover:text-primary-dark" href={`mailto:${email}`}>
                        {email}
                    </Link>
                )}
                <br />
                {t('contactEnd')}
            </TypographyP>
        </div>
    );
}
