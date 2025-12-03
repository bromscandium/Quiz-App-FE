import { useTranslations } from 'next-intl';

import { useQuizModify } from '@hooks/useQuizModify';
import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material';

import { AnswerItem } from './AnswerItem';

interface QuestionItemProps {
  question: ReturnType<typeof useQuizModify>['quizMeta']['questions'][number];
  form: ReturnType<typeof useQuizModify>;
  questionIndex: number;
}

export const QuestionItem = ({
  question,
  form,
  questionIndex,
}: QuestionItemProps) => {
  const t = useTranslations();
  const questionError = form.errors?.questionErrors?.[questionIndex];

  return (
    <Card sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            {t('quiz.question')} #{questionIndex + 1}
          </Typography>
          <Button
            color="error"
            onClick={() => form.removeQuestion(questionIndex)}
            disabled={form.quizMeta.questions.length <= 2}
          >
            {t('common.delete')}
          </Button>
        </Box>

        <TextField
          label={t('quiz.questionText')}
          value={question.title}
          onChange={(e) =>
            form.updateQuestion(questionIndex, { title: e.target.value })
          }
          fullWidth
          error={!!questionError?.title}
          helperText={questionError?.title ? t(questionError.title) : undefined}
        />

        <Typography variant="subtitle2">{t('quiz.answerOptions')}:</Typography>

        {questionError?.answers && (
          <Typography color="error" variant="caption">
            {t(questionError.answers)}
          </Typography>
        )}

        {question.answer_options.map((answer, answerIndex) => (
          <AnswerItem
            key={answerIndex}
            answer={answer}
            form={form}
            questionIndex={questionIndex}
            answerIndex={answerIndex}
          />
        ))}

        <Button
          variant="outlined"
          onClick={() => form.addAnswer(questionIndex)}
          sx={{ alignSelf: 'flex-start' }}
        >
          {t('quiz.addAnswer')}
        </Button>
      </Stack>
    </Card>
  );
};
