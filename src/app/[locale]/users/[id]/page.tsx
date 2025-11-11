'use client';
import { useTranslations } from 'next-intl';
import { Box, Typography } from '@mui/material';

export default function UserPage() {
    const t = useTranslations('users');

    return (
        <Box component="main">
            <Typography variant="h3" component="h2">
                {t('user.title')}
            </Typography>
            <Typography variant="h4" component="h4">
                {t('user.note')}
            </Typography>
        </Box>
    );
}
