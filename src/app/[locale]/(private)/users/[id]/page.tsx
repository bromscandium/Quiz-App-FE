'use client';
import { useEffect } from 'react';

import { useParams } from 'next/navigation';

import { Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Profile from '@components/profile/Profile';

import { readUserByIdThunk } from '@libs/redux/slices/user';
import { AppDispatch, RootState } from '@libs/redux/store';

export default function UserPage() {
  const { id } = useParams();

  const userId = Array.isArray(id) ? id[0] : id;

  const dispatch = useDispatch<AppDispatch>();
  const { selectedUser: user, loading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (userId) dispatch(readUserByIdThunk(userId));
  }, [dispatch, userId]);

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
