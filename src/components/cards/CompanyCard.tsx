'use client';

import { useTranslations } from 'next-intl';

import { Routes } from '@constants/routes';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';

import { UserSchema } from '@interfaces/user';

import { useRouter } from '@libs/i18n/navigation';

type CompanyCardProps = {
  id: string;
  name: string;
  owner?: UserSchema | null;
  description?: string;
  visibility: boolean;
};

export function CompanyCard({
  id,
  name,
  owner,
  description,
  visibility,
}: CompanyCardProps) {
  const t = useTranslations('company');
  const router = useRouter();
  const theme = useTheme();

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
          backgroundColor: visibility
            ? theme.palette.success.main
            : theme.palette.error.main,
          color: theme.palette.secondary.contrastText,
        }}
      >
        {visibility ? t('public') : t('private')}
      </Typography>

      {owner && (
        <Typography
          variant="body2"
          color="text.primary"
          fontWeight={500}
          sx={{ mb: 0.5 }}
        >
          {t('owner')}: {owner?.name} {owner?.surname}
        </Typography>
      )}
      <CardHeader
        title={name}
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
          {description || t('noDescription')}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => router.push(Routes.Companies.buildRoute(id))}
        >
          {t('viewCompany')}
        </Button>
      </CardContent>
    </Card>
  );
}
