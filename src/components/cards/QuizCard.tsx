'use client';

import { useTranslations } from 'next-intl';

import { Routes } from '@constants';
import { QuizInterfaces } from '@interfaces';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import { DeleteModalButton } from '@components/buttons/DeleteModal';
import { QuizModal } from '@components/buttons/QuizModal';

import { useRouter } from '@libs/i18n/navigation';
import { deleteQuizThunk } from '@libs/redux/slices/quiz';
import { AppDispatch } from '@libs/redux/store';

interface QuizCardProps {
  quiz: QuizInterfaces.QuizSchema;
  isOwnerOrAdmin: boolean;
}

export const QuizCard = ({ quiz, isOwnerOrAdmin }: QuizCardProps) => {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleStartQuiz = () => {
    router.push(`${Routes.Quiz.href}/${quiz.id}`);
  };

  const handleDeleteQuiz = async () => {
    dispatch(deleteQuizThunk(quiz.id));
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
        title={quiz.title}
        slotProps={{
          title: {
            variant: 'h6',
            fontWeight: 700,
            noWrap: true,
          },
        }}
      />

      <CardContent sx={{ flex: 1, pt: 0 }}>
        <Typography variant="body2" color="text.secondary">
          {quiz.description || t('common.noDescription')}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button variant="contained" onClick={handleStartQuiz}>
          {t('quiz.start')}
        </Button>

        {isOwnerOrAdmin && (
          <Stack direction="row" spacing={1}>
            <QuizModal companyId={quiz.company_id} mode="edit" quiz={quiz} />

            <DeleteModalButton onDeleteAction={handleDeleteQuiz} />
          </Stack>
        )}
      </CardActions>
    </Card>
  );
};
