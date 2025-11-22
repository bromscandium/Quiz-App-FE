'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Routes } from '@constants';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { CompanyCard } from '@components/cards/CompanyCard';
import Pagination from '@components/pagination/Pagination';

import { useRouter } from '@libs/i18n/navigation';
import { readUserCompaniesThunk } from '@libs/redux/slices/user';
import { AppDispatch, RootState } from '@libs/redux/store';

interface CompaniesListProps {
  userId: string;
  isOwner: boolean;
}

export default function CompaniesList({ userId }: CompaniesListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations('companies');
  const router = useRouter();

  const [page, setPage] = useState<number>(1);

  const { userCompanies } = useSelector((state: RootState) => state.user);

  const limit = 6;

  useEffect(() => {
    const offset = (page - 1) * limit;
    dispatch(readUserCompaniesThunk({ id: userId, offset, limit }));
  }, [dispatch, page, userId]);

  const totalPages = userCompanies ? Math.ceil(userCompanies.total / limit) : 0;

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
          minHeight: 600,
        }}
      >
        {userCompanies.companies.map((company) => (
          <CompanyCard
            key={company.id}
            id={company.id}
            name={company.name}
            description={company.description}
            visibility={company.visibility}
            mode="list"
            onViewActivities={(id) =>
              router.push(Routes.Companies.buildActivitiesRoute(id))
            }
          />
        ))}
      </Box>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </Box>
  );
}
