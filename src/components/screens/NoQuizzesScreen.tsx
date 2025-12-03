import { useTranslations } from 'next-intl';

import { Box, Typography } from '@mui/material';

import { QuizModal } from '@components/buttons/QuizModal';

interface NoQuizzesScreenProps {
  isOwnerOrAdmin: boolean;
  companyId: string;
}

export const NoQuizzesScreen = ({
  isOwnerOrAdmin,
  companyId,
}: NoQuizzesScreenProps) => {
  const t = useTranslations();

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
};
