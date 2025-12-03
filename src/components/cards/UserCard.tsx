'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { Routes } from '@constants';
import { QueryParams } from '@enums';
import { getInvitationIDParam } from '@helpers/queryParams';
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

export const UserCard = ({ id, name, surname, nickname }: UserCardProps) => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const invitationId = getInvitationIDParam(searchParams);

    router.push({
      pathname: Routes.Profile.buildRoute(id),
      query: { [QueryParams.INVITATION_ID]: invitationId },
    });
  };

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
          onClick={() => handleClick()}
        >
          {t('viewProfile')}
        </Button>
      </CardContent>
    </Card>
  );
};
