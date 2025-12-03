import { QuizAPI } from '@api';
import { quizzesBase } from '@constants';
import { ParamsInterfaces, QuizInterfaces } from '@interfaces';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

interface QuizState {
  quizzes: QuizInterfaces.QuizSchema[] | null;
  total: number;
  loading: boolean;
  error?: string;
  selectedQuiz: QuizInterfaces.QuizSchema | null;
}

const initialState: QuizState = {
  quizzes: null,
  total: 0,
  loading: false,
  error: '',
  selectedQuiz: null,
};

export const createQuizThunk = createAsyncThunk<
  QuizInterfaces.QuizSchema,
  {
    data: QuizInterfaces.QuizCreate;
    questions_data: {
      questions: Array<{
        title: string;
        answer_options: Array<{
          text: string;
          is_correct: boolean;
        }>;
      }>;
    };
  },
  { rejectValue: string }
>(
  `${quizzesBase}/createQuiz`,
  async ({ data, questions_data }, { rejectWithValue }) => {
    try {
      const response = await QuizAPI.createQuiz(data, questions_data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

export const readQuizByIdThunk = createAsyncThunk<
  QuizInterfaces.QuizSchema,
  string,
  { rejectValue: string }
>(`${quizzesBase}/readQuizById`, async (id, { rejectWithValue }) => {
  try {
    const response = await QuizAPI.readQuizById(id);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const readCompanyQuizzesThunk = createAsyncThunk<
  { quizzes: QuizInterfaces.QuizSchema[]; total: number },
  { companyId: string; params: ParamsInterfaces.paginationRequest },
  { rejectValue: string }
>(
  `${quizzesBase}/readCompanyQuizzes`,
  async ({ companyId, params }, { rejectWithValue }) => {
    try {
      const response = await QuizAPI.readCompanyQuizzes(companyId, params);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

export const updateQuizThunk = createAsyncThunk<
  QuizInterfaces.QuizSchema,
  { id: string; data: QuizInterfaces.QuizUpdate },
  { rejectValue: string }
>(`${quizzesBase}/updateQuiz`, async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await QuizAPI.updateQuiz(id, data);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const deleteQuizThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(`${quizzesBase}/deleteQuiz`, async (id, { rejectWithValue }) => {
  try {
    await QuizAPI.deleteQuiz(id);
    return id;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    clearSelectedQuiz: (state) => {
      state.selectedQuiz = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuizThunk.fulfilled, (state, action) => {
        if (state.quizzes) state.quizzes.push(action.payload);
        state.total += 1;
        state.loading = false;
      })
      .addCase(readCompanyQuizzesThunk.fulfilled, (state, action) => {
        state.quizzes = action.payload.quizzes;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(readQuizByIdThunk.fulfilled, (state, action) => {
        state.selectedQuiz = action.payload;
        state.loading = false;
      })
      .addCase(updateQuizThunk.fulfilled, (state, action) => {
        const quiz = action.payload;
        if (state.quizzes) {
          const index = state.quizzes.findIndex((q) => q.id === quiz.id);
          if (index !== -1) state.quizzes[index] = quiz;
        }
        if (state.selectedQuiz?.id === quiz.id) state.selectedQuiz = quiz;
        state.loading = false;
      })
      .addCase(deleteQuizThunk.fulfilled, (state, action) => {
        const quizId = action.payload;
        if (state.quizzes)
          state.quizzes = state.quizzes.filter((q) => q.id !== quizId);
        state.total -= 1;
        if (state.selectedQuiz?.id === quizId) state.selectedQuiz = null;
        state.loading = false;
      });

    builder.addMatcher(
      isPending(
        createQuizThunk,
        readQuizByIdThunk,
        readCompanyQuizzesThunk,
        updateQuizThunk,
        deleteQuizThunk
      ),
      (state) => {
        state.loading = true;
        state.error = '';
      }
    );

    builder.addMatcher(
      isRejected(
        createQuizThunk,
        readQuizByIdThunk,
        readCompanyQuizzesThunk,
        updateQuizThunk,
        deleteQuizThunk
      ),
      (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
  },
});

export const { clearSelectedQuiz } = quizSlice.actions;
export const quizReducer = quizSlice.reducer;
