'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

import { logoutActions } from '@actions/auth';

import { logout } from '@api/auth';

import DeleteButton from '@components/buttons/Delete';
import { EditForm, FieldConfig } from '@components/forms/EditForm';

import { UserSchema, UserUpdate } from '@interfaces/user';

import { deleteUserThunk, updateUserThunk } from '@libs/redux/slices/user';
import { AppDispatch } from '@libs/redux/store';

interface UserInfoProps {
  user: UserSchema;
  isOwner: boolean;
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Stack direction="row" spacing={1}>
    <Typography fontWeight={600}>{label}:</Typography>
    <Typography>{value}</Typography>
  </Stack>
);

export default function UserInfo({ user, isOwner }: UserInfoProps) {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations('profile');
  const theme = useTheme();

  const avatarColor = theme.palette.primary.main;

  const formData: UserUpdate = {
    name: user.name ?? '',
    surname: user.surname ?? '',
    nickname: user.nickname ?? '',
    birthday: user.birthday ? dayjs(user.birthday) : null,
    bio: user.bio ?? '',
    password: '',
  };

  const fields: FieldConfig[] = [
    { name: 'name', label: t('name') },
    { name: 'surname', label: t('surname') },
    { name: 'nickname', label: t('nickname') },
    { name: 'birthday', label: t('birthday'), type: 'date' },
    { name: 'bio', label: t('bio'), multiline: true, rows: 3 },
    { name: 'password', label: t('password'), type: 'password' },
  ];

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave = async (data: UserUpdate) => {
    const dataToSend = { ...data };
    if (!dataToSend.password) delete dataToSend.password;
    await dispatch(updateUserThunk({ id: user.id, data: dataToSend }));
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteUserThunk(user.id));
    await logoutActions();
  };

  return (
    <Paper sx={{ width: '100%', p: 4 }}>
      <Box
        display="flex"
        gap={3}
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems="center"
      >
        <Avatar
          src={user.avatar_url ?? undefined}
          sx={{
            width: 90,
            height: 90,
            fontSize: 32,
            bgcolor: avatarColor,
            color: '#fff',
          }}
        >
          {!user.avatar_url && user.name[0]?.toUpperCase()}
        </Avatar>

        <Box flex={1} mt={{ xs: 2, sm: 0 }}>
          {isEditing && isOwner ? (
            <EditForm
              initialData={formData}
              fields={fields}
              onSubmit={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <Stack spacing={1}>
                <InfoRow label={t('name')} value={user.name || t('notSet')} />
                <InfoRow
                  label={t('surname')}
                  value={user.surname || t('notSet')}
                />
                <InfoRow
                  label={t('nickname')}
                  value={`@${user.nickname || t('notSet')}`}
                />
                <InfoRow label={t('email')} value={user.email || t('notSet')} />
                <InfoRow
                  label={t('birthday')}
                  value={user.birthday || t('notSet')}
                />
                <InfoRow label={t('bio')} value={user.bio || t('notSet')} />
                <InfoRow
                  label={t('created')}
                  value={user.created_at?.slice(0, 10) || t('notSet')}
                />
              </Stack>

              {isOwner && (
                <Stack direction="row" spacing={2} mt={2}>
                  <Button
                    variant="contained"
                    onClick={() => setIsEditing(true)}
                  >
                    {t('editProfile')}
                  </Button>

                  <DeleteButton
                    onDeleteAction={handleDelete}
                    itemName={'profile'}
                    itemId={''}
                  />
                </Stack>
              )}
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
