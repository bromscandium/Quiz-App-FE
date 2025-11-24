'use client';

import { useTranslations } from 'next-intl';

import { Box, Typography } from '@mui/material';

export default function ActivitiesPage() {
  const t = useTranslations('companies');

  return (
    <Box component="main">
      <Typography variant="h3" component="h2">
        {t('company.title')}
      </Typography>
      <Typography variant="h4" component="h4">
        {t('company.note')}
      </Typography>
    </Box>
  );
}
