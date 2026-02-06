import { useState } from 'react';

import { QuizInterfaces } from '@interfaces';

type InitialQuiz = QuizInterfaces.QuizCreate | QuizInterfaces.QuizSchema;

interface QuestionFormData {
  id?: string;
  title: string;
  answer_options: AnswerOptionFormData[];
}

interface AnswerOptionFormData {
  id?: string;
  text: string;
  is_correct: boolean;
}

type QuizFormData = {
  company_id?: string;
  title: string;
  description: string;
  frequency?: number;
  questions: QuestionFormData[];
};

interface ValidationErrors {
  questions?: string;
  questionErrors: { [key: number]: { title?: string; answers?: string } };
}

export const useQuizModify = (initial?: InitialQuiz) => {
  const isUpdate = initial && 'id' in initial;

  const [quizMeta, setQuizMeta] = useState<QuizFormData>({
    company_id:
      !isUpdate && initial
        ? (initial as QuizInterfaces.QuizCreate).company_id
        : undefined,
    title: initial?.title ?? '',
    description: initial?.description ?? '',
    frequency: isUpdate
      ? (initial as QuizInterfaces.QuizSchema).frequency
      : undefined,
    questions: isUpdate
      ? (initial as QuizInterfaces.QuizSchema).questions.map((q) => ({
          id: q.id,
          title: q.title,
          answer_options: q.answer_options.map((a) => ({
            id: a.id,
            text: a.text,
            is_correct: a.is_correct,
          })),
        }))
      : [],
  });

  const setTitle = (title: string) => {
    setQuizMeta((prev) => ({ ...prev, title }));
  };

  const setDescription = (description: string) => {
    setQuizMeta((prev) => ({ ...prev, description }));
  };

  const addQuestion = () => {
    setQuizMeta((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          title: '',
          answer_options: [{ text: '', is_correct: false }],
        },
      ],
    }));
  };

  const removeQuestion = (questionIndex: number) => {
    setQuizMeta((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== questionIndex),
    }));
  };

  const updateQuestion = (
    questionIndex: number,
    data: Partial<QuestionFormData>
  ) => {
    setQuizMeta((prev) => {
      const updated = [...prev.questions];
      updated[questionIndex] = { ...updated[questionIndex], ...data };
      return { ...prev, questions: updated };
    });
  };

  const addAnswer = (questionIndex: number) => {
    setQuizMeta((prev) => {
      const updatedQuestions = [...prev.questions];
      const updatedAnswers = [
        ...(updatedQuestions[questionIndex].answer_options || []),
        { text: '', is_correct: false },
      ];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        answer_options: updatedAnswers,
      };
      return { ...prev, questions: updatedQuestions };
    });
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizMeta((prev) => {
      const updated = [...prev.questions];
      updated[questionIndex].answer_options = updated[
        questionIndex
      ].answer_options.filter((_, i) => i !== answerIndex);
      return { ...prev, questions: updated };
    });
  };

  const updateAnswer = (
    questionIndex: number,
    answerIndex: number,
    data: Partial<AnswerOptionFormData>
  ) => {
    setQuizMeta((prev) => {
      const updatedQuestions = [...prev.questions];
      const answers = [...updatedQuestions[questionIndex].answer_options];
      answers[answerIndex] = { ...answers[answerIndex], ...data };
      updatedQuestions[questionIndex].answer_options = answers;
      return { ...prev, questions: updatedQuestions };
    });
  };

  const getResult = () => {
    return {
      title: quizMeta.title,
      description: quizMeta.description,
      questions: quizMeta.questions.map((q) => ({
        id: q.id,
        title: q.title,
        answer_options: q.answer_options.map((a) => ({
          id: a.id,
          text: a.text,
          is_correct: a.is_correct,
        })),
      })),
    };
  };

  const [errors, setErrors] = useState<ValidationErrors>({
    questionErrors: {},
  });

  const validate = (): boolean => {
    const newErrors: ValidationErrors = { questionErrors: {} };
    let isValid = true;

    if (quizMeta.questions.length < 2) {
      newErrors.questions = 'quiz.minTwoQuestions';
      isValid = false;
    }

    quizMeta.questions.forEach((question, qIndex) => {
      const qErrors: { title?: string; answers?: string } = {};

      if (!question.title.trim()) {
        qErrors.title = 'quiz.questionRequired';
        isValid = false;
      }

      if (question.answer_options.length < 2) {
        qErrors.answers = 'quiz.minTwoAnswers';
        isValid = false;
      }

      const hasEmptyAnswer = question.answer_options.some(
        (a) => !a.text.trim()
      );
      if (hasEmptyAnswer) {
        qErrors.answers = 'quiz.answerRequired';
        isValid = false;
      }

      const hasCorrect = question.answer_options.some((a) => a.is_correct);
      if (!hasCorrect) {
        qErrors.answers = 'quiz.correctRequired';
        isValid = false;
      }

      if (Object.keys(qErrors).length > 0) {
        newErrors.questionErrors[qIndex] = qErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const canRemoveQuestion = quizMeta.questions.length > 2;

  const canRemoveAnswer = (questionIndex: number) =>
    quizMeta.questions[questionIndex]?.answer_options.length > 2;

  return {
    quizMeta,
    setQuizMeta,
    title: quizMeta.title,
    description: quizMeta.description,
    setTitle,
    setDescription,
    addQuestion,
    removeQuestion,
    updateQuestion,
    addAnswer,
    removeAnswer,
    updateAnswer,
    getResult,
    errors,
    validate,
    canRemoveQuestion,
    canRemoveAnswer,
  };
};
