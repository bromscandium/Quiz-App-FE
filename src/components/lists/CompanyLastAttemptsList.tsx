'use client';

import { useEffect } from 'react';

import { useTranslations } from 'next-intl';

import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { readCompanyUsersLastAttemptsThunk } from '@libs/redux/slices/stats';
import { AppDispatch, RootState } from '@libs/redux/store';

interface CompanyLastAttemptsListProps {
  companyId: string;
  isOwnerOrAdmin: boolean;
}

export const CompanyLastAttemptsList = ({
  companyId,
  isOwnerOrAdmin,
}: CompanyLastAttemptsListProps) => {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();

  const { companyLastAttempts, loading, companyStatsError } = useSelector(
    (state: RootState) => state.stats
  );

  useEffect(() => {
    if (isOwnerOrAdmin) dispatch(readCompanyUsersLastAttemptsThunk(companyId));
  }, [dispatch, companyId]);

  if (loading) return null;

  if (companyStatsError) return null;

  if (!companyLastAttempts || companyLastAttempts.user_attempts.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          {t('stats.recentActivity')}
        </Typography>
        <List>
          {companyLastAttempts.user_attempts.map((attempt, index) => (
            <Box key={attempt.user_id}>
              {index > 0 && <Divider />}
              <ListItem>
                <ListItemText
                  primary={attempt.user_name}
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {attempt.last_attempt_at
                        ? `${t('stats.lastActivity')}: ${new Date(
                            attempt.last_attempt_at
                          ).toLocaleDateString()}`
                        : t('stats.noActivity')}
                    </Typography>
                  }
                />
              </ListItem>
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
