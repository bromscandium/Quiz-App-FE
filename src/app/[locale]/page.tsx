'use client';

import { Box, Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import DeleteButton from '@templates/buttons/delete';
import * as HealthCheckApi from '@api/healthcheck';

export default function HomePage() {
	const tHome = useTranslations('home');
	const tTest = useTranslations('test');
	const applicationName: string = process.env.NEXT_PUBLIC_APP_NAME!;

	const handleHealthCheck = async () => {
		try {
			const response = await HealthCheckApi.getHealthCheckRedis();
			console.log('HealthCheck:', response.data);
		} catch (error) {
			console.error('HealthCheck error:', error);
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
					display: 'flex',
					flexDirection: 'column',
					gap: 4,
					alignItems: 'center',
					textAlign: 'center',
					maxWidth: 600,
				}}
			>
				<Typography variant="h2" component="h1" fontWeight="bold">
					{applicationName}
				</Typography>

				<Typography variant="body1" color="text.secondary">
					{tHome('description')}
				</Typography>

				<DeleteButton
					itemName={tTest('testItemName')}
					itemId={123}
					onDelete={() => console.log('Deleted item')}
				/>
				<Button onClick={handleHealthCheck}>
					Test Health Check For Development
				</Button>
			</Box>
		</Box>
	);
}
