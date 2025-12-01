'use client';

import { useTranslations } from 'next-intl';

import { ActionStatuses, ActionTypes } from '@enums';
import { CompanyActionsInterfaces } from '@interfaces';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';

import { UpdateCompanyActionButton } from '@components/buttons/UpdateCompanyAction';

interface CompanyActionProps {
  action: CompanyActionsInterfaces.CompanyActionSchema;
  actionType?: ActionTypes;
  companyId?: string;
}

export const CompanyActionsCard = ({
  action,
  actionType,
  companyId,
}: CompanyActionProps) => {
  const t = useTranslations('');

  const { company, user } = action;

  const getActionLabel = () => {
    switch (actionType) {
      case ActionTypes.REQUEST:
        return t('companyActions.requestsTitle');
      case ActionTypes.INVITATION:
        return t('companyActions.invitationsTitle');
      default:
        return t('companyActions.title');
    }
  };

  const getActionButtons = () => {
    if (!company || !user) return [];

    switch (actionType) {
      case ActionTypes.REQUEST:
        return companyId
          ? [
              <UpdateCompanyActionButton
                key="accept"
                actionId={action.id}
                newStatus={ActionStatuses.ACCEPTED}
              />,
              <UpdateCompanyActionButton
                key="cancel"
                actionId={action.id}
                newStatus={ActionStatuses.CANCELLED}
              />,
            ]
          : [
              <UpdateCompanyActionButton
                key="cancel"
                actionId={action.id}
                newStatus={ActionStatuses.CANCELLED}
              />,
            ];

      case ActionTypes.INVITATION:
        return companyId
          ? [
              <UpdateCompanyActionButton
                key="cancel"
                actionId={action.id}
                newStatus={ActionStatuses.CANCELLED}
              />,
            ]
          : [
              <UpdateCompanyActionButton
                key="accept"
                actionId={action.id}
                newStatus={ActionStatuses.ACCEPTED}
              />,
              <UpdateCompanyActionButton
                key="cancel"
                actionId={action.id}
                newStatus={ActionStatuses.CANCELLED}
              />,
            ];

      default:
        return [];
    }
  };

  const backgroundColor =
    actionType === ActionTypes.REQUEST
      ? 'warning.main'
      : actionType === ActionTypes.INVITATION
        ? 'success.main'
        : 'info.main';

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
          backgroundColor,
          color: 'secondary.contrastText',
        }}
      >
        {getActionLabel()}
      </Typography>

      <CardHeader
        title={company?.name}
        subheader={user?.nickname}
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
          justifyContent: 'space-between',
          flex: 1,
          p: 0,
          pt: 1,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
          {getActionButtons()}
        </Box>
      </CardContent>
    </Card>
  );
};
