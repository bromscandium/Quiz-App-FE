'use client';

import { useTranslations } from 'next-intl';

import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { UserSchema } from '@interfaces/user';

import { RootState } from '@libs/redux/store';

import Companies from './CompaniesList';
import UserInfo from './UserInfo';

interface ProfileProps {
  user: UserSchema | null;
}

export default function Profile({ user }: ProfileProps) {
  const t = useTranslations('profile');

  const { authUser } = useSelector((state: RootState) => state.user);

  const isOwner = authUser?.id === user?.id;

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
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        {t('userInfoTitle')}
      </Typography>
      <UserInfo user={user} isOwner={isOwner} />

      <Typography variant="h5" fontWeight={600}>
        {t('companiesTitle')}
      </Typography>

      <Companies userId={user?.id} isOwner={isOwner} />
    </Box>
  );
}
