'use client';

import { useTranslations } from 'next-intl';

import { ActionTypes } from '@enums';
import { MembershipInterfaces } from '@interfaces';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';

import { CancelMembership } from '@components/buttons/CancelMembership';
import { CompanyModalButton } from '@components/buttons/CompanyModal';
import { CreateInvitationButton } from '@components/buttons/CreateInvitation';
import { SendCompanyActionButton } from '@components/buttons/SendCompanyAction';
import { InfoRow } from '@components/rows/InfoRow';

import { CompanySchema } from '@interfaces/company';
import { UserSchema } from '@interfaces/user';

interface CompanyInfoProps {
  company: CompanySchema;
  currentUser?: UserSchema;
  isOwner: boolean;
  userMembership?: MembershipInterfaces.UserMembership | null;
}

export const CompanyInfo = ({
  company,
  currentUser,
  isOwner,
  userMembership,
}: CompanyInfoProps) => {
  const t = useTranslations();

  const isMember = !!userMembership;
  const canLeave = isMember && !isOwner;
  const canJoin = !isMember && company.visibility && currentUser && !isOwner;

  return (
    <Paper elevation={1} sx={{ p: 4 }}>
      <Stack spacing={4}>
        <Box>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
          >
            <Typography variant="h4" fontWeight={700}>
              {company.name || t('common.notSet')}
            </Typography>

            <Stack direction="row" spacing={2}>
              {isOwner && <CompanyModalButton mode="edit" company={company} />}
              {isOwner && <CreateInvitationButton companyId={company.id} />}

              {canLeave && !isOwner && (
                <CancelMembership membershipId={userMembership.id} />
              )}

              {canJoin && !isOwner && (
                <SendCompanyActionButton
                  userId={currentUser.id}
                  companyId={company.id}
                  actionType={ActionTypes.REQUEST}
                  buttonText={t('companyActions.sendRequest')}
                />
              )}
            </Stack>
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" fontWeight={600} color="text.secondary">
            {t('company.description')}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2.5, color: 'text.primary' }}>
            {company.description || t('common.notSet')}
          </Typography>

          <Stack spacing={1} sx={{ mt: 1 }}>
            <InfoRow
              label={t('company.visibility')}
              value={
                company.visibility ? t('company.public') : t('company.private')
              }
            />
            <InfoRow
              label={t('company.created')}
              value={company.created_at?.slice(0, 10) || t('common.notSet')}
            />
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" fontWeight={600} color="text.secondary">
            {t('company.owner')}
          </Typography>
          <Stack spacing={1} sx={{ mt: 1 }}>
            <InfoRow
              label={t('profile.name')}
              value={company.owner?.name || t('common.notSet')}
            />
            <InfoRow
              label={t('profile.surname')}
              value={company.owner?.surname || t('common.notSet')}
            />
            <InfoRow
              label={t('profile.nickname')}
              value={
                company.owner?.nickname
                  ? `@${company.owner.nickname}`
                  : t('common.notSet')
              }
            />
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};
