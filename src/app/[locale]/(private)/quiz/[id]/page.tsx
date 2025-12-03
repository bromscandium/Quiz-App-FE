'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

import { Routes } from '@constants';
import { QuizAttemptInterfaces, UserAnswerInterfaces } from '@interfaces';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorScreen } from '@components/screens/ErrorScreen';
import { LoadingScreen } from '@components/screens/LoadingScreen';
import { NotFoundScreen } from '@components/screens/NotFoundScreen';

import { readQuizByIdThunk } from '@libs/redux/slices/quiz';
import { createQuizAttemptThunk } from '@libs/redux/slices/quizAttempt';
import { AppDispatch, RootState } from '@libs/redux/store';

export default function QuizPage() {
  const t = useTranslations();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { enqueueSnackbar } = useSnackbar();

  const { selectedQuiz, loading, error } = useSelector(
    (state: RootState) => state.quiz
  );
  const { memberships } = useSelector((state: RootState) => state.membership);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, UserAnswerInterfaces.UserAnswerCreate>
  >({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(readQuizByIdThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!loading && selectedQuiz && memberships !== null) {
      if (memberships.length === 0) return;

      const currentUserMembership = memberships.find(
        (membership) => membership.company?.id === selectedQuiz.company_id
      );

      if (!currentUserMembership) {
        router.push(Routes.Home.href);
      }
    }
  }, [loading, selectedQuiz, memberships, router]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;
  if (!selectedQuiz) return NotFoundScreen(t('quiz.notFound'));

  const currentQuestion = selectedQuiz.questions[currentQuestionIndex];

  const handleAnswerChange = (answerId: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: {
        question_id: currentQuestion.id,
        answer_option_id: answerId,
      },
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    const allAnswered = selectedQuiz.questions.every(
      (q) => answers[q.id] !== undefined
    );

    if (!allAnswered) {
      enqueueSnackbar(t('quiz.answerAllQuestions'), { variant: 'warning' });
      return;
    }

    setSubmitting(true);
    try {
      const userAnswers = Object.values(answers);
      await dispatch(
        createQuizAttemptThunk({
          quiz_id: id,
          company_id: selectedQuiz.company_id,
          user_answers: userAnswers,
        } as QuizAttemptInterfaces.QuizAttemptCreate)
      ).unwrap();

      enqueueSnackbar(t('quiz.submissionSuccess'), { variant: 'success' });
      router.push(`${Routes.Companies.buildRoute(selectedQuiz.company_id)}`);
    } catch {
      enqueueSnackbar(t('quiz.submissionError'), { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        px: 2,
      }}
    >
      <Paper sx={{ maxWidth: 800, width: '100%', p: 4 }}>
        <Stack spacing={3} alignItems="flex-start">
          <Typography variant="h4">{selectedQuiz.title}</Typography>
          <Typography variant="body1">{selectedQuiz.description}</Typography>
          <Typography variant="h6">
            {currentQuestionIndex + 1}. {currentQuestion.title}
          </Typography>
          <FormControl fullWidth>
            <RadioGroup
              value={answers[currentQuestion.id]?.answer_option_id || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
            >
              {currentQuestion.answer_options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  control={
                    <Radio
                      checked={
                        answers[currentQuestion.id]?.answer_option_id ===
                        option.id
                      }
                      onChange={() => handleAnswerChange(option.id)}
                    />
                  }
                  label={option.text}
                  sx={{ width: '100%', m: 0 }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              {t('common.previous')}
            </Button>
            {currentQuestionIndex === selectedQuiz.questions.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? t('common.submitting') : t('quiz.submit')}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                {t('common.next')}
              </Button>
            )}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
