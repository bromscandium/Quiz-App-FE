import { MembershipAPI } from '@api';
import { membershipsBase } from '@constants';
import { Roles } from '@enums';
import { MembershipInterfaces, ParamsInterfaces } from '@interfaces';
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

interface MembershipState {
  memberships: MembershipInterfaces.MembershipSchema[] | null;
  total: number;
  loading: boolean;
  error?: string;
  selectedMembership: MembershipInterfaces.MembershipSchema | null;
  companyMembers: MembershipInterfaces.MembershipSchema[] | null;
  companyMembersTotal: number;
}

const initialState: MembershipState = {
  memberships: null,
  total: 0,
  loading: false,
  error: '',
  selectedMembership: null,
  companyMembers: null,
  companyMembersTotal: 0,
};

export const createMembershipThunk = createAsyncThunk<
  MembershipInterfaces.MembershipSchema,
  MembershipInterfaces.MembershipCreate,
  { rejectValue: string }
>(`${membershipsBase}/createMembership`, async (data, { rejectWithValue }) => {
  try {
    const response = await MembershipAPI.createMembership(data);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const readMembershipByIdThunk = createAsyncThunk<
  MembershipInterfaces.MembershipSchema,
  string,
  { rejectValue: string }
>(`${membershipsBase}/readMembershipById`, async (id, { rejectWithValue }) => {
  try {
    const response = await MembershipAPI.readMembershipById(id);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const readUserMembershipsThunk = createAsyncThunk<
  { memberships: MembershipInterfaces.MembershipSchema[]; total: number },
  { params: ParamsInterfaces.paginationRequest },
  { rejectValue: string }
>(
  `${membershipsBase}/readUserMemberships`,
  async ({ params }, { rejectWithValue }) => {
    try {
      const response = await MembershipAPI.readUserMemberships(params);
      const data = response.data;
      return {
        memberships: data.memberships ?? [],
        total: data.total ?? 0,
      };
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

export const readCompanyMembersThunk = createAsyncThunk<
  { companyMembers: MembershipInterfaces.MembershipSchema[]; total: number },
  {
    company_id: string;
    params: ParamsInterfaces.paginationRequest & { roles?: Roles[] };
  },
  { rejectValue: string }
>(
  `${membershipsBase}/readCompanyMembers`,
  async ({ company_id, params }, { rejectWithValue }) => {
    try {
      const response = await MembershipAPI.readCompanyMembers(
        company_id,
        params
      );
      const data = response.data;
      return {
        companyMembers: data.memberships ?? [],
        total: data.total ?? 0,
      };
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

export const updateMembershipThunk = createAsyncThunk<
  MembershipInterfaces.MembershipSchema,
  { id: string; data: MembershipInterfaces.MembershipUpdate },
  { rejectValue: string }
>(
  `${membershipsBase}/updateMembership`,
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await MembershipAPI.updateMembership(id, data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

export const deleteMembershipThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(`${membershipsBase}/deleteMembership`, async (id, { rejectWithValue }) => {
  try {
    await MembershipAPI.deleteMembership(id);
    return id;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

const membershipSlice = createSlice({
  name: 'membership',
  initialState,
  reducers: {
    clearSelectedMembership: (state) => {
      state.selectedMembership = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMembershipThunk.fulfilled, (state, action) => {
        if (state.memberships) {
          state.memberships.push(action.payload);
        }
        state.total += 1;
        state.loading = false;
      })
      .addCase(readUserMembershipsThunk.fulfilled, (state, action) => {
        state.memberships = action.payload.memberships;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(readCompanyMembersThunk.fulfilled, (state, action) => {
        state.companyMembers = action.payload.companyMembers;
        state.companyMembersTotal = action.payload.total;
        state.loading = false;
      })
      .addCase(readMembershipByIdThunk.fulfilled, (state, action) => {
        state.selectedMembership = action.payload;
        state.loading = false;
      })
      .addCase(updateMembershipThunk.fulfilled, (state, action) => {
        const membership = action.payload;
        if (state.memberships) {
          const index = state.memberships.findIndex(
            (m) => m.id === membership.id
          );
          if (index !== -1) state.memberships[index] = membership;
        }
        if (state.selectedMembership?.id === membership.id) {
          state.selectedMembership = membership;
        }
        state.loading = false;
      })
      .addCase(deleteMembershipThunk.fulfilled, (state, action) => {
        const id = action.payload;
        if (state.memberships) {
          state.memberships = state.memberships.filter((m) => m.id !== id);
        }
        state.total -= 1;
        if (state.selectedMembership?.id === id) {
          state.selectedMembership = null;
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

export const { clearSelectedMembership } = membershipSlice.actions;
export const membershipReducer = membershipSlice.reducer;
