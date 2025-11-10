'use client';

import { useTranslations } from 'next-intl';
import DeleteButton from '@templates/buttons/delete';

export default function HomePage() {
    const tHome = useTranslations('home');
    const tTest = useTranslations('test');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 gap-8">
            <div className="flex flex-col gap-4 items-center text-center max-w-xl">
                <h1 className="text-4xl font-bold text-text-primary">Quiz App</h1>
                <p className="text-xl text-text-secondary">{tHome('description')}</p>
                <DeleteButton
                    itemName={tTest('testItemName')}
                    itemId={123}
                    onDelete={() => console.log('Deleted item')}
                />
            </div>
        </div>
    );
}
