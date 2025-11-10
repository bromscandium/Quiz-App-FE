'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@ui/select';

export default function LanguageSelect() {
    const locale = useLocale();
    const router = useRouter();

    const handleChangeLocale = (newLocale: string) => {
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
