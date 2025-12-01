'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { ActionTypes } from '@enums';
import { Avatar, Box, Button, Paper, Stack, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

import { logoutActions } from '@actions/auth';

import { CompanyModalButton } from '@components/buttons/CompanyModal';
import { DeleteModalButton } from '@components/buttons/DeleteModal';
import { SendCompanyActionButton } from '@components/buttons/SendCompanyAction';
import { FieldConfig, UserEditForm } from '@components/forms/UserEditForm';
import { InfoRow } from '@components/rows/InfoRow';

import { CompanySchema } from '@interfaces/company';
import { UserSchema, UserUpdate } from '@interfaces/user';

import { deleteUserThunk, updateUserThunk } from '@libs/redux/slices/user';
import { AppDispatch } from '@libs/redux/store';

interface UserInfoProps {
  user: UserSchema | null;
  currentUser: UserSchema | null;
  isCurrentUser: boolean;
  selectedCompany?: CompanySchema | null;
  invitationId?: string;
}

export const UserInfo = ({
  user,
  currentUser,
  isCurrentUser,
  selectedCompany,
  invitationId,
}: UserInfoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations('');
  const theme = useTheme();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const avatarColor = theme.palette.primary.main;

  const canSendInvitation =
    invitationId &&
    selectedCompany &&
    selectedCompany.owner?.id === currentUser?.id &&
    user?.id !== currentUser?.id;

  const formData: UserUpdate = {
    name: user?.name ?? '',
    surname: user?.surname ?? '',
    nickname: user?.nickname ?? '',
    birthday: user?.birthday ? dayjs(user?.birthday) : null,
    bio: user?.bio ?? '',
    password: '',
  };

  const fields: FieldConfig[] = [
    { name: 'name', label: t('profile.name') },
    { name: 'surname', label: t('profile.surname') },
    { name: 'nickname', label: t('profile.nickname') },
    { name: 'birthday', label: t('profile.birthday'), type: 'date' },
    { name: 'bio', label: t('profile.bio'), multiline: true, rows: 3 },
    { name: 'password', label: t('profile.password'), type: 'password' },
  ];

  const handleSave = async (data: UserUpdate) => {
    const dataToSend = { ...data };
    if (!dataToSend.password) delete dataToSend.password;
    await dispatch(updateUserThunk({ id: user!.id, data: dataToSend }));
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteUserThunk(user!.id));
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
          src={user?.avatar_url ?? undefined}
          sx={{
            width: 90,
            height: 90,
            fontSize: 32,
            bgcolor: avatarColor,
            color: '#fff',
          }}
        >
          {user?.avatar_url && user?.name[0]?.toUpperCase()}
        </Avatar>

        <Box flex={1} mt={{ xs: 2, sm: 0 }}>
          {isEditing && isCurrentUser ? (
            <UserEditForm
              initialData={formData}
              fields={fields}
              onSubmit={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <Stack spacing={1}>
                <InfoRow
                  label={t('profile.name')}
                  value={user?.name || t('common.notSet')}
                />
                <InfoRow
                  label={t('profile.surname')}
                  value={user?.surname || t('common.notSet')}
                />
                <InfoRow
                  label={t('profile.nickname')}
                  value={
                    user?.nickname ? `@${user.nickname}` : t('common.notSet')
                  }
                />
                <InfoRow
                  label={t('profile.email')}
                  value={user?.email || t('common.notSet')}
                />
                <InfoRow
                  label={t('profile.birthday')}
                  value={user?.birthday || t('common.notSet')}
                />
                <InfoRow
                  label={t('profile.bio')}
                  value={user?.bio || t('common.notSet')}
                />
                <InfoRow
                  label={t('profile.created')}
                  value={user?.created_at?.slice(0, 10) || t('common.notSet')}
                />
              </Stack>
              {isCurrentUser && (
                <Stack direction="row" spacing={2} mt={2}>
                  <>
                    <Button
                      variant="contained"
                      onClick={() => setIsEditing(true)}
                    >
                      {t('profile.editProfile')}
                    </Button>

                    <CompanyModalButton mode="create" />

                    <DeleteModalButton onDeleteAction={handleDelete} />
                  </>
                </Stack>
              )}
              {canSendInvitation && (
                <Stack direction="row" spacing={2} mt={2}>
                  <SendCompanyActionButton
                    userId={user!.id}
                    companyId={invitationId}
                    actionType={ActionTypes.INVITATION}
                    buttonText={t('companyActions.sendInvite')}
                  />
                </Stack>
              )}
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
};
