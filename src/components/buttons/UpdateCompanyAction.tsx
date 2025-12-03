'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { ActionStatuses } from '@enums';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import {
  deleteCompanyActionThunk,
  updateCompanyActionThunk,
} from '@libs/redux/slices/companyActions';
import { AppDispatch } from '@libs/redux/store';

type UpdateCompanyActionButtonProps = {
  actionId: string;
  newStatus: ActionStatuses;
};

export const UpdateCompanyActionButton = ({
  actionId,
  newStatus,
}: UpdateCompanyActionButtonProps) => {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = async () => {
    if (newStatus === ActionStatuses.CANCELLED) {
      await dispatch(deleteCompanyActionThunk(actionId));
    } else if (newStatus === ActionStatuses.ACCEPTED) {
      await dispatch(
        updateCompanyActionThunk({
          id: actionId,
          data: { status: ActionStatuses.ACCEPTED },
        })
      );
      await dispatch(deleteCompanyActionThunk(actionId));
    }
    handleClose();
  };

  const buttonText =
    newStatus === ActionStatuses.CANCELLED
      ? t('companyActions.cancelAction')
      : t('companyActions.acceptAction');

  return (
    <>
      <Button
        variant="contained"
        color={newStatus === ActionStatuses.CANCELLED ? 'error' : 'primary'}
        onClick={handleOpen}
      >
        <Typography>{buttonText}</Typography>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {newStatus === ActionStatuses.CANCELLED
            ? t('companyActions.confirmCancelTitle')
            : t('companyActions.confirmAcceptTitle')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {newStatus === ActionStatuses.CANCELLED
              ? t('companyActions.confirmCancelDescription')
              : t('companyActions.confirmAcceptDescription')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('common.no')}</Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color={newStatus === ActionStatuses.CANCELLED ? 'error' : 'primary'}
          >
            {t('common.yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
