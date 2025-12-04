'use client';

import { useEffect } from 'react';

import { useTranslations } from 'next-intl';

import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';

import { readUserStatsThunk } from '@libs/redux/slices/stats';
import { AppDispatch, RootState } from '@libs/redux/store';

ChartJS.register(ArcElement, Tooltip, Legend);

interface UserGeneralRatingChartProps {
  userId?: string;
  companyId?: string;
}

export const UserGeneralRatingChart = ({
  userId,
  companyId,
}: UserGeneralRatingChartProps) => {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();

  const { userStats, loading } = useSelector((state: RootState) => state.stats);

  useEffect(() => {
    dispatch(readUserStatsThunk({ user_id: userId, company_id: companyId }));
  }, [dispatch, companyId]);

  if (loading || !userStats) return null;

  const correctPercentage = userStats.average_score;
  const incorrectPercentage = 100 - correctPercentage;

  const chartData = {
    labels: [t('stats.correctAnswers'), t('stats.incorrectAnswers')],
    datasets: [
      {
        data: [correctPercentage, incorrectPercentage],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          {t('stats.generalRating')}
        </Typography>
        <Grid spacing={3}>
          <Box sx={{ height: 300 }}>
            <Doughnut data={chartData} options={options} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('stats.averageScore')}
              </Typography>
              <Typography variant="h3" fontWeight={600}>
                {userStats.average_score.toFixed(2)}%
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('stats.correctAnswers')}
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {userStats.total_correct_answers} /{' '}
                {userStats.total_answered_questions}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('stats.lastAttempt')}
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {userStats.last_attempt_at
                  ? new Date(userStats.last_attempt_at).toLocaleDateString()
                  : t('stats.noAttempts')}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};
