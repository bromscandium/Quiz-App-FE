'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

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

interface EditFormProps<T extends Record<string, any>> {
  initialData: T;
  fields: FieldConfig[];
  onSubmit: (data: T) => void | Promise<void>;
  onCancel?: () => void;
}

export const EditForm = <T extends Record<string, any>>({
  initialData,
  fields,
  onSubmit,
  onCancel,
}: EditFormProps<T>) => {
  const [formData, setFormData] = useState<T>(initialData);
  const t = useTranslations('profile');

  const handleChange = (key: string, value: string | number | Dayjs | null) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const dataToSend: any = { ...formData };

    if (!dataToSend.password) delete dataToSend.password;

    fields.forEach((field) => {
      if (field.type === 'date' && formData[field.name]) {
        dataToSend[field.name] = (formData[field.name] as Dayjs).format(
          'YYYY-MM-DD'
        );
      }
    });

    onSubmit(dataToSend);
  };

  return (
    <Stack spacing={2}>
      {fields.map((field) => {
        if (field.type === 'date') {
          return (
            <DatePicker
              key={field.name}
              label={field.label}
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
            label={field.label}
            value={(formData[field.name] as string | number) ?? ''}
            type={field.type || 'text'}
            multiline={field.multiline}
            rows={field.rows}
            fullWidth
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
      })}

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleSubmit}>
          {t('save')}
        </Button>
        {onCancel && (
          <Button variant="outlined" onClick={onCancel}>
            {t('cancel')}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
