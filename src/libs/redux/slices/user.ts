import { AuthAPI, UserAPI } from '@api';
import { authBase, usersBase } from '@constants';
import { ParamsInterfaces, UserInterfaces } from '@interfaces';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

interface UsersState {
  users: UserInterfaces.UserSchema[] | null;
  total: number;
  loading: boolean;
  error?: string;
  selectedUser: UserInterfaces.UserSchema | null;
  authUser: UserInterfaces.UserSchema | null;
  userCompanies: UserInterfaces.UserOwnedCompaniesList | null;
}

const initialState: UsersState = {
  users: null,
  total: 0,
  loading: false,
  error: '',
  selectedUser: null,
  authUser: null,
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

export const readUserByMeThunk = createAsyncThunk<
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
  { users: UserInterfaces.UserSchema[] | null; total: number },
  ParamsInterfaces.paginationRequest,
  { rejectValue: string }
>(`${usersBase}/readAllUsers`, async (params, { rejectWithValue }) => {
  try {
    const response = await UserAPI.readAllUsers(params);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      (error as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail || 'Unknown error occurred.'
    );
  }
});

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
  { id: string; params: ParamsInterfaces.paginationRequest },
  { rejectValue: string }
>(
  `${usersBase}/readUserCompanies`,
  async ({ id, params }, { rejectWithValue }) => {
    try {
      const response = await UserAPI.readUserCompanies(id, params);
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
    clearSelectedUser: (state) => {
      state.selectedUser = null;
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
        if (state.users) {
          state.users.push(action.payload);
        }
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
        if (state.users) {
          const index = state.users.findIndex((u) => u.id === user.id);
          if (index !== -1) state.users[index] = user;
        }
        if (state.selectedUser?.id === user.id) state.selectedUser = user;
        state.loading = false;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        const userId = action.payload;
        if (state.users) {
          state.users = state.users.filter((u) => u.id !== userId);
        }
        state.total -= 1;
        if (state.selectedUser?.id === userId) state.selectedUser = null;
        state.loading = false;
      })
      .addCase(readUserCompaniesThunk.fulfilled, (state, action) => {
        state.userCompanies = action.payload;
        state.loading = false;
      })
      .addCase(readUserByMeThunk.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.loading = false;
      })
      .addCase(readUserByIdThunk.fulfilled, setSelectedUser)
      .addCase(readUserByEmailThunk.fulfilled, setSelectedUser)
      .addCase(readUserByNicknameThunk.fulfilled, setSelectedUser);

    builder.addMatcher(
      isPending(
        createUserThunk,
        readUserByMeThunk,
        readUserByIdThunk,
        readUserByEmailThunk,
        readUserByNicknameThunk,
        readAllUsersThunk,
        updateUserThunk,
        deleteUserThunk
      ),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(isRejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearSelectedUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
