'use client';
import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { UserCard } from '@components/cards/UserCard';
import Pagination from '@components/pagination/Pagination';

import { readAllUsersThunk } from '@libs/redux/slices/user';
import { AppDispatch, RootState } from '@libs/redux/store';

export default function UsersPage() {
  const t = useTranslations('users');
  const dispatch = useDispatch<AppDispatch>();
  const { users, total } = useSelector((state: RootState) => state.user);

  const [page, setPage] = useState(1);
  const limit = 9;

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(readAllUsersThunk({ offset: (page - 1) * limit, limit }));
  }, [page, dispatch]);

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
        {users.map((user) => (
          <Box key={user.id}>
            <UserCard {...user} />
          </Box>
        ))}
      </Box>

      <Pagination page={page} onChange={setPage} totalPages={totalPages} />
    </Box>
  );
}
