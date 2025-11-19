import {configureStore} from '@reduxjs/toolkit';
import {languageReducer} from '@libs/redux/slices/language';
import {loginReducer} from '@libs/redux/slices/login';

export const store = configureStore({
	reducer: {
		language: languageReducer,
		login: loginReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
