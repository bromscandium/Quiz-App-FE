'use client';

import { useEffect, useRef } from 'react';

import { useTranslations } from 'next-intl';

import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';

import { readUserStatsQuizzesThunk } from '@libs/redux/slices/stats';
import { AppDispatch, RootState } from '@libs/redux/store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface UserQuizScoresChartProps {
  companyId?: string;
}

export const UserQuizScoresChart = ({
  companyId,
}: UserQuizScoresChartProps) => {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();

  const { userQuizzes, loading } = useSelector(
    (state: RootState) => state.stats
  );

  useEffect(() => {
    dispatch(readUserStatsQuizzesThunk({ company_id: companyId }));
  }, [dispatch, companyId]);

  if (loading) return null;

  if (!userQuizzes || userQuizzes.user_attempts.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            {t('stats.quizScoresOverTime')}
          </Typography>
          <Typography color="text.secondary">
            {t('stats.noQuizAttempts')}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const chartData = {
    labels: userQuizzes.user_attempts.map((quiz) => quiz.quiz_title),
    datasets: [
      {
        label: t('stats.avgScore'),
        data: userQuizzes.user_attempts.map((quiz) => quiz.average_score),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: t('stats.attempts'),
        data: userQuizzes.user_attempts.map((quiz) => quiz.attempts_count),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          {t('stats.quizScoresOverTime')}
        </Typography>
        <Box sx={{ height: 400 }}>
          <Bar data={chartData} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};
