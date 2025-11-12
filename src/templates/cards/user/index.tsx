import {
	Card,
	CardHeader,
	CardContent,
	Typography,
	Box,
	Button,
} from '@mui/material';
import { useRouter } from '@libs/i18n/navigation';
import { NavLinks } from '@enums/routes';
import { useTranslations } from 'next-intl';

type UserCardProps = {
	id: string;
	name: string;
	surname: string;
	nickname: string;
	email: string;
	created_at: string;
};

export function UserCard({
	id,
	name,
	surname,
	nickname,
	email,
	created_at,
}: UserCardProps) {
	const t = useTranslations('users');
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
				title={`${name} ${surname}`}
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
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{
							fontStyle: 'italic',
						}}
					>
						@{nickname}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{
							wordBreak: 'break-all',
						}}
					>
						{email}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{ fontWeight: 500 }}
					>
						{t('joinedAt')}: {created_at}
					</Typography>
				</Box>
				<Button
					fullWidth
					variant="contained"
					color="primary"
					onClick={() => router.push(`${NavLinks.Users}/${id}`)}
				>
					{t('viewProfile')}
				</Button>
			</CardContent>
		</Card>
	);
}
