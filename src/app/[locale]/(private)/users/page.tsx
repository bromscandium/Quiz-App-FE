'use client';
import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { Routes } from '@constants';
import { getPaginationParams, handlePageChange } from '@helpers/queryParams';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { UserCard } from '@components/cards/UserCard';
import { Pagination } from '@components/pagination/Pagination';
import { ErrorScreen } from '@components/screens/ErrorScreen';
import { LoadingScreen } from '@components/screens/LoadingScreen';
import { notFoundScreen } from '@components/screens/NotFoundScreen';

import { useRouter } from '@libs/i18n/navigation';
import { readAllUsersThunk } from '@libs/redux/slices/user';
import { AppDispatch, RootState } from '@libs/redux/store';

const LIMIT = 9;

export default function UsersPage() {
  const t = useTranslations();

  const dispatch = useDispatch<AppDispatch>();
  const { users, total, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  const { page, offset, totalPages } = getPaginationParams(
    searchParams,
    LIMIT,
    total
  );

  const [currentPage, setCurrentPage] = useState<number>(page);

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
    handlePageChange(newPage, searchParams, router, Routes.Users.href);
  };

  useEffect(() => {
    dispatch(readAllUsersThunk({ offset, limit: LIMIT }));
  }, [dispatch, offset]);

  if (loading) return <LoadingScreen />;

  if (error) return <ErrorScreen error={error} />;

  if (!users?.length) return notFoundScreen(t('noUsers'));

  return (
    <Box
      sx={{
        maxWidth: '1300px',
        mx: 'auto',
        px: 3,
        py: 6,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        minHeight: 'calc(100vh - 250px)',
      }}
    >
      <Typography variant="h4" component="h2" fontWeight="bold">
        {t('users.title')}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
          gridAutoRows: 250,
          minHeight: 3 * 250 + 45,
        }}
      >
        {users?.map((user) => (
          <Box key={user.id}>
            <UserCard {...user} />
          </Box>
        ))}
      </Box>

      <Pagination
        page={currentPage}
        onChange={onPageChange}
        totalPages={totalPages}
      />
    </Box>
  );
}
