'use client';

import { useEffect } from 'react';

import { useParams } from 'next/navigation';

import { useDispatch, useSelector } from 'react-redux';

import LoadingScreen from '@components/loading/LoadingScreen';
import Profile from '@components/profile/Profile';

import {
  clearSelectedUser,
  readUserByIdThunk,
  readUserByMeThunk,
} from '@libs/redux/slices/user';
import { AppDispatch, RootState } from '@libs/redux/store';

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedUser, authUser, loading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (!id) return;

    if (!authUser) {
      dispatch(readUserByMeThunk());
    }

    if (!selectedUser || selectedUser.id !== id) {
      dispatch(clearSelectedUser());
      dispatch(readUserByIdThunk(id));
    }
  }, [dispatch, authUser, id, selectedUser]);

  if (loading) {
    return <LoadingScreen />;
  }

  return <Profile user={selectedUser} />;
}
