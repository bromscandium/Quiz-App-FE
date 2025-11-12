'use client';

import * as React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';

type DeleteButtonProps = {
	itemName: string;
	itemId: string | number;
	onDelete: (id: string | number) => void;
};

export default function DeleteButton({
	itemName,
	itemId,
	onDelete,
}: DeleteButtonProps) {
	const t = useTranslations('actions');
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleDelete = () => {
		onDelete(itemId);
		handleClose();
	};

	return (
		<>
			<Button color="error" variant="contained" onClick={handleOpen}>
				<Typography>{t('delete')}</Typography>
			</Button>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{t('confirmDeleteTitle')}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{t('confirmDeleteDescription', { itemName })}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>{t('cancel')}</Button>
					<Button
						onClick={handleDelete}
						color="error"
						variant="contained"
					>
						{t('delete')}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
