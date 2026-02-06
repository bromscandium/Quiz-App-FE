'use client';

import { useEffect } from 'react';

import { useTranslations } from 'next-intl';

import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';

import { readCompanyUsersStatsThunk } from '@libs/redux/slices/stats';
import { AppDispatch, RootState } from '@libs/redux/store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CompanyUsersStatsChartProps {
  companyId: string;
  isOwnerOrAdmin: boolean;
}

export const CompanyUsersStatsChart = ({
  companyId,
  isOwnerOrAdmin,
}: CompanyUsersStatsChartProps) => {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();

  const { companyUserStats, loading, companyStatsError } = useSelector(
    (state: RootState) => state.stats
  );

  useEffect(() => {
    if (isOwnerOrAdmin)
      dispatch(readCompanyUsersStatsThunk({ companyId, params: {} }));
  }, [dispatch, companyId]);

  if (companyStatsError) return null;

  if (loading) return null;

  if (!companyUserStats || companyUserStats.user_stats.length === 0) {
    return null;
  }

  const chartData = {
    labels: companyUserStats.user_stats.map((user) => user.user_name),
    datasets: [
      {
        label: t('stats.avgScore'),
        data: companyUserStats.user_stats.map((user) => user.average_score),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
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
        max: 100,
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          {t('stats.usersStatistics')}
        </Typography>
        <Box sx={{ height: 400 }}>
          <Line data={chartData} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};
