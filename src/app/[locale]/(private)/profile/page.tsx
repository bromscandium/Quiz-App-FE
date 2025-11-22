'use client';

import { useEffect } from 'react';

import { Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Profile from '@components/profile/Profile';

import { readUserByMe } from '@libs/redux/slices/user';
import { AppDispatch, RootState } from '@libs/redux/store';

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUser: user, loading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(readUserByMe());
  }, [dispatch]);

  if (loading || !user) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return <Profile user={user} />;
}
