import { CompanyActionsAPI } from '@api';
import { ActionStatuses, ActionTypes } from '@enums';
import { CompanyActionsInterfaces, ParamsInterfaces } from '@interfaces';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

interface CompanyActionsState {
  actions: CompanyActionsInterfaces.CompanyActionSchema[] | null;
  total: number;
  loading: boolean;
  error?: string;
  selectedAction: CompanyActionsInterfaces.CompanyActionSchema | null;
}

const initialState: CompanyActionsState = {
  actions: null,
  total: 0,
  loading: false,
  error: '',
  selectedAction: null,
};

export const createCompanyActionThunk = createAsyncThunk<
  CompanyActionsInterfaces.CompanyActionSchema,
  CompanyActionsInterfaces.CompanyActionCreate,
  { rejectValue: string }
>('companyActions/create', async (data, { rejectWithValue }) => {
  try {
    const response = await CompanyActionsAPI.createCompanyActions(data);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const readAllCompanyActionsThunk = createAsyncThunk<
  { actions: CompanyActionsInterfaces.CompanyActionSchema[]; total: number },
  ParamsInterfaces.paginationRequest & {
    action_type?: ActionTypes;
    company_id?: string;
    status?: ActionStatuses;
  },
  { rejectValue: string }
>('companyActions/readAll', async (params, { rejectWithValue }) => {
  try {
    const response = await CompanyActionsAPI.readAllCompanyActions(params);
    return {
      actions: response.data.actions ?? [],
      total: response.data.total ?? 0,
    };
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const readCompanyActionByIdThunk = createAsyncThunk<
  CompanyActionsInterfaces.CompanyActionSchema,
  string,
  { rejectValue: string }
>('companyActions/readById', async (id, { rejectWithValue }) => {
  try {
    const response = await CompanyActionsAPI.readCompanyActionsById(id);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const updateCompanyActionThunk = createAsyncThunk<
  CompanyActionsInterfaces.CompanyActionSchema,
  { id: string; data: CompanyActionsInterfaces.CompanyActionUpdate },
  { rejectValue: string }
>('companyActions/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await CompanyActionsAPI.updateCompanyActions(id, data);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const deleteCompanyActionThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('companyActions/delete', async (id, { rejectWithValue }) => {
  try {
    await CompanyActionsAPI.deleteCompanyActions(id);
    return id;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

const companyActionsSlice = createSlice({
  name: 'companyActions',
  initialState,
  reducers: {
    clearSelectedAction: (state) => {
      state.selectedAction = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(readAllCompanyActionsThunk.fulfilled, (state, action) => {
        state.actions = action.payload.actions;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(readCompanyActionByIdThunk.fulfilled, (state, action) => {
        state.selectedAction = action.payload;
        state.loading = false;
      })
      .addCase(createCompanyActionThunk.fulfilled, (state, action) => {
        if (state.actions) state.actions.push(action.payload);
        state.total += 1;
        state.loading = false;
      })
      .addCase(updateCompanyActionThunk.fulfilled, (state, action) => {
        const index = state.actions?.findIndex(
          (a) => a.id === action.payload.id
        );
        if (index !== undefined && index !== -1 && state.actions)
          state.actions[index] = action.payload;
        if (state.selectedAction?.id === action.payload.id)
          state.selectedAction = action.payload;
        state.loading = false;
      })
      .addCase(deleteCompanyActionThunk.fulfilled, (state, action) => {
        if (state.actions)
          state.actions = state.actions.filter((a) => a.id !== action.payload);
        state.total -= 1;
        if (state.selectedAction?.id === action.payload)
          state.selectedAction = null;
        state.loading = false;
      });

    builder.addMatcher(isPending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addMatcher(isRejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearSelectedAction } = companyActionsSlice.actions;
export const companyActionsReducer = companyActionsSlice.reducer;
