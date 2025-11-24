'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';

type DeleteButtonProps = {
  itemName: string;
  itemId: string | number;
  onDeleteAction: () => Promise<void>;
};

export default function DeleteButton({ onDeleteAction }: DeleteButtonProps) {
  const t = useTranslations('actions');
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    await onDeleteAction();
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
          <DialogContentText>{t('confirmDeleteDescription')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('cancel')}</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            {t('delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
