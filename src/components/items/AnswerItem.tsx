import { useTranslations } from 'next-intl';

import { useQuizModify } from '@hooks/useQuizModify';
import { AnswerOptionInterfaces } from '@interfaces';
import { Button, Checkbox, Stack, TextField } from '@mui/material';

interface AnswerItemProps {
  answer: AnswerOptionInterfaces.AnswerOptionCreate;
  form: ReturnType<typeof useQuizModify>;
  questionIndex: number;
  answerIndex: number;
  error?: string;
}

export const AnswerItem = ({
  answer,
  form,
  questionIndex,
  answerIndex,
  error,
}: AnswerItemProps) => {
  const t = useTranslations();
  const canRemove =
    form.quizMeta.questions[questionIndex]?.answer_options.length > 2;

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Checkbox
        checked={answer.is_correct}
        onChange={(e) =>
          form.updateAnswer(questionIndex, answerIndex, {
            is_correct: e.target.checked,
          })
        }
      />
      <TextField
        label={t('quiz.answer')}
        value={answer.text}
        onChange={(e) =>
          form.updateAnswer(questionIndex, answerIndex, {
            text: e.target.value,
          })
        }
        fullWidth
        size="small"
        error={!!error}
        helperText={error}
      />
      <Button
        color="error"
        onClick={() => form.removeAnswer(questionIndex, answerIndex)}
        sx={{ minWidth: 'auto' }}
        disabled={!canRemove}
      >
        {t('common.delete')}
      </Button>
    </Stack>
  );
};
