'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { Routes } from '@constants';
import { getPaginationParams, handlePageChange } from '@helpers/queryParams';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { QuizModal } from '@components/buttons/QuizModal';
import { QuizCard } from '@components/cards/QuizCard';
import { Pagination } from '@components/pagination/Pagination';
import { ErrorScreen } from '@components/screens/ErrorScreen';
import { LoadingScreen } from '@components/screens/LoadingScreen';

import { useRouter } from '@libs/i18n/navigation';
import { readCompanyQuizzesThunk } from '@libs/redux/slices/quiz';
import { AppDispatch, RootState } from '@libs/redux/store';

interface QuizzesListProps {
  companyId: string;
  isOwnerOrAdmin: boolean;
}

const LIMIT = 6;

export const QuizzesList = ({
  companyId,
  isOwnerOrAdmin,
}: QuizzesListProps) => {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const { quizzes, total, loading, error } = useSelector(
    (state: RootState) => state.quiz
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  const { page, offset, totalPages } = getPaginationParams(
    searchParams,
    LIMIT,
    total
  );

  const [currentPage, setCurrentPage] = useState<number>(page);

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
    handlePageChange(
      newPage,
      searchParams,
      router,
      Routes.Companies.buildRoute(companyId)
    );
  };

  useEffect(() => {
    dispatch(
      readCompanyQuizzesThunk({
        companyId,
        params: { offset, limit: LIMIT },
      })
    );
  }, [dispatch, offset, companyId]);

  if (loading) return <LoadingScreen />;

  if (error) return <ErrorScreen error={error} />;

  if (!quizzes?.length) {
    return (
      <>
        <Typography variant="h5" fontWeight={700}>
          {t('quiz.quizzes')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 200,
          }}
        >
          {isOwnerOrAdmin && <QuizModal companyId={companyId} mode="create" />}
        </Box>
      </>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          {t('quiz.quizzes')}
        </Typography>

        {isOwnerOrAdmin && <QuizModal companyId={companyId} mode="create" />}
      </Box>

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
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} isOwnerOrAdmin={isOwnerOrAdmin} />
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
