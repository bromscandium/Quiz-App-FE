'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { QuizInterfaces, UserAnswerInterfaces } from '@interfaces';
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

interface QuizAttemptFormProps {
  quiz: QuizInterfaces.QuizSchema;
  onSubmit: (answers: UserAnswerInterfaces.UserAnswerCreate[]) => Promise<void>;
  submitting: boolean;
}

export const QuizAttemptForm = ({
  quiz,
  onSubmit,
  submitting,
}: QuizAttemptFormProps) => {
  const t = useTranslations();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, UserAnswerInterfaces.UserAnswerCreate>
  >({});

  const currentQuestion = quiz.questions[currentQuestionIndex];

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
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    const allAnswered = quiz.questions.every(
      (q) => answers[q.id] !== undefined
    );

    if (!allAnswered) {
      return;
    }

    const userAnswers = Object.values(answers);
    await onSubmit(userAnswers);
  };

  const isAllAnswered = quiz.questions.every(
    (q) => answers[q.id] !== undefined
  );

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
          <Typography variant="h4">{quiz.title}</Typography>
          <Typography variant="body1">{quiz.description}</Typography>

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

            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={submitting || !isAllAnswered}
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
};
