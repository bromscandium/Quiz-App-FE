import { StatsAPI } from '@api';
import { statsBase } from '@constants';
import { StatsInterfaces } from '@interfaces';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';

interface StatsState {
  userStats: StatsInterfaces.UserStats | null;
  userQuizzes: StatsInterfaces.UserStatsQuizzesList | null;
  userLastAttempts: StatsInterfaces.UserLastAttemptsList | null;
  companyUserStats: StatsInterfaces.CompanyUserStatsList | null;
  companyUserQuizzes: StatsInterfaces.CompanyUserQuizStatsList | null;
  companyLastAttempts: StatsInterfaces.CompanyUserLastAttemptsList | null;
  loading: boolean;
  userStatsError?: string;
  companyStatsError?: string;
}

const initialState: StatsState = {
  userStats: null,
  userQuizzes: null,
  userLastAttempts: null,
  companyUserStats: null,
  companyUserQuizzes: null,
  companyLastAttempts: null,
  loading: false,
  userStatsError: '',
  companyStatsError: '',
};

export const readUserStatsThunk = createAsyncThunk<
  StatsInterfaces.UserStats,
  StatsInterfaces.UserStatsParams,
  { rejectValue: string }
>(`${statsBase}/readUserStats`, async (params, { rejectWithValue }) => {
  try {
    const response = await StatsAPI.readUserStats(params);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const readUserStatsQuizzesThunk = createAsyncThunk<
  StatsInterfaces.UserStatsQuizzesList,
  StatsInterfaces.UserStatsParams,
  { rejectValue: string }
>(`${statsBase}/readUserStatsQuizzes`, async (params, { rejectWithValue }) => {
  try {
    const response = await StatsAPI.readUserStatsQuizzes(params);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const readUserStatsLastAttemptsThunk = createAsyncThunk<
  StatsInterfaces.UserLastAttemptsList,
  StatsInterfaces.UserStatsParams,
  { rejectValue: string }
>(
  `${statsBase}/readUserStatsLastAttempts`,
  async (params, { rejectWithValue }) => {
    try {
      const response = await StatsAPI.readUserStatsLastAttempts(params);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

export const readCompanyUsersStatsThunk = createAsyncThunk<
  StatsInterfaces.CompanyUserStatsList,
  { companyId: string; params: StatsInterfaces.CompanyStatsParams },
  { rejectValue: string }
>(
  `${statsBase}/readCompanyUsersStats`,
  async ({ companyId, params }, { rejectWithValue }) => {
    try {
      const response = await StatsAPI.readCompanyUsersStats(companyId, params);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

export const readCompanyUserQuizzesStatsThunk = createAsyncThunk<
  StatsInterfaces.CompanyUserQuizStatsList,
  {
    companyId: string;
    userId: string;
    params: StatsInterfaces.CompanyStatsParams;
  },
  { rejectValue: string }
>(
  `${statsBase}/readCompanyUserQuizzesStats`,
  async ({ companyId, userId, params }, { rejectWithValue }) => {
    try {
      const response = await StatsAPI.readCompanyUserQuizzesStats(
        companyId,
        userId,
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

export const readCompanyUsersLastAttemptsThunk = createAsyncThunk<
  StatsInterfaces.CompanyUserLastAttemptsList,
  string,
  { rejectValue: string }
>(
  `${statsBase}/readCompanyUsersLastAttempts`,
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await StatsAPI.readCompanyUsersLastAttempts(companyId);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    clearStats: (state) => {
      state.userStats = null;
      state.userQuizzes = null;
      state.userLastAttempts = null;
      state.companyUserStats = null;
      state.companyUserQuizzes = null;
      state.companyLastAttempts = null;
      state.userStatsError = '';
      state.companyStatsError = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(readUserStatsThunk.fulfilled, (state, action) => {
        state.userStats = action.payload;
        state.loading = false;
        state.userStatsError = '';
      })
      .addCase(readUserStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.userStatsError = action.payload as string;
      })
      .addCase(readUserStatsQuizzesThunk.fulfilled, (state, action) => {
        state.userQuizzes = action.payload;
        state.loading = false;
        state.userStatsError = '';
      })
      .addCase(readUserStatsQuizzesThunk.rejected, (state, action) => {
        state.loading = false;
        state.userStatsError = action.payload as string;
      })
      .addCase(readUserStatsLastAttemptsThunk.fulfilled, (state, action) => {
        state.userLastAttempts = action.payload;
        state.loading = false;
        state.userStatsError = '';
      })
      .addCase(readUserStatsLastAttemptsThunk.rejected, (state, action) => {
        state.loading = false;
        state.userStatsError = action.payload as string;
      })
      .addCase(readCompanyUsersStatsThunk.fulfilled, (state, action) => {
        state.companyUserStats = action.payload;
        state.loading = false;
        state.companyStatsError = '';
      })
      .addCase(readCompanyUsersStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.companyStatsError = action.payload as string;
      })
      .addCase(readCompanyUserQuizzesStatsThunk.fulfilled, (state, action) => {
        state.companyUserQuizzes = action.payload;
        state.loading = false;
        state.companyStatsError = '';
      })
      .addCase(readCompanyUserQuizzesStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.companyStatsError = action.payload as string;
      })
      .addCase(readCompanyUsersLastAttemptsThunk.fulfilled, (state, action) => {
        state.companyLastAttempts = action.payload;
        state.loading = false;
        state.companyStatsError = '';
      })
      .addCase(readCompanyUsersLastAttemptsThunk.rejected, (state, action) => {
        state.loading = false;
        state.companyStatsError = action.payload as string;
      });

    builder.addMatcher(
      isPending(
        readUserStatsThunk,
        readUserStatsQuizzesThunk,
        readUserStatsLastAttemptsThunk,
        readCompanyUsersStatsThunk,
        readCompanyUserQuizzesStatsThunk,
        readCompanyUsersLastAttemptsThunk
      ),
      (state) => {
        state.loading = true;
      }
    );
  },
});

export const { clearStats } = statsSlice.actions;
export const statsReducer = statsSlice.reducer;
