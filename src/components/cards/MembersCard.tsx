'use client';

import { useTranslations } from 'next-intl';

import { MembershipInterfaces } from '@interfaces';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { MembershipModalButton } from '@components/buttons/MembershipModal';

import { RootState } from '@libs/redux/store';

type MembersCardProps = {
  member: MembershipInterfaces.CompanyMembership;
};

export const MembersCard = ({ member }: MembersCardProps) => {
  const t = useTranslations();
  const theme = useTheme();

  const { currentUser } = useSelector((state: RootState) => state.user);

  const { user, role } = member;

  const isOwner = currentUser?.id === user?.id;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        p: 2,
        minHeight: 250,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          alignSelf: 'flex-start',
          px: 1,
          py: 0.5,
          mb: 1,
          fontWeight: 600,
          backgroundColor:
            role === 'owner'
              ? theme.palette.success.main
              : theme.palette.warning.main,
          color: theme.palette.secondary.contrastText,
        }}
      >
        {t(`profile.${role}`)}
      </Typography>

      <CardHeader
        title={user?.name}
        subheader={user?.email}
        sx={{ p: 0 }}
        slotProps={{
          title: { variant: 'h6', fontWeight: 700 },
          subheader: { variant: 'body2', color: 'text.secondary' },
        }}
      />

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          flex: 1,
          p: 0,
          pt: 1,
        }}
      >
        {!isOwner && (
          <Box sx={{ mt: 'auto' }}>
            <MembershipModalButton member={member} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
