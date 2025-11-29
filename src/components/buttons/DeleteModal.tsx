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
  onDeleteAction: () => Promise<void>;
};

export const DeleteModalButton = ({ onDeleteAction }: DeleteButtonProps) => {
  const t = useTranslations('');
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
        <Typography>{t('common.delete')}</Typography>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('common.confirmDeleteTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('common.confirmDeleteDescription')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('common.cancel')}</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            {t('common.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
