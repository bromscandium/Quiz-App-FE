import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LanguageState {
	locale: string;
}

const initialState: LanguageState = {
	locale: 'en',
};

const languageSlice = createSlice({
	name: 'language',
	initialState,
	reducers: {
		setLanguage: (state, action: PayloadAction<string>) => {
			state.locale = action.payload;
		},
	},
});

export const {setLanguage} = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
