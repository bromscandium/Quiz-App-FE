'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { Routes } from '@constants';
import { getPaginationParams, handlePageChange } from '@helpers/queryParams';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { CompanyCard } from '@components/cards/CompanyCard';
import { Pagination } from '@components/pagination/Pagination';
import { ErrorScreen } from '@components/screens/ErrorScreen';
import { LoadingScreen } from '@components/screens/LoadingScreen';
import { NotFoundScreen } from '@components/screens/NotFoundScreen';

import { useRouter } from '@libs/i18n/navigation';
import { readUserCompaniesThunk } from '@libs/redux/slices/user';
import { AppDispatch, RootState } from '@libs/redux/store';

interface CompaniesListProps {
  userId: string;
}

const LIMIT = 6;

export const UserCompaniesList = ({ userId }: CompaniesListProps) => {
  const t = useTranslations();

  const dispatch = useDispatch<AppDispatch>();
  const { userCompanies, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  const { page, offset, totalPages } = getPaginationParams(
    searchParams,
    LIMIT,
    userCompanies?.total
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
    dispatch(
      readUserCompaniesThunk({ id: userId, params: { offset, limit: LIMIT } })
    );
  }, [dispatch, offset, userId]);

  if (loading) return <LoadingScreen />;

  if (error) return <ErrorScreen error={error} />;

  if (!userCompanies?.companies?.length)
    return NotFoundScreen(t('company.noCompanies'));

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
        {userCompanies.companies.map((company) => (
          <CompanyCard
            key={company.id}
            id={company.id}
            name={company.name}
            description={company.description}
            visibility={company.visibility}
          />
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
