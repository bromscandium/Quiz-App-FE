'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useQuizModify } from '@hooks/useQuizModify';
import { QuizInterfaces } from '@interfaces';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';

import { QuizForm } from '@components/forms/QuizForm';

import { readCompanyMembersThunk } from '@libs/redux/slices/membership';
import { createQuizThunk, updateQuizThunk } from '@libs/redux/slices/quiz';
import { AppDispatch } from '@libs/redux/store';

interface QuizModalButtonProps {
  companyId: string;
  mode: 'create' | 'edit';
  quiz?: QuizInterfaces.QuizSchema | null;
}

export const QuizModal = ({ companyId, mode, quiz }: QuizModalButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (
    data: ReturnType<ReturnType<typeof useQuizModify>['getResult']>
  ) => {
    if (mode === 'create') {
      const quizData: QuizInterfaces.QuizCreate = {
        company_id: companyId,
        title: data.title,
        description: data.description,
      };

      const questionsData = {
        questions: data.questions.map((question) => ({
          title: question.title,
          answer_options: question.answer_options.map((answer) => ({
            text: answer.text,
            is_correct: answer.is_correct,
          })),
        })),
      };

      await dispatch(
        createQuizThunk({ data: quizData, questions_data: questionsData })
      );
    } else if (mode === 'edit' && quiz) {
      const updateData: QuizInterfaces.QuizUpdate = {
        title: data.title,
        description: data.description,
        questions: data.questions.map((question) => ({
          id: question.id,
          title: question.title,
          answer_options: question.answer_options.map((answer) => ({
            id: answer.id,
            text: answer.text,
            is_correct: answer.is_correct,
          })),
        })),
      };
      await dispatch(updateQuizThunk({ id: quiz.id, data: updateData }));
    }

    await dispatch(
      readCompanyMembersThunk({
        company_id: companyId,
        params: { offset: 0, limit: 20 },
      })
    );
    handleClose();
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        {mode === 'create' ? t('quiz.createQuiz') : t('quiz.editQuiz')}
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {mode === 'create' ? t('quiz.createQuiz') : t('quiz.editQuiz')}
        </DialogTitle>
        <DialogContent>
          {open && (
            <QuizForm
              initialData={quiz ?? undefined}
              onSubmit={handleSubmit}
              onCancel={handleClose}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};
