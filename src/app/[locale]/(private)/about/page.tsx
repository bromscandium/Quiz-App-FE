'use client';

import {useTranslations} from 'next-intl';
import {Box, Typography, List, ListItem, Link as MuiLink} from '@mui/material';

export default function AboutUsPage() {
	const t = useTranslations('about');
	const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL!;

	const offerPoints = [
		'offerList.firstPoint',
		'offerList.secondPoint',
		'offerList.thirdPoint',
		'offerList.fourthPoint',
	];

	return (
		<Box
			sx={{
				maxWidth: '1200px',
				mx: 'auto',
				px: 3,
				py: 6,
				display: 'flex',
				flexDirection: 'column',
				gap: 4,
			}}
		>
			<Typography variant="h3" component="h1" fontWeight={800}>
				{t('title')}
			</Typography>

			<Typography variant="body1">{t('welcome')}</Typography>

			<Typography variant="h5" component="h2" fontWeight={700}>
				{t('visionTitle')}
			</Typography>
			<Typography variant="body1">{t('visionText')}</Typography>

			<Typography variant="h5" component="h2" fontWeight={700}>
				{t('offerTitle')}
			</Typography>
			<List sx={{pl: 2}}>
				{offerPoints.map((key) => (
					<ListItem
						key={key}
						sx={{
							display: 'list-item',
							py: 0,
						}}
					>
						<Typography variant="body1">{t(key)}</Typography>
					</ListItem>
				))}
			</List>

			<Typography variant="h5" component="h2" fontWeight={700}>
				{t('contactTitle')}
			</Typography>
			<Typography variant="body1">{t('contactQuestion')}</Typography>
			{t('contactEmail', {email}) && (
				<Typography variant="body1">
					<MuiLink
						href={`mailto:${email}`}
						sx={{
							color: 'primary.main',
							'&:hover': {
								color: 'primary.dark',
							},
						}}
					>
						{email}
					</MuiLink>
				</Typography>
			)}
			<Typography variant="body1">{t('contactEnd')}</Typography>
		</Box>
	);
}
