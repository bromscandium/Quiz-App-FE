'use client';

import { useTranslations } from 'next-intl';

import { Routes } from '@constants/routes';
import { redirectWithLocale } from '@helpers/redirect';
import { MembershipInterfaces } from '@interfaces';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';

import { useRouter } from '@libs/i18n/navigation';

type MembershipCardProps = {
  membership: MembershipInterfaces.UserMembership;
};

export const MembershipCard = ({ membership }: MembershipCardProps) => {
  const t = useTranslations('');
  const theme = useTheme();

  const { company, role } = membership;

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
        title={company?.name}
        sx={{ p: 0 }}
        slotProps={{ title: { variant: 'h6', fontWeight: 700 } }}
      />

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          p: 0,
          pt: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {company?.description || t('company.noDescription')}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() =>
            redirectWithLocale(Routes.Companies.buildRoute(company!.id))
          }
        >
          {t('membership.viewMembership')}
        </Button>
      </CardContent>
    </Card>
  );
};
