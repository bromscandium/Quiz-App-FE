'use client';
import { UserCard } from '@templates/cards/user';
import { useTranslations } from 'next-intl';

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
];

export default function UsersPage() {
    const t = useTranslations('users');

    return (
        <div className="max-w-screen-xl mx-auto px-6 py-12">
            <h1 className="text-4xl text-text-primary font-bold mb-6">{t('title')}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {mockUsers.map((user) => (
                    <UserCard key={user.id} {...user} />
                ))}
            </div>
        </div>
    );
}
