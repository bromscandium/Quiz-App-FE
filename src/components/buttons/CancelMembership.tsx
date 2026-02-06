'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Routes } from '@constants';
import { redirectWithLocale } from '@helpers/redirect';
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

import { deleteMembershipThunk } from '@libs/redux/slices/membership';
import { AppDispatch } from '@libs/redux/store';

type CancelMembershipProps = {
  membershipId: string;
};

export const CancelMembership = ({ membershipId }: CancelMembershipProps) => {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCancel = async () => {
    await dispatch(deleteMembershipThunk(membershipId)).unwrap();
    redirectWithLocale(Routes.Home.href);
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={handleOpen}>
        <Typography>{t('membership.leaveMembership')}</Typography>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('membership.confirmLeaveTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('membership.confirmLeaveDescription')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('common.cancel')}</Button>
          <Button onClick={handleCancel} color="error" variant="contained">
            {t('membership.leave')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
