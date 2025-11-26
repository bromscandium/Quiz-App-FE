'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { CompanyCard } from '@components/cards/CompanyCard';
import LoadingScreen from '@components/loading/LoadingScreen';
import Pagination from '@components/pagination/Pagination';

import { readAllCompaniesThunk } from '@libs/redux/slices/company';
import { readUserByMeThunk } from '@libs/redux/slices/user';
import { AppDispatch, RootState } from '@libs/redux/store';

export default function CompaniesPage() {
  const t = useTranslations('company');
  const dispatch = useDispatch<AppDispatch>();
  const { companies, loading } = useSelector(
    (state: RootState) => state.company
  );

  const { authUser } = useSelector((state: RootState) => state.user);

  const [page, setPage] = useState<number>(1);

  const limit = 9;
  const offset = (page - 1) * limit;

  useEffect(() => {
    if (!authUser) {
      dispatch(readUserByMeThunk());
    }

    dispatch(readAllCompaniesThunk({ offset, limit }));
  }, [authUser, dispatch, offset]);

  const visibleCompanies = (companies ?? []).filter(
    (c) => authUser?.id === c?.owner?.id || c.visibility
  );

  const totalPages = Math.ceil(visibleCompanies.length / limit);

  if (loading && (!companies || !authUser)) {
    return <LoadingScreen />;
  }

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
          gap: 2,
          gridAutoRows: 250,
          minHeight: 3 * 250 + 45,
        }}
      >
        {visibleCompanies?.map((company) => (
          <CompanyCard
            key={company.id}
            id={company.id}
            name={company.name}
            owner={company.owner}
            description={company.description}
            visibility={company.visibility}
          />
        ))}
      </Box>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </Box>
  );
}
