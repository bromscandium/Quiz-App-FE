'use client';

import { useTranslations } from 'next-intl';

import { Env } from '@constants';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { UserGeneralRatingChart } from '@components/charts/UserGeneralRatingChart';
import { UserQuizScoresChart } from '@components/charts/UserQuizScoresChart';
import { UserLastAttemptsList } from '@components/lists/UserLastAttemptsList';

import { RootState } from '@libs/redux/store';

export default function HomePage() {
  const t = useTranslations();
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          maxWidth: 1300,
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" component="h1" fontWeight="bold">
            {Env.APP_NAME}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {t('home.description')}
          </Typography>
        </Box>

        <UserGeneralRatingChart userId={currentUser?.id} />
        <UserQuizScoresChart />
        <UserLastAttemptsList />
      </Box>
    </Box>
  );
}
