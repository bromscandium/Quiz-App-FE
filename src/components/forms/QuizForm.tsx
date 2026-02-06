'use client';

import { useTranslations } from 'next-intl';

import { useQuizModify } from '@hooks/useQuizModify';
import { QuizInterfaces } from '@interfaces';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { QuestionsList } from '@components/lists/QuestionsList';

interface QuizFormProps {
  initialData?: QuizInterfaces.QuizSchema;
  onSubmit: (
    data: ReturnType<ReturnType<typeof useQuizModify>['getResult']>
  ) => Promise<void>;
  onCancel: () => void;
}

export const QuizForm = ({
  initialData,
  onSubmit,
  onCancel,
}: QuizFormProps) => {
  const form = useQuizModify(initialData);
  const t = useTranslations();

  const handleSubmit = () => {
    if (!form.validate()) return;
    const data = form.getResult();
    onSubmit(data);
  };

  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit}>
      <TextField
        label={t('quiz.title')}
        value={form.title}
        onChange={(e) => form.setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        label={t('quiz.description')}
        value={form.description}
        onChange={(e) => form.setDescription(e.target.value)}
        fullWidth
        multiline
        rows={3}
      />
      {form.errors.questions && (
        <Typography color="error">{t(form.errors.questions)}</Typography>
      )}

      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t('quiz.questions')}
        </Typography>
        <QuestionsList form={form} />
      </Box>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
        <Button variant="contained" type="submit">
          {t('common.save')}
        </Button>
      </Stack>
    </Stack>
  );
};
