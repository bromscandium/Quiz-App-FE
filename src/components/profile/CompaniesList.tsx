'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { CompanyCard } from '@components/cards/CompanyCard';
import Pagination from '@components/pagination/Pagination';

import { readUserCompaniesThunk } from '@libs/redux/slices/user';
import { AppDispatch, RootState } from '@libs/redux/store';

interface CompaniesListProps {
  userId: string | undefined;
  isOwner: boolean;
}

export default function CompaniesList({ userId, isOwner }: CompaniesListProps) {
  const t = useTranslations('company');
  const dispatch = useDispatch<AppDispatch>();
  const { userCompanies } = useSelector((state: RootState) => state.user);

  const [page, setPage] = useState<number>(1);

  const limit = 6;
  const offset = (page - 1) * limit;
  const totalPages = userCompanies ? Math.ceil(userCompanies.total / limit) : 0;

  useEffect(() => {
    if (!userId) return;
    dispatch(readUserCompaniesThunk({ id: userId, params: { offset, limit } }));
  }, [dispatch, offset, userId]);

  const visibleCompanies = userCompanies?.companies.filter(
    (c) => isOwner || c.visibility
  );

  if (!userCompanies?.companies?.length) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 200,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          {t('noCompanies')}
        </Typography>
      </Box>
    );
  }

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
        {visibleCompanies?.map((company) => (
          <CompanyCard
            key={company.id}
            id={company.id}
            name={company.name}
            description={company.description}
            visibility={company.visibility}
          />
        ))}
      </Box>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </Box>
  );
}
