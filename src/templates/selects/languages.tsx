'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '@libs/redux/store';
import { setLanguage } from '@libs/redux/slices/language';

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@ui/select';

export default function LanguageSelect() {
    const dispatch = useDispatch<AppDispatch>();
    const locale = useSelector((state: RootState) => state.language.locale);
    const router = useRouter();

    const handleChangeLocale = (newLocale: string) => {
        dispatch(setLanguage(newLocale));
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/`;
        router.push(`/${newLocale}`);
    };

    return (
        <Select value={locale} onValueChange={handleChangeLocale}>
            <SelectTrigger className="w-24">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="ua">UA</SelectItem>
            </SelectContent>
        </Select>
    );
}
