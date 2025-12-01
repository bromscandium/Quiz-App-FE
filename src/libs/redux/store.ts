import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { companyReducer } from '@libs/redux/slices/company';
import { companyActionsReducer } from '@libs/redux/slices/companyActions';
import { languageReducer } from '@libs/redux/slices/language';
import { loginReducer } from '@libs/redux/slices/login';
import { membershipReducer } from '@libs/redux/slices/membership';
import { registerReducer } from '@libs/redux/slices/register';
import { userReducer } from '@libs/redux/slices/user';

const appReducer = combineReducers({
  company: companyReducer,
  companyActions: companyActionsReducer,
  language: languageReducer,
  login: loginReducer,
  membership: membershipReducer,
  register: registerReducer,
  user: userReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any
) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
