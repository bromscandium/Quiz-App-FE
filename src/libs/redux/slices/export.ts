import { ExportAPI } from '@api';
import { exportBase } from '@constants';
import { downloadBlob } from '@helpers/export';
import { ExportInterfaces } from '@interfaces';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';

interface ExportState {
  loading: boolean;
  error?: string;
}

const initialState: ExportState = {
  loading: false,
  error: '',
};

export const exportMyResultsThunk = createAsyncThunk<
  void,
  ExportInterfaces.ExportMyResultsParams,
  { rejectValue: string }
>(`${exportBase}/exportMyResults`, async (params, { rejectWithValue }) => {
  try {
    const blob = await ExportAPI.exportMyResults(params);
    const filename = `my_results_${new Date().toISOString().split('T')[0]}.${params.export_type}`;
    downloadBlob(blob, filename);
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const exportCompanyUserResultsThunk = createAsyncThunk<
  void,
  ExportInterfaces.ExportCompanyUserParams,
  { rejectValue: string }
>(
  `${exportBase}/exportCompanyUserResults`,
  async (params, { rejectWithValue }) => {
    try {
      const blob = await ExportAPI.exportCompanyUserResults(params);
      const filename = `user_${params.user_id}_results_${new Date().toISOString().split('T')[0]}.${params.export_type}`;
      downloadBlob(blob, filename);
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

export const exportCompanyAllResultsThunk = createAsyncThunk<
  void,
  ExportInterfaces.ExportCompanyAllParams,
  { rejectValue: string }
>(
  `${exportBase}/exportCompanyAllResults`,
  async (params, { rejectWithValue }) => {
    try {
      const blob = await ExportAPI.exportCompanyAllResults(params);
      const filename = `company_${params.company_id}_all_users_${new Date().toISOString().split('T')[0]}.${params.export_type}`;
      downloadBlob(blob, filename);
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

export const exportCompanyQuizResultsThunk = createAsyncThunk<
  void,
  ExportInterfaces.ExportCompanyQuizParams,
  { rejectValue: string }
>(
  `${exportBase}/exportCompanyQuizResults`,
  async (params, { rejectWithValue }) => {
    try {
      const blob = await ExportAPI.exportCompanyQuizResults(params);
      const filename = `quiz_${params.quiz_id}_results_${new Date().toISOString().split('T')[0]}.${params.export_type}`;
      downloadBlob(blob, filename);
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

const exportSlice = createSlice({
  name: 'export',
  initialState,
  reducers: {
    clearExportError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(exportMyResultsThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(exportMyResultsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(exportCompanyUserResultsThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(exportCompanyUserResultsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(exportCompanyAllResultsThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(exportCompanyAllResultsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(exportCompanyQuizResultsThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(exportCompanyQuizResultsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder.addMatcher(
      isPending(
        exportMyResultsThunk,
        exportCompanyUserResultsThunk,
        exportCompanyAllResultsThunk,
        exportCompanyQuizResultsThunk
      ),
      (state) => {
        state.loading = true;
        state.error = '';
      }
    );
  },
});

export const { clearExportError } = exportSlice.actions;
export const exportReducer = exportSlice.reducer;
