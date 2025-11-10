'use client';

import { useTranslations } from 'next-intl';
import DeleteButton from '@templates/buttons/delete';
import { TypographyH1, TypographyP } from '@ui/typography';

export default function HomePage() {
    const tHome = useTranslations('home');
    const tTest = useTranslations('test');

    return (
        <div className="max-w-screen-xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen px-6 gap-8">
            <div className="flex flex-col gap-4 items-center text-center max-w-xl">
                <TypographyH1>Quiz App</TypographyH1>
                <TypographyP>{tHome('description')}</TypographyP>
                <DeleteButton
                    itemName={tTest('testItemName')}
                    itemId={123}
                    onDelete={() => console.log('Deleted item')}
                />
            </div>
        </div>
    );
}
