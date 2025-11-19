'use client';
import {CompanyCard} from '@templates/cards/company';
import {useTranslations} from 'next-intl';
import {Box, Typography} from '@mui/material';

const mockCompanies = [
	{
		id: '1',
		name: 'Acme Corp',
		owner: 'John',
		description: 'Tech company',
		isPrivate: true,
	},
	{
		id: '2',
		name: 'Beta Ltd',
		owner: 'Jane',
		description: 'Marketing agency',
		isPrivate: false,
	},
];

export default function CompaniesPage() {
	const t = useTranslations('companies');

	return (
		<Box
			sx={{
				maxWidth: '1300px',
				mx: 'auto',
				px: 3,
				py: 6,
				display: 'flex',
				flexDirection: 'column',
				gap: 4,
			}}
		>
			<Typography variant="h4" component="h2" fontWeight="bold">
				{t('title')}
			</Typography>

			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						sm: 'repeat(2, 1fr)',
						md: 'repeat(3, 1fr)',
					},
					gap: 3,
				}}
			>
				{mockCompanies.map((company) => (
					<Box key={company.id}>
						<CompanyCard {...company} />
					</Box>
				))}
			</Box>
		</Box>
	);
}
