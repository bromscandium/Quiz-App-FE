'use client';

import { useTranslations } from 'next-intl';

import { Routes } from '@constants/routes';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';

import { useRouter } from '@libs/i18n/navigation';

type CompanyCardProps = {
  id: string;
  name: string;
  owner?: string;
  description?: string;
  visibility: boolean;
  mode?: 'list' | 'page';
  onViewActivities?: (id: string) => void;
};

export function CompanyCard({
  id,
  name,
  owner,
  description,
  visibility,
  mode = 'page',
  onViewActivities,
}: CompanyCardProps) {
  const t = useTranslations('companies');
  const router = useRouter();
  const theme = useTheme();

  if (!visibility) return null;

  const showOwner = mode === 'page';
  const isListMode = mode === 'list';

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
      {isListMode && (
        <Typography
          variant="caption"
          sx={{
            alignSelf: 'flex-start',
            px: 1,
            py: 0.5,
            mb: 1,
            fontWeight: 600,
            backgroundColor: visibility
              ? theme.palette.primary.dark
              : theme.palette.primary.main,
            color: visibility
              ? theme.palette.text.primary
              : theme.palette.primary.main,
          }}
        >
          {visibility ? t('public') : t('private')}
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
        {showOwner && (
          <Typography
            variant="body2"
            color="text.primary"
            fontWeight={500}
            sx={{ mb: 0.5 }}
          >
            {t('owner')}: {owner}
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary">
          {description || t('noDescription')}
        </Typography>

        {isListMode && onViewActivities && (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => onViewActivities(id)}
          >
            {t('viewActivities')}
          </Button>
        )}

        {!isListMode && (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => router.push(Routes.Companies.buildRoute(id))}
          >
            {t('viewCompany')}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
