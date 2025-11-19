import React from 'react';
import {Header} from '@layouts/Header';

export default function PublicLayout({children}: {children: React.ReactNode}) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
