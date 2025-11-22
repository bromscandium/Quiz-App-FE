import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface LoginState {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
    general?: string;
  };
}

const initialState: LoginState = {
  email: '',
  password: '',
  errors: {},
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setErrors: (state, action: PayloadAction<LoginState['errors']>) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
  },
});

export const { setEmail, setPassword, setErrors, clearErrors } =
  loginSlice.actions;
export const loginReducer = loginSlice.reducer;
