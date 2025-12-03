import { ReactNode, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { readUserByMeThunk } from '@libs/redux/slices/user';
import { AppDispatch } from '@libs/redux/store';

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(readUserByMeThunk());
  }, []);

  return children;
};
