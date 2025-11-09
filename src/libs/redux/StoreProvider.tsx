'use client';

import React from 'react';
import { store } from '@libs/redux/store';
import { Provider } from 'react-redux';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
};
