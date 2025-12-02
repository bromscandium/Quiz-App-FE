'use client';

import { useMemo } from 'react';

import { useTranslations } from 'next-intl';

import { actionConfig } from '@constants';
import { ActionStatuses, ActionTypes } from '@enums';
import { CompanyActionsInterfaces } from '@interfaces';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from '@mui/material';

import { UpdateCompanyActionButton } from '@components/buttons/UpdateCompanyAction';

interface CompanyActionProps {
  action: CompanyActionsInterfaces.CompanyActionSchema;
  actionType?: ActionTypes;
  companyId?: string;
}

type ButtonConfig = {
  status: ActionStatuses;
  key: string;
};

export const CompanyActionsCard = ({
  action,
  actionType,
  companyId,
}: CompanyActionProps) => {
  const t = useTranslations();
  const { company, user } = action;

  const currentActionConfig = useMemo(() => {
    if (!actionType) return actionConfig.DEFAULT;
    return actionConfig[actionType] || actionConfig.DEFAULT;
  }, [actionType]);

  const buttons = useMemo((): ButtonConfig[] => {
    if (!company || !user || !actionType) return [];

    const isOwner = !!companyId;

    if (actionType === ActionTypes.REQUEST) {
      return isOwner
        ? [
            { status: ActionStatuses.ACCEPTED, key: 'accept' },
            { status: ActionStatuses.CANCELLED, key: 'cancel' },
          ]
        : [{ status: ActionStatuses.CANCELLED, key: 'cancel' }];
    }

    if (actionType === ActionTypes.INVITATION) {
      return isOwner
        ? [{ status: ActionStatuses.CANCELLED, key: 'cancel' }]
        : [
            { status: ActionStatuses.ACCEPTED, key: 'accept' },
            { status: ActionStatuses.CANCELLED, key: 'cancel' },
          ];
    }

    return [];
  }, [actionType, companyId, company, user]);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: 1,
        borderColor: 'divider',
        p: 2,
        minHeight: 250,
        transition: 'box-shadow 0.3s',
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <Chip
        label={t(currentActionConfig.labelKey)}
        size="small"
        sx={{
          alignSelf: 'flex-start',
          mb: 1.5,
          fontWeight: 600,
          backgroundColor: currentActionConfig.color,
          color: 'secondary.contrastText',
        }}
      />

      <CardHeader
        title={company?.name || t('common.unknown')}
        subheader={user?.nickname || t('common.unknown')}
        sx={{ p: 0, mb: 1 }}
        slotProps={{
          title: {
            variant: 'h6',
            fontWeight: 700,
            noWrap: true,
          },
          subheader: {
            variant: 'body2',
            color: 'text.secondary',
            noWrap: true,
          },
        }}
      />

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          p: 0,
          '&:last-child': { pb: 0 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            mt: 'auto',
            flexWrap: 'wrap',
          }}
        >
          {buttons.map(({ status, key }) => (
            <UpdateCompanyActionButton
              key={key}
              actionId={action.id}
              newStatus={status}
            />
          ))}
        </Box>

        {buttons.length === 0 && (
          <Typography
            variant="body2"
            color="text.disabled"
            sx={{ mt: 'auto', fontStyle: 'italic' }}
          >
            {t('companyActions.noActionsAvailable')}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
