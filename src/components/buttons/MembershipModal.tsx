'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { MembershipInterfaces } from '@interfaces';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import MembershipForm from '@components/forms/MembershipForm';

import {
  deleteMembershipThunk,
  updateMembershipThunk,
} from '@libs/redux/slices/membership';
import { setErrors } from '@libs/redux/slices/register';
import { AppDispatch } from '@libs/redux/store';

interface MembershipModalButtonProps {
  member: MembershipInterfaces.CompanyMembership;
}

export const MembershipModalButton = ({
  member,
}: MembershipModalButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data: MembershipInterfaces.MembershipUpdate) => {
    try {
      await dispatch(updateMembershipThunk({ id: member.id, data })).unwrap();

      handleClose();
    } catch (error: unknown) {
      const errorMessage =
        typeof error === 'string'
          ? error
          : error?.toString() || 'Unknown error occurred.';

      dispatch(setErrors({ general: errorMessage }));
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteMembershipThunk(member.id));
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        <Typography>{t('membership.editMembership')}</Typography>
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{t('membership.editMembership')}</DialogTitle>

        <DialogContent>
          <MembershipForm
            initialData={member}
            onSubmit={handleSubmit}
            onCancel={handleClose}
            onDelete={handleDelete}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
