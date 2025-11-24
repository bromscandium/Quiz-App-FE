'use client';

import { useMemo, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Box, Typography } from '@mui/material';

import { CompanyCard } from '@components/cards/CompanyCard';
import Pagination from '@components/pagination/Pagination';

const mockCompanies = [
  {
    id: '1',
    name: 'Acme Corp',
    owner: 'John',
    description: 'Tech company',
    visibility: true,
  },
  {
    id: '2',
    name: 'Beta Industries',
    owner: 'Jane',
    description: 'Manufacturing company',
    visibility: true,
  },
  {
    id: '3',
    name: 'Gamma Solutions',
    owner: 'Bob',
    description: 'Consulting firm',
    visibility: true,
  },
];

export default function CompaniesPage() {
  const t = useTranslations('companies');
  const [page, setPage] = useState(1);
  const limit = 9;

  const paginatedCompanies = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      companies: mockCompanies.slice(start, end),
      total: mockCompanies.length,
    };
  }, [page]);

  const totalPages = Math.ceil(paginatedCompanies.total / limit);

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
          gap: 3,
          gridAutoRows: '250px',
          flex: 1,
        }}
      >
        {paginatedCompanies.companies.map((company) => (
          <CompanyCard
            key={company.id}
            id={company.id}
            name={company.name}
            owner={company.owner}
            description={company.description}
            visibility={company.visibility}
            mode="page"
          />
        ))}
      </Box>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </Box>
  );
}
