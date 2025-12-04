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

import { readUserStatsLastAttemptsThunk } from '@libs/redux/slices/stats';
import { AppDispatch, RootState } from '@libs/redux/store';

interface UserLastAttemptsListProps {
  companyId?: string;
}

export const UserLastAttemptsList = ({
  companyId,
}: UserLastAttemptsListProps) => {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();

  const { userLastAttempts, loading } = useSelector(
    (state: RootState) => state.stats
  );

  useEffect(() => {
    dispatch(readUserStatsLastAttemptsThunk({ company_id: companyId }));
  }, [dispatch, companyId]);

  if (loading) return null;

  if (!userLastAttempts || userLastAttempts.user_attempts.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            {t('stats.recentQuizzes')}
          </Typography>
          <Typography color="text.secondary">
            {t('stats.noRecentAttempts')}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          {t('stats.recentQuizzes')}
        </Typography>
        <List>
          {userLastAttempts.user_attempts.map((attempt, index) => (
            <Box key={attempt.quiz_id}>
              {index > 0 && <Divider />}
              <ListItem>
                <ListItemText
                  primary={attempt.quiz_title}
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {t('stats.completed')}:{' '}
                      {new Date(attempt.last_attempt_at).toLocaleDateString()}
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
