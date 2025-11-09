import { configureStore } from '@reduxjs/toolkit';
import languageSlice from './slices/language';

export const store = configureStore({
    reducer: {
        language: languageSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
