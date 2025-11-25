'use client';

import { useEffect } from 'react';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import CompanyModalButton from '@components/buttons/CompanyModal';
import LoadingScreen from '@components/loading/LoadingScreen';
import { InfoRow } from '@components/rows/Info';

import {
  clearSelectedCompany,
  readCompanyByIdThunk,
} from '@libs/redux/slices/company';
import { readUserByMeThunk } from '@libs/redux/slices/user';
import { AppDispatch, RootState } from '@libs/redux/store';

export default function CompanyPage() {
  const { id } = useParams<{ id: string }>();
  const t = useTranslations('company');
  const tCommon = useTranslations('common');
  const tProfile = useTranslations('profile');
  const dispatch = useDispatch<AppDispatch>();

  const { selectedCompany, loading } = useSelector(
    (state: RootState) => state.company
  );
  const { authUser } = useSelector((state: RootState) => state.user);

  const isOwner = authUser?.id === selectedCompany?.owner?.id;

  useEffect(() => {
    if (!id) return;

    if (!authUser) {
      dispatch(readUserByMeThunk());
    }

    if (!selectedCompany || selectedCompany.id !== id) {
      dispatch(clearSelectedCompany());
      dispatch(readCompanyByIdThunk(id));
    }
  }, [dispatch, authUser, id, selectedCompany]);

  if (loading || !selectedCompany) {
    return <LoadingScreen />;
  }

  return (
    <Box
      sx={{
        maxWidth: '1300px',
        mx: 'auto',
        px: 3,
        py: 6,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 4,
        }}
      >
        <Stack spacing={4}>
          <Box>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              spacing={2}
            >
              <Typography variant="h4" fontWeight={700}>
                {selectedCompany?.name}
              </Typography>

              {isOwner && (
                <CompanyModalButton mode="edit" company={selectedCompany!} />
              )}
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" fontWeight={600} color="text.secondary">
              {t('description')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 2.5,
                color: 'text.primary',
              }}
            >
              {selectedCompany?.description ||
                tCommon('notSet')}
            </Typography>

            <Stack spacing={1} sx={{ mt: 1 }}>
              <InfoRow
                label={t('visibility')}
                value={
                  selectedCompany?.visibility
                    ? t('public')
                    : t('private')
                }
              />
              <InfoRow
                label={t('created')}
                value={selectedCompany?.created_at?.slice(0, 10)}
              />
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography
              variant="h6"
              fontWeight={600}
              color="text.secondary"
            >
              {t('owner')}
            </Typography>
            <Stack spacing={1} sx={{ mt: 1 }}>
              <InfoRow
                label={tProfile('name')}
                value={selectedCompany?.owner?.name}
              />
              {selectedCompany?.owner?.surname && (
                <InfoRow
                  label={tProfile('surname')}
                  value={selectedCompany?.owner.surname}
                />
              )}
              {selectedCompany?.owner?.nickname && (
                <InfoRow
                  label={tProfile('nickname')}
                  value={`@${selectedCompany?.owner.nickname}`}
                />
              )}
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
