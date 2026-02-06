'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { Routes } from '@constants/routes';
import { ActionTypes } from '@enums';
import { SIX_LIMIT } from '@helpers/list';
import { getPaginationParams, handlePageChange } from '@helpers/queryParams';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { CompanyActionsCard } from '@components/cards/CompanyActionsCard';
import { Pagination } from '@components/pagination/Pagination';
import { ErrorScreen } from '@components/screens/ErrorScreen';
import { LoadingScreen } from '@components/screens/LoadingScreen';
import { NotFoundScreen } from '@components/screens/NotFoundScreen';

import { useRouter } from '@libs/i18n/navigation';
import { readAllCompanyActionsThunk } from '@libs/redux/slices/companyActions';
import { AppDispatch, RootState } from '@libs/redux/store';

interface CompanyActionsListProps {
  userId?: string;
  companyId?: string;
  actionType?: ActionTypes;
}

export const CompanyActionsList = ({
  userId,
  companyId,
  actionType,
}: CompanyActionsListProps) => {
  const t = useTranslations();

  const dispatch = useDispatch<AppDispatch>();
  const { actions, loading, total, error } = useSelector(
    (state: RootState) => state.companyActions
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  const { page, offset, totalPages } = getPaginationParams(
    searchParams,
    SIX_LIMIT,
    total
  );

  const [currentPage, setCurrentPage] = useState<number>(page);

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
    handlePageChange(
      newPage,
      searchParams,
      router,
      Routes.Profile.buildRoute(userId!)
    );
  };

  useEffect(() => {
    dispatch(
      readAllCompanyActionsThunk({
        action_type: actionType,
        company_id: companyId,
        offset,
        limit: SIX_LIMIT,
      })
    );
  }, [dispatch, offset, actionType]);

  if (loading) return <LoadingScreen />;

  if (error) return <ErrorScreen error={error} />;

  const noActionsMessage = (actionType?: ActionTypes) => {
    if (actionType === ActionTypes.REQUEST)
      return t('companyActions.noRequests');
    if (actionType === ActionTypes.INVITATION)
      return t('companyActions.noInvitations');
    return t('companyActions.noActions');
  };

  if (!actions?.length) return NotFoundScreen(noActionsMessage(actionType));

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
          gridAutoRows: 250,
          minHeight: 2 * 250 + 16,
        }}
      >
        {actions.map((action) => (
          <CompanyActionsCard
            key={action.id}
            action={action}
            actionType={actionType}
            companyId={companyId}
          />
        ))}
      </Box>

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onChange={onPageChange}
      />
    </Box>
  );
};
