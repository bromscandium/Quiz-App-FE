'use client';

import {Box, Typography} from '@mui/material';
import {useTranslations} from 'next-intl';

export default function RegisterPage() {
	const t = useTranslations('register');

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				p: 2,
			}}
		>
			<Typography variant="h6">{t('message')}</Typography>
		</Box>
	);
}
