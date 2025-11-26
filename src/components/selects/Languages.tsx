'use client';

import React from 'react';

import { CookieNames, LANGUAGES, Limits } from '@constants';
import { setCookie } from '@helpers/cookies';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname, useRouter } from '@libs/i18n/navigation';
import { setLanguage } from '@libs/redux/slices/language';
import { AppDispatch, RootState } from '@libs/redux/store';

export default function LanguageSelect() {
  const dispatch = useDispatch<AppDispatch>();
  const locale = useSelector((state: RootState) => state.language.locale);
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = ({ target: { value } }: SelectChangeEvent) => {
    dispatch(setLanguage(value));
    setCookie({
      name: CookieNames.LOCALE,
      value: value,
      maxAge: Limits.COOKIE_MAX_AGE.MONTH,
    }).then(() => {
      router.replace(pathname, {
        locale: value,
      });
    });
  };

  return (
    <FormControl size="small" sx={{ minWidth: 80 }}>
      <Select value={locale} onChange={handleChange}>
        {LANGUAGES.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            {lang.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
