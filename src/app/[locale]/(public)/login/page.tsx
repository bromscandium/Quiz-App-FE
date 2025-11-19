'use client';

import React from 'react';
import {
	Box,
	Typography,
	TextField,
	Button,
	Link as MuiLink,
} from '@mui/material';

import {useTranslations} from 'next-intl';
import {useDispatch, useSelector} from 'react-redux';

import {
	setEmail,
	setPassword,
	setErrors,
	clearErrors,
} from '@libs/redux/slices/login';

import {AppDispatch, RootState} from '@libs/redux/store';
import {Link, redirect} from '@libs/i18n/navigation';
import {Routes} from '@enums/routes';
import {loginActions} from '@actions/auth';
import {routing} from '@libs/i18n/routing';

export default function LoginPage() {
	const dispatch = useDispatch<AppDispatch>();
	const t = useTranslations('login');

	const {email, password, errors} = useSelector(
		(state: RootState) => state.login,
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(clearErrors());

		const newErrors: {email?: string; password?: string; general?: string} =
			{};

		if (!email) newErrors.email = t('errors.emailRequired');
		else if (!/\S+@\S+\.\S+/.test(email))
			newErrors.email = t('errors.emailInvalid');

		if (!password) newErrors.password = t('errors.passwordRequired');
		else if (password.length < 6)
			newErrors.password = t('errors.passwordInvalid');

		if (Object.keys(newErrors).length > 0) {
			dispatch(setErrors(newErrors));
			return;
		}

		try {
			await loginActions({email, password});

			const currentLocaleCookie = await cookieStore.get('NEXT_LOCALE');

			redirect({
				href: Routes.Home.href,
				locale: currentLocaleCookie?.value || routing.defaultLocale,
			});
		} catch {
			newErrors.general = t('errors.generalError');
			dispatch(setErrors(newErrors));
		}
	};

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
			<Box
				sx={{
					width: '100%',
					maxWidth: 400,
					bgcolor: 'background.paper',
					p: 4,
					borderRadius: 2,
					boxShadow: 3,
					display: 'flex',
					flexDirection: 'column',
					gap: 3,
				}}
			>
				<Typography
					variant="h4"
					component="h1"
					textAlign="center"
					fontWeight={700}
				>
					{t('title')}
				</Typography>

				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
					}}
				>
					<TextField
						type="email"
						value={email}
						onChange={(e) => {
							dispatch(setEmail(e.target.value));
							dispatch(clearErrors());
						}}
						error={!!errors.email}
						helperText={errors.email}
						placeholder={t('emailPlaceholder')}
						fullWidth
					/>

					<TextField
						type="password"
						value={password}
						onChange={(e) => {
							dispatch(setPassword(e.target.value));
							dispatch(clearErrors());
						}}
						error={!!errors.password}
						helperText={errors.password}
						placeholder={t('passwordPlaceholder')}
						fullWidth
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={{
							py: 1.5,
							fontWeight: 500,
						}}
						fullWidth
					>
						{t('signIn')}
					</Button>

					{errors.general && (
						<Typography
							color="error"
							textAlign="center"
							variant="subtitle2"
						>
							{errors.general}
						</Typography>
					)}
				</Box>

				<Typography variant="body2" textAlign="center">
					{t('noAccount')}{' '}
					<MuiLink
						component={Link}
						href={Routes.Register.href}
						sx={{
							color: 'primary.main',
							'&:hover': {
								color: 'primary.dark',
							},
						}}
					>
						{t('signUp')}
					</MuiLink>
				</Typography>
			</Box>
		</Box>
	);
}
