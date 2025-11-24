'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { getCurrentUserFromToken } from '@helpers/decoder';
import { Box, Typography } from '@mui/material';

import { UserSchema } from '@interfaces/user';

import Companies from './CompaniesList';
import UserInfo from './UserInfo';

interface ProfileProps {
  user: UserSchema;
}

export default function Profile({ user }: ProfileProps) {
  const t = useTranslations('profile');

  const [isOwner, setOwner] = useState<boolean>(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getCurrentUserFromToken();
      const id = currentUser?.sub ?? null;
      setOwner(id === user.id);
    };
    fetchCurrentUser();
  }, [user.id]);

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

      <Companies userId={user.id} isOwner={isOwner} />
    </Box>
  );
}
