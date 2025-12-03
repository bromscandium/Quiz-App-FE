import { QuizAttemptAPI } from '@api';
import { quizAttemptsBase } from '@constants';
import { ParamsInterfaces, QuizAttemptInterfaces } from '@interfaces';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

interface QuizAttemptState {
  quizAttempts: QuizAttemptInterfaces.QuizAttemptSchema[] | null;
  total: number;
  loading: boolean;
  error?: string;
  selectedQuizAttempt: QuizAttemptInterfaces.QuizAttemptSchema | null;
}

const initialState: QuizAttemptState = {
  quizAttempts: null,
  total: 0,
  loading: false,
  error: '',
  selectedQuizAttempt: null,
};

export const createQuizAttemptThunk = createAsyncThunk<
  QuizAttemptInterfaces.QuizAttemptSchema,
  QuizAttemptInterfaces.QuizAttemptCreate,
  { rejectValue: string }
>(
  `${quizAttemptsBase}/createQuizAttempt`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await QuizAttemptAPI.createQuizAttempt(data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

export const readQuizAttemptByIdThunk = createAsyncThunk<
  QuizAttemptInterfaces.QuizAttemptSchema,
  { id: string; userId: string },
  { rejectValue: string }
>(
  `${quizAttemptsBase}/readQuizAttemptById`,
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const response = await QuizAttemptAPI.readQuizAttemptById(id, userId);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

export const readUserQuizAttemptsThunk = createAsyncThunk<
  { quiz_attempts: QuizAttemptInterfaces.QuizAttemptSchema[]; total: number },
  ParamsInterfaces.paginationRequest,
  { rejectValue: string }
>(
  `${quizAttemptsBase}/readUserQuizAttempts`,
  async (params, { rejectWithValue }) => {
    try {
      const response = await QuizAttemptAPI.readUserQuizAttempts(params);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

export const readCompanyQuizAttemptsThunk = createAsyncThunk<
  { quiz_attempts: QuizAttemptInterfaces.QuizAttemptSchema[]; total: number },
  {
    companyId: string;
    quizId: string | null;
    params: ParamsInterfaces.paginationRequest;
  },
  { rejectValue: string }
>(
  `${quizAttemptsBase}/readCompanyQuizAttempts`,
  async ({ companyId, quizId, params }, { rejectWithValue }) => {
    try {
      const response = await QuizAttemptAPI.readCompanyQuizAttempts(
        companyId,
        quizId,
        params
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

const quizAttemptSlice = createSlice({
  name: 'quizAttempt',
  initialState,
  reducers: {
    clearSelectedQuizAttempt: (state) => {
      state.selectedQuizAttempt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuizAttemptThunk.fulfilled, (state, action) => {
        if (state.quizAttempts) {
          state.quizAttempts.push(action.payload);
        }
        state.total += 1;
        state.loading = false;
      })
      .addCase(readUserQuizAttemptsThunk.fulfilled, (state, action) => {
        state.quizAttempts = action.payload.quiz_attempts;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(readCompanyQuizAttemptsThunk.fulfilled, (state, action) => {
        state.quizAttempts = action.payload.quiz_attempts;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(readQuizAttemptByIdThunk.fulfilled, (state, action) => {
        state.selectedQuizAttempt = action.payload;
        state.loading = false;
      });

    builder.addMatcher(
      isPending(
        createQuizAttemptThunk,
        readQuizAttemptByIdThunk,
        readUserQuizAttemptsThunk,
        readCompanyQuizAttemptsThunk
      ),
      (state) => {
        state.loading = true;
        state.error = '';
      }
    );

    builder.addMatcher(
      isRejected(
        createQuizAttemptThunk,
        readQuizAttemptByIdThunk,
        readUserQuizAttemptsThunk,
        readCompanyQuizAttemptsThunk
      ),
      (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
  },
});

export const { clearSelectedQuizAttempt } = quizAttemptSlice.actions;
export const quizAttemptReducer = quizAttemptSlice.reducer;
