'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { ValidationData, hasErrors, validation } from '@helpers/validation';
import { Button, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

export type FieldConfig = {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'email' | 'password';
  multiline?: boolean;
  rows?: number;
};

interface UserEditFormProps<T extends Record<string, any>> {
  initialData: T;
  fields: FieldConfig[];
  onSubmit: (data: T) => void | Promise<void>;
  onCancel?: () => void;
}

export const UserEditForm = <T extends Record<string, any>>({
  initialData,
  fields,
  onSubmit,
  onCancel,
}: UserEditFormProps<T>) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = useTranslations();

  const handleChange = (key: string, value: string | number | Dayjs | null) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handleSubmit = async () => {
    const dataToSend: any = { ...formData };

    if (!dataToSend.password) delete dataToSend.password;

    fields.forEach((field) => {
      if (field.type === 'date' && formData[field.name]) {
        dataToSend[field.name] = (formData[field.name] as Dayjs).format(
          'YYYY-MM-DD'
        );
      }
    });

    const validationErrors = validation(dataToSend as ValidationData, t);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) return;

    await onSubmit(dataToSend);
  };

  return (
    <Stack spacing={2}>
      {fields.map((field) => {
        if (field.type === 'date') {
          return (
            <DatePicker
              key={field.name}
              label={t(field.label)}
              value={(formData[field.name] as Dayjs) || null}
              onChange={(newValue) =>
                handleChange(field.name, newValue ?? null)
              }
              slotProps={{
                textField: { fullWidth: true },
              }}
            />
          );
        }

        return (
          <TextField
            key={field.name}
            label={t(field.label)}
            value={(formData[field.name] as string | number) ?? ''}
            type={field.type || 'text'}
            multiline={field.multiline}
            rows={field.rows}
            fullWidth
            onChange={(e) => handleChange(field.name, e.target.value)}
            error={!!errors[field.name]}
            helperText={errors[field.name]}
          />
        );
      })}

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleSubmit}>
          {t('common.save')}
        </Button>
        {onCancel && (
          <Button variant="outlined" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
