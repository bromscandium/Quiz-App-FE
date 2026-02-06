'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

import { Routes } from '@constants';
import { QuizAttemptInterfaces, UserAnswerInterfaces } from '@interfaces';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

import { QuizAttemptForm } from '@components/forms/QuizAttemptForm';
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

  const handleSubmit = async (
    userAnswers: UserAnswerInterfaces.UserAnswerCreate[]
  ) => {
    if (!selectedQuiz) return;

    const allAnswered = selectedQuiz.questions.every((q) =>
      userAnswers.some((a) => a.question_id === q.id)
    );

    if (!allAnswered) {
      enqueueSnackbar(t('quiz.answerAllQuestions'), { variant: 'warning' });
      return;
    }

    setSubmitting(true);
    try {
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

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;
  if (!selectedQuiz) return NotFoundScreen(t('quiz.notFound'));

  return (
    <QuizAttemptForm
      quiz={selectedQuiz}
      onSubmit={handleSubmit}
      submitting={submitting}
    />
  );
}
