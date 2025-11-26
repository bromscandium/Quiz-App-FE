'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

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
import { AppDispatch } from '@libs/redux/store';

interface CompanyModalButtonProps {
  mode: 'create' | 'edit';
  company?: CompanySchema;
}

export default function CompanyModalButton({
  mode,
  company,
}: CompanyModalButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations('company');

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

      handleClose();
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteCompanyThunk(company!.id));
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        <Typography>
          {mode === 'create' ? t('createCompany') : t('editCompany')}
        </Typography>
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {mode === 'create' ? t('createCompanyTitle') : t('editCompanyTitle')}
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
}
