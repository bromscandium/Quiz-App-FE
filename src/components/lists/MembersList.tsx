'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { Routes } from '@constants';
import { Roles } from '@enums';
import { SIX_LIMIT } from '@helpers/list';
import { getPaginationParams, handlePageChange } from '@helpers/queryParams';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { MembersCard } from '@components/cards/MembersCard';
import { Pagination } from '@components/pagination/Pagination';
import { ErrorScreen } from '@components/screens/ErrorScreen';
import { LoadingScreen } from '@components/screens/LoadingScreen';
import { NotFoundScreen } from '@components/screens/NotFoundScreen';

import { useRouter } from '@libs/i18n/navigation';
import { readCompanyMembersThunk } from '@libs/redux/slices/membership';
import { AppDispatch, RootState } from '@libs/redux/store';

interface MembersListProps {
  companyId: string;
  filterParam?: Roles;
}

export const MembersList = ({ companyId, filterParam }: MembersListProps) => {
  const t = useTranslations();

  const dispatch = useDispatch<AppDispatch>();
  const { companyMembers, loading, companyMembersTotal, error } = useSelector(
    (state: RootState) => state.membership
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  const { page, offset, totalPages } = getPaginationParams(
    searchParams,
    SIX_LIMIT,
    companyMembersTotal
  );

  const [currentPage, setCurrentPage] = useState<number>(page);

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
    handlePageChange(
      newPage,
      searchParams,
      router,
      Routes.Companies.buildRoute(companyId)
    );
  };

  useEffect(() => {
    dispatch(
      readCompanyMembersThunk({
        company_id: companyId,
        params: { offset, limit: SIX_LIMIT },
      })
    );
  }, [dispatch, offset, companyId]);

  if (loading) return <LoadingScreen />;

  if (error) return <ErrorScreen error={error} />;

  const filteredMembers = filterParam
    ? companyMembers?.filter((m) => m.role === filterParam)
    : companyMembers;

  if (!filteredMembers?.length)
    return NotFoundScreen(t('membership.noMembers'));

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
        {filteredMembers.map((member) => (
          <MembersCard key={member.id} member={member} />
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
