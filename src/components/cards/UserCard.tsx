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
} from '@mui/material';

import { useRouter } from '@libs/i18n/navigation';

type UserCardProps = {
  id: string;
  name: string;
  surname?: string;
  nickname: string;
};

export function UserCard({ id, name, surname, nickname }: UserCardProps) {
  const t = useTranslations('users');
  const router = useRouter();

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
      <CardHeader
        title={`${name} ${surname}`}
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
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontStyle: 'italic',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            @{nickname}
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => router.push(Routes.Profile.buildRoute(id))}
        >
          {t('viewProfile')}
        </Button>
      </CardContent>
    </Card>
  );
}
