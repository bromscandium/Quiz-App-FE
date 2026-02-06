'use client';

import { useTranslations } from 'next-intl';

import { Routes } from '@constants';
import { QueryParams } from '@enums';
import { Button, Typography } from '@mui/material';

import { useRouter } from '@libs/i18n/navigation';

type CreateInvitationProps = {
  companyId: string;
};

export const CreateInvitationButton = ({
  companyId,
}: CreateInvitationProps) => {
  const t = useTranslations();
  const router = useRouter();

  const handleInvite = () => {
    router.push({
      pathname: Routes.Users.href,
      query: { [QueryParams.INVITATION_ID]: companyId },
    });
  };

  return (
    <Button color="primary" variant="contained" onClick={handleInvite}>
      <Typography>{t('common.createInvitation')}</Typography>
    </Button>
  );
};
