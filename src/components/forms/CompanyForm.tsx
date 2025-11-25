'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { ValidationData, hasErrors, validation } from '@helpers/validation';
import {
  Box,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from '@mui/material';

import DeleteModalButton from '@components/buttons/DeleteModal';

import { CompanyCreate, CompanyUpdate } from '@interfaces/company';

interface CompanyFormProps {
  mode: 'create' | 'edit';
  initialData?: CompanyUpdate & { id?: string };
  onSubmit: (data: CompanyCreate | CompanyUpdate) => Promise<void>;
  onCancel: () => void;
  onDelete?: () => Promise<void>;
}

export default function CompanyForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
  onDelete,
}: CompanyFormProps) {
  const t = useTranslations('company');
  const tCommon = useTranslations('common');

  const [formData, setFormData] = useState<CompanyUpdate>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    visibility: initialData?.visibility ?? false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fields = [
    { name: 'name', label: t('name'), type: 'text' },
    { name: 'description', label: t('description'), multiline: true, rows: 4 },
  ];

  const handleChange = (key: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handleSubmit = async () => {
    const dataToSend = { ...formData };

    const validationErrors = validation(dataToSend as ValidationData, tCommon);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) return;

    await onSubmit(dataToSend);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        {fields.map((field) => (
          <TextField
            key={field.name}
            placeholder={field.label}
            value={formData[field.name as keyof CompanyUpdate] ?? ''}
            type={field.type || 'text'}
            multiline={field.multiline}
            rows={field.rows}
            fullWidth
            onChange={(e) => handleChange(field.name, e.target.value)}
            error={!!errors[field.name]}
            helperText={errors[field.name]}
          />
        ))}

        <FormControlLabel
          control={
            <Switch
              checked={formData.visibility}
              onChange={(e) => handleChange('visibility', e.target.checked)}
            />
          }
          label={t('visibility')}
        />

        <Stack direction="row" spacing={2}>
          <Button onClick={handleSubmit} variant="contained">
            {mode === 'create' ? t('create') : t('save')}
          </Button>

          <Button onClick={onCancel}>{tCommon('cancel')}</Button>
          {mode === 'edit' && onDelete && (
            <DeleteModalButton onDeleteAction={onDelete} />
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
