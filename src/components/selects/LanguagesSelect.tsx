'use client';

import React, { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import { CookieNames, LANGUAGES, Periods } from '@constants';
import { getCookie, setCookie } from '@helpers/cookies';
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

export const LanguageSelect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locale = useSelector((state: RootState) => state.language.locale);
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = searchParams.toString();
  const fullPath = params ? `${pathname}?${params}` : pathname;

  useEffect(() => {
    const setLocaleFromCookie = async () => {
      const cookieLocale = await getCookie({ name: CookieNames.LOCALE });
      if (cookieLocale && cookieLocale !== locale) {
        dispatch(setLanguage(cookieLocale));
        router.replace(fullPath, { locale: cookieLocale });
      }
    };

    setLocaleFromCookie();
  }, []);

  const handleChange = ({ target: { value } }: SelectChangeEvent) => {
    dispatch(setLanguage(value));
    setCookie({
      name: CookieNames.LOCALE,
      value: value,
      maxAge: Periods.MONTH,
    }).then(() => {
      router.replace(fullPath, {
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
};
