import { CompanyAPI } from '@api';
import { companiesBase } from '@constants';
import { CompanyInterfaces, ParamsInterfaces } from '@interfaces';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

interface CompaniesState {
  companies: CompanyInterfaces.CompanySchema[] | null;
  total: number;
  loading: boolean;
  error?: string;
  selectedCompany: CompanyInterfaces.CompanySchema | null;
}

const initialState: CompaniesState = {
  companies: null,
  total: 0,
  loading: false,
  error: '',
  selectedCompany: null,
};

export const createCompanyThunk = createAsyncThunk<
  CompanyInterfaces.CompanySchema,
  CompanyInterfaces.CompanyCreate,
  { rejectValue: string }
>(`${companiesBase}/createCompany`, async (data, { rejectWithValue }) => {
  try {
    const response = await CompanyAPI.createCompany(data);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const readCompanyByIdThunk = createAsyncThunk<
  CompanyInterfaces.CompanySchema,
  string,
  { rejectValue: string }
>(`${companiesBase}/readCompanyById`, async (id, { rejectWithValue }) => {
  try {
    const response = await CompanyAPI.readCompanyById(id);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const readAllCompaniesThunk = createAsyncThunk<
  { companies: CompanyInterfaces.CompanySchema[]; total: number },
  ParamsInterfaces.paginationRequest,
  { rejectValue: string }
>(`${companiesBase}/readAllCompanies`, async (params, { rejectWithValue }) => {
  try {
    const response = await CompanyAPI.readAllCompanies(params);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const updateCompanyThunk = createAsyncThunk<
  CompanyInterfaces.CompanySchema,
  { id: string; data: CompanyInterfaces.CompanyUpdate },
  { rejectValue: string }
>(
  `${companiesBase}/updateCompany`,
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await CompanyAPI.updateCompany(id, data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

export const deleteCompanyThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(`${companiesBase}/deleteCompany`, async (id, { rejectWithValue }) => {
  try {
    await CompanyAPI.deleteCompany(id);
    return id;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    clearSelectedCompany: (state) => {
      state.selectedCompany = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCompanyThunk.fulfilled, (state, action) => {
        if (state.companies) {
          state.companies.push(action.payload);
        }
        state.total += 1;
        state.loading = false;
      })
      .addCase(readAllCompaniesThunk.fulfilled, (state, action) => {
        state.companies = action.payload.companies;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(readCompanyByIdThunk.fulfilled, (state, action) => {
        state.selectedCompany = action.payload;
        state.loading = false;
      })
      .addCase(updateCompanyThunk.fulfilled, (state, action) => {
        const company = action.payload;
        if (state.companies) {
          const index = state.companies.findIndex((c) => c.id === company.id);
          if (index !== -1) state.companies[index] = company;
        }
        if (state.selectedCompany?.id === company.id) {
          state.selectedCompany = company;
        }
        state.loading = false;
      })
      .addCase(deleteCompanyThunk.fulfilled, (state, action) => {
        const companyId = action.payload;
        if (state.companies) {
          state.companies = state.companies.filter((c) => c.id !== companyId);
        }
        state.total -= 1;
        if (state.selectedCompany?.id === companyId) {
          state.selectedCompany = null;
        }
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

export const { clearSelectedCompany } = companySlice.actions;
export const companyReducer = companySlice.reducer;
