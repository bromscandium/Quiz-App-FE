import { configureStore } from '@reduxjs/toolkit';

import { languageReducer } from '@libs/redux/slices/language';
import { loginReducer } from '@libs/redux/slices/login';
import { registerReducer } from '@libs/redux/slices/register';
import { userReducer } from '@libs/redux/slices/user';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    login: loginReducer,
    register: registerReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
