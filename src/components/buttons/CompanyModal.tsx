'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Routes } from '@constants';
import { redirectWithLocale } from '@helpers/redirect';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import CompanyForm from '@components/forms/CompanyForm';

import {
  CompanyCreate,
  CompanySchema,
  CompanyUpdate,
} from '@interfaces/company';

import {
  createCompanyThunk,
  deleteCompanyThunk,
  updateCompanyThunk,
} from '@libs/redux/slices/company';
import { readCompanyActionByIdThunk } from '@libs/redux/slices/companyActions';
import { readUserMembershipsThunk } from '@libs/redux/slices/membership';
import { setErrors } from '@libs/redux/slices/register';
import { AppDispatch } from '@libs/redux/store';

interface CompanyModalButtonProps {
  mode: 'create' | 'edit';
  company?: CompanySchema;
}

export const CompanyModalButton = ({
  mode,
  company,
}: CompanyModalButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data: CompanyCreate | CompanyUpdate) => {
    try {
      if (mode === 'create') {
        await dispatch(createCompanyThunk(data as CompanyCreate)).unwrap();
      } else if (mode === 'edit' && company) {
        await dispatch(
          updateCompanyThunk({ id: company.id, data: data as CompanyUpdate })
        ).unwrap();
      }

      dispatch(readUserMembershipsThunk({ params: { offset: 0, limit: 20 } }));

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
    await dispatch(deleteCompanyThunk(company!.id));
    await redirectWithLocale(Routes.Profile.href);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        <Typography>
          {mode === 'create'
            ? t('company.createCompany')
            : t('company.editCompany')}
        </Typography>
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {mode === 'create'
            ? t('company.createCompanyTitle')
            : t('company.editCompanyTitle')}
        </DialogTitle>

        <DialogContent>
          <CompanyForm
            mode={mode}
            initialData={
              mode === 'edit' && company
                ? {
                    id: company.id,
                    name: company.name,
                    description: company.description,
                    visibility: company.visibility,
                  }
                : undefined
            }
            onSubmit={handleSubmit}
            onCancel={handleClose}
            onDelete={mode === 'edit' ? handleDelete : undefined}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
