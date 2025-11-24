import { AuthAPI, UserAPI } from '@api';
import { authBase, usersBase } from '@constants';
import { UserInterfaces } from '@interfaces';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isRejected,
} from '@reduxjs/toolkit';

interface UsersState {
  users: UserInterfaces.UserSchema[];
  total: number;
  loading: boolean;
  error?: string;
  selectedUser: UserInterfaces.UserSchema | null;
  userCompanies: UserInterfaces.UserOwnedCompaniesList | null;
}

const initialState: UsersState = {
  users: [],
  total: 0,
  loading: false,
  error: '',
  selectedUser: null,
  userCompanies: null,
};

export const createUserThunk = createAsyncThunk<
  UserInterfaces.UserSchema,
  UserInterfaces.UserCreate,
  { rejectValue: string }
>(`${usersBase}/createUser`, async (data, { rejectWithValue }) => {
  try {
    const response = await UserAPI.createUser(data);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const readUserByMe = createAsyncThunk<
  UserInterfaces.UserSchema,
  void,
  { rejectValue: string }
>(`${authBase}/me`, async (_, { rejectWithValue }) => {
  try {
    const response = await AuthAPI.me();
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const readUserByIdThunk = createAsyncThunk<
  UserInterfaces.UserSchema,
  string,
  { rejectValue: string }
>(`${usersBase}/readUserById`, async (id, { rejectWithValue }) => {
  try {
    const response = await UserAPI.readUserById(id);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const readUserByEmailThunk = createAsyncThunk<
  UserInterfaces.UserSchema,
  string,
  { rejectValue: string }
>(`${usersBase}/readUserByEmail`, async (email, { rejectWithValue }) => {
  try {
    const response = await UserAPI.readUserByEmail(email);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const readUserByNicknameThunk = createAsyncThunk<
  UserInterfaces.UserSchema,
  string,
  { rejectValue: string }
>(`${usersBase}/readUserByNickname`, async (nickname, { rejectWithValue }) => {
  try {
    const response = await UserAPI.readUserByNickname(nickname);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const readAllUsersThunk = createAsyncThunk<
  { users: UserInterfaces.UserSchema[]; total: number },
  { offset: number; limit: number },
  { rejectValue: string }
>(
  `${usersBase}/readAllUsers`,
  async ({ offset, limit }, { rejectWithValue }) => {
    try {
      const response = await UserAPI.readAllUsers(offset, limit);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

export const updateUserThunk = createAsyncThunk<
  UserInterfaces.UserSchema,
  { id: string; data: UserInterfaces.UserUpdate },
  { rejectValue: string }
>(`${usersBase}/updateUser`, async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await UserAPI.updateUser(id, data);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const deleteUserThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(`${usersBase}/deleteUser`, async (id, { rejectWithValue }) => {
  try {
    await UserAPI.deleteUser(id);
    return id;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

export const readUserCompaniesThunk = createAsyncThunk<
  UserInterfaces.UserOwnedCompaniesList,
  { id: string; offset: number; limit: number },
  { rejectValue: string }
>(
  `${usersBase}/readUserCompanies`,
  async ({ id, offset, limit }, { rejectWithValue }) => {
    try {
      const response = await UserAPI.readUserCompanies(id, offset, limit);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || 'Unknown error occurred.'
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = '';
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    clearUserCompanies: (state) => {
      state.userCompanies = null;
    },
  },
  extraReducers: (builder) => {
    const setSelectedUser = (
      state: UsersState,
      action: PayloadAction<UserInterfaces.UserSchema>
    ) => {
      state.loading = false;
      state.selectedUser = action.payload;
    };

    builder
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.total += 1;
        state.loading = false;
      })
      .addCase(readAllUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        const user = action.payload;
        const index = state.users.findIndex((u) => u.id === user.id);
        if (index !== -1) state.users[index] = user;
        if (state.selectedUser?.id === user.id) state.selectedUser = user;
        state.loading = false;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        const userId = action.payload;
        state.users = state.users.filter((u) => u.id !== userId);
        state.total -= 1;
        if (state.selectedUser?.id === userId) state.selectedUser = null;
        state.loading = false;
      })
      .addCase(readUserCompaniesThunk.fulfilled, (state, action) => {
        state.userCompanies = action.payload;
        state.loading = false;
      })
      .addCase(readUserByMe.fulfilled, setSelectedUser)
      .addCase(readUserByIdThunk.fulfilled, setSelectedUser)
      .addCase(readUserByEmailThunk.fulfilled, setSelectedUser)
      .addCase(readUserByNicknameThunk.fulfilled, setSelectedUser);

    builder.addMatcher(isRejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, clearSelectedUser, clearUserCompanies } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
