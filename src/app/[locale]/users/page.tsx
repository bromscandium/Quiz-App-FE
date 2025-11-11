'use client';
import { UserCard } from '@templates/cards/user';
import { useTranslations } from 'next-intl';
import { Box, Typography } from '@mui/material';

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
        id: '3',
        name: 'Jane',
        surname: 'Smith',
        nickname: 'janes',
        email: 'jane@example.com',
        created_at: '2023-09-15',
    },
    {
        id: '4',
        name: 'Jane',
        surname: 'Smith',
        nickname: 'janes',
        email: 'jane@example.com',
        created_at: '2023-09-15',
    },
    {
        id: '4',
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
        <Box
            sx={{
                maxWidth: '1200px',
                mx: 'auto',
                px: 3,
                py: 6,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
            }}
        >
            <Typography variant="h4" component="h2" fontWeight="bold">
                {t('title')}
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                    },
                    gap: 3,
                }}
            >
                {mockUsers.map((user) => (
                    <Box key={user.id}>
                        <UserCard {...user} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
