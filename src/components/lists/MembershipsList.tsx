'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { Routes } from '@constants';
import { getPaginationParams, handlePageChange } from '@helpers/queryParams';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { MembershipCard } from '@components/cards/MembershipCard';
import { Pagination } from '@components/pagination/Pagination';
import { ErrorScreen } from '@components/screens/ErrorScreen';
import { LoadingScreen } from '@components/screens/LoadingScreen';
import { NotFoundScreen } from '@components/screens/NotFoundScreen';

import { useRouter } from '@libs/i18n/navigation';
import { readUserMembershipsThunk } from '@libs/redux/slices/membership';
import { AppDispatch, RootState } from '@libs/redux/store';

interface MembershipListProps {
  userId: string;
}

const LIMIT = 6;

export const MembershipsList = ({ userId }: MembershipListProps) => {
  const t = useTranslations();

  const dispatch = useDispatch<AppDispatch>();
  const { memberships, loading, total, error } = useSelector(
    (state: RootState) => state.membership
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
    handlePageChange(
      newPage,
      searchParams,
      router,
      Routes.Profile.buildRoute(userId)
    );
  };

  useEffect(() => {
    dispatch(readUserMembershipsThunk({ params: { offset, limit: LIMIT } }));
  }, [dispatch, offset, userId]);

  if (loading) return <LoadingScreen />;

  if (error) return <ErrorScreen error={error} />;

  if (!memberships?.length) return NotFoundScreen(t('membership.noMembers'));

  return (
    <Box>
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
          minHeight: 2 * 250 + 16,
        }}
      >
        {memberships.map((membership) => (
          <MembershipCard key={membership.id} membership={membership} />
        ))}
      </Box>

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onChange={onPageChange}
      />
    </Box>
  );
};
