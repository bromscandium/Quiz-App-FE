import { useTranslations } from 'next-intl';

import { useQuizModify } from '@hooks/useQuizModify';
import { Button, Stack } from '@mui/material';

import { QuestionItem } from '@components/items/QuestionItem';

interface QuestionsListProps {
  form: ReturnType<typeof useQuizModify>;
}

export const QuestionsList = ({ form }: QuestionsListProps) => {
  const t = useTranslations();

  return (
    <Stack spacing={2}>
      {form.quizMeta.questions.map((question, index) => (
        <QuestionItem
          key={index}
          question={question}
          form={form}
          questionIndex={index}
        />
      ))}

      <Button variant="outlined" onClick={form.addQuestion}>
        {t('quiz.addQuestion')}
      </Button>
    </Stack>
  );
};
