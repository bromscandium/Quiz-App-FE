'use client';

import React from 'react';
import {useRouter, usePathname} from '@libs/i18n/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '@libs/redux/store';
import {setLanguage} from '@libs/redux/slices/language';
import {MenuItem, Select, SelectChangeEvent, FormControl} from '@mui/material';

export default function LanguageSelect() {
	const dispatch = useDispatch<AppDispatch>();
	const locale = useSelector((state: RootState) => state.language.locale);
	const router = useRouter();
	const pathname = usePathname();

	const handleChange = ({target: {value}}: SelectChangeEvent) => {
		dispatch(setLanguage(value));
		document.cookie = `NEXT_LOCALE=${value}; path=/`;
		router.replace(pathname, {
			locale: value,
		});
	};

	return (
		<FormControl size="small" sx={{minWidth: 80}}>
			<Select value={locale} onChange={handleChange}>
				<MenuItem value="en">EN</MenuItem>
				<MenuItem value="ua">UA</MenuItem>
			</Select>
		</FormControl>
	);
}
