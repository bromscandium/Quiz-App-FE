'use client';

import {
	Card,
	CardHeader,
	CardContent,
	Typography,
	Box,
	Button,
} from '@mui/material';
import { useRouter } from '@libs/i18n/navigation';
import { Routers } from '@enums/routes';
import { useTranslations } from 'next-intl';

type CompanyCardProps = {
	id: string;
	name: string;
	owner: string;
	description?: string;
	isPrivate?: boolean;
};

export function CompanyCard({
	id,
	name,
	owner,
	description,
	isPrivate,
}: CompanyCardProps) {
	const t = useTranslations('companies');
	const router = useRouter();

	return (
		<Card
			sx={{
				width: 350,
				p: 2,
				borderRadius: 3,
				boxShadow: 3,
				transition: 'transform 0.2s, boxShadow 0.2s',
				'&:hover': {
					transform: 'translateY(-4px)',
					boxShadow: 6,
				},
			}}
		>
			<CardHeader
				title={name}
				slotProps={{
					title: {
						variant: 'h5',
						fontWeight: 600,
						color: 'text.primary',
					},
				}}
			/>
			<CardContent>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 0.5,
						mb: 2,
					}}
				>
					{description && (
						<Typography variant="body2" color="text.secondary">
							{description}
						</Typography>
					)}
					<Typography variant="body2" color="text.secondary">
						{owner}
					</Typography>
					<Typography
						variant="caption"
						sx={{
							px: 1,
							py: 0.5,
							borderRadius: 1,
							bgcolor: isPrivate
								? 'error.main'
								: 'success.main',
							color: 'common.white',
							width: 'fit-content',
							mt: 0.5,
						}}
					>
						{isPrivate ? t('private') : t('public')}
					</Typography>
				</Box>
				<Button
					fullWidth
					variant="contained"
					color="primary"
					onClick={() =>
						router.push(`${Routers.Companies}/${id}`)
					}
				>
					{t('viewCompany')}
				</Button>
			</CardContent>
		</Card>
	);
}
