'use client';
import { UserCard } from '@templates/cards/user';
import { useTranslations } from 'next-intl';
import { TypographyH1 } from '@ui/typography';

const mockUsers = [
    {
        id: '1',
        name: 'John',
        surname: 'Doe',
        nickname: 'johnd',
        email: 'john@example.com',
        created_at: '2023-10-01',
    },
    {
        id: '2',
        name: 'Jane',
        surname: 'Smith',
        nickname: 'janes',
        email: 'jane@example.com',
        created_at: '2023-09-15',
    },
    {
        id: '2',
        name: 'Jane',
        surname: 'Smith',
        nickname: 'janes',
        email: 'jane@example.com',
        created_at: '2023-09-15',
    },
    {
        id: '2',
        name: 'Jane',
        surname: 'Smith',
        nickname: 'janes',
        email: 'jane@example.com',
        created_at: '2023-09-15',
    },
];

export default function UsersPage() {
    const t = useTranslations('users');

    return (
        <div className="max-w-screen-xl mx-auto px-6 py-12 flex flex-col gap-6">
            <TypographyH1>{t('title')}</TypographyH1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {mockUsers.map((user) => (
                    <UserCard key={user.id} {...user} />
                ))}
            </div>
        </div>
    );
}
