'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Roles } from '@enums';
import { MembershipInterfaces } from '@interfaces';
import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
} from '@mui/material';

import { DeleteModalButton } from '@components/buttons/DeleteModal';

interface MembershipFormProps {
  initialData: MembershipInterfaces.CompanyMembership;
  onSubmit: (data: MembershipInterfaces.MembershipUpdate) => Promise<void>;
  onCancel: () => void;
  onDelete: () => Promise<void>;
}

export default function MembershipForm({
  initialData,
  onSubmit,
  onCancel,
  onDelete,
}: MembershipFormProps) {
  const t = useTranslations();

  const [formData, setFormData] =
    useState<MembershipInterfaces.MembershipUpdate>({
      role: initialData.role,
      is_active: initialData.is_active,
    });

  const availableRoles = [Roles.ADMIN, Roles.USER];

  const handleChange = (
    key: keyof MembershipInterfaces.MembershipUpdate,
    value: Roles | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    await onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Select
          value={formData.role}
          onChange={(e) => handleChange('role', e.target.value as Roles)}
        >
          {availableRoles.map((role) => (
            <MenuItem key={role} value={role}>
              {t(`profile.${role}`)}
            </MenuItem>
          ))}
        </Select>

        <FormControlLabel
          control={
            <Switch
              checked={formData.is_active}
              onChange={(e) => handleChange('is_active', e.target.checked)}
            />
          }
          label={t('membership.isActive')}
        />

        <Stack direction="row" spacing={2}>
          <Button onClick={handleSubmit} variant="contained">
            {t('common.save')}
          </Button>

          <Button onClick={onCancel}>{t('common.cancel')}</Button>

          <DeleteModalButton onDeleteAction={onDelete} />
        </Stack>
      </Stack>
    </Box>
  );
}
