import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface RegisterState {
  name: string;
  surname: string;
  nickname: string;
  email: string;
  password: string;
  errors: {
    name?: string;
    surname?: string;
    nickname?: string;
    email?: string;
    password?: string;
    general?: string;
  };
}

const initialState: RegisterState = {
  name: '',
  surname: '',
  nickname: '',
  email: '',
  password: '',
  errors: {},
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSurname: (state, action: PayloadAction<string>) => {
      state.surname = action.payload;
    },
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setErrors: (state, action: PayloadAction<RegisterState['errors']>) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
  },
});

export const {
  setName,
  setSurname,
  setNickname,
  setEmail,
  setPassword,
  setErrors,
  clearErrors,
} = registerSlice.actions;

export const registerReducer = registerSlice.reducer;
