'use client';

import { useTranslations } from 'next-intl';

import { Env } from '@constants';
import { Box, Typography } from '@mui/material';

export default function HomePage() {
  const tHome = useTranslations('home');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 600,
        }}
      >
        <Typography variant="h2" component="h1" fontWeight="bold">
          {Env.APP_NAME}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {tHome('description')}
        </Typography>
      </Box>
    </Box>
  );
}
