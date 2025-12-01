'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { ActionTypes } from '@enums';
import { CompanyActionsInterfaces } from '@interfaces';
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

import { createCompanyActionThunk } from '@libs/redux/slices/companyActions';
import { AppDispatch } from '@libs/redux/store';

type SendCompanyActionProps = {
  userId: string;
  companyId: string;
  actionType: ActionTypes;
  invitedEmail?: string;
  buttonText?: string;
  confirmTitle?: string;
  confirmDescription?: string;
};

export const SendCompanyActionButton = ({
  userId,
  companyId,
  actionType,
  invitedEmail,
  buttonText,
  confirmTitle,
  confirmDescription,
}: SendCompanyActionProps) => {
  const t = useTranslations('');
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSend = async () => {
    const data: CompanyActionsInterfaces.CompanyActionCreate = {
      user_id: userId,
      company_id: companyId,
      action_type: actionType,
      invited_email: invitedEmail || null,
    };

    await dispatch(createCompanyActionThunk(data));
    handleClose();
  };

  const defaultButtonText =
    actionType === ActionTypes.REQUEST
      ? t('companyActions.sendRequest')
      : t('companyActions.sendInvitation');

  const defaultConfirmTitle =
    actionType === ActionTypes.REQUEST
      ? t('companyActions.confirmRequestTitle')
      : t('companyActions.confirmInvitationTitle');

  const defaultConfirmDescription =
    actionType === ActionTypes.REQUEST
      ? t('companyActions.confirmRequestDescription')
      : t('companyActions.confirmInvitationDescription');

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        <Typography>{buttonText || defaultButtonText}</Typography>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{confirmTitle || defaultConfirmTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmDescription || defaultConfirmDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('common.cancel')}</Button>
          <Button onClick={handleSend} color="primary" variant="contained">
            {t('common.send')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
