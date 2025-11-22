'use client';

import React from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';

export type AuthField = {
  name: string;
  value: string;
  error?: string;
  placeholder: string;
  type?: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export interface AuthFormProps {
  fields: AuthField[];
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
  generalError?: string;
}

export function AuthForm({
  fields,
  onSubmit,
  submitLabel,
  generalError,
}: AuthFormProps) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {fields.map((field) => (
        <TextField
          key={field.name}
          type={field.type ?? 'text'}
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          error={!!field.error}
          helperText={field.error}
          placeholder={field.placeholder}
          fullWidth
          required={field.required}
        />
      ))}

      {generalError && (
        <Typography color="error" textAlign="center" variant="subtitle2">
          {generalError}
        </Typography>
      )}

      <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5 }}>
        {submitLabel}
      </Button>
    </Box>
  );
}
