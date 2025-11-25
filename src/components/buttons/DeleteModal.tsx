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

export default function DeleteModalButton({
  onDeleteAction,
}: DeleteButtonProps) {
  const tCommon = useTranslations('common');
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
        <Typography>{tCommon('delete')}</Typography>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{tCommon('confirmDeleteTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {tCommon('confirmDeleteDescription')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{tCommon('cancel')}</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            {tCommon('delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
