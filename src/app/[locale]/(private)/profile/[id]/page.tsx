'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { Routes } from '@constants';
import { ActionTypes, Tabs } from '@enums';
import {
  getInvitationIDParam,
  getTabParam,
  handleTabChange,
} from '@helpers/queryParams';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { UserInfo } from '@components/info/UserInfo';
import { CompanyActionsList } from '@components/list/CompanyActionsList';
import { MembershipsList } from '@components/list/MembershipsList';
import { UserCompaniesList } from '@components/list/UserCompaniesList';
import { ErrorScreen } from '@components/screens/ErrorScreen';
import { LoadingScreen } from '@components/screens/LoadingScreen';
import { notFoundScreen } from '@components/screens/NotFoundScreen';
import { HorizontalTabs } from '@components/tabs/HorizontalTabs';

import { readCompanyByIdThunk } from '@libs/redux/slices/company';
import { clearSelectedUser, readUserByIdThunk } from '@libs/redux/slices/user';
import { AppDispatch, RootState } from '@libs/redux/store';

export default function ProfilePage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const { selectedUser, currentUser, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const { selectedCompany } = useSelector((state: RootState) => state.company);

  const defaultTab = Tabs.OWN_COMPANIES;
  const tabFromUrl = getTabParam(searchParams, defaultTab) as Tabs;
  const [activeTab, setActiveTab] = useState<string>(tabFromUrl);

  const invitationId = getInvitationIDParam(searchParams);

  useEffect(() => {
    if (!selectedUser || selectedUser.id !== id) {
      dispatch(clearSelectedUser());
      dispatch(readUserByIdThunk(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (invitationId) {
      dispatch(readCompanyByIdThunk(invitationId));
    }
  }, [dispatch, invitationId]);

  if (loading) return <LoadingScreen />;

  if (error) return <ErrorScreen error={error} />;

  if (!selectedUser) return notFoundScreen(t('profile.noUser'));

  const isCurrentUser = currentUser?.id === selectedUser.id;

  const tabs = [
    {
      label: t('tabs.myCompanies'),
      key: Tabs.OWN_COMPANIES,
      content: <UserCompaniesList userId={selectedUser.id} />,
    },
    {
      label: t('tabs.memberships'),
      key: Tabs.MEMBERSHIPS,
      content: <MembershipsList userId={selectedUser.id} />,
    },
    {
      label: t('tabs.requests'),
      key: Tabs.REQUESTS,
      content: (
        <CompanyActionsList
          userId={selectedUser.id}
          actionType={ActionTypes.REQUEST}
        />
      ),
    },
    {
      label: t('tabs.invitations'),
      key: Tabs.INVITATIONS,
      content: (
        <CompanyActionsList
          userId={selectedUser.id}
          actionType={ActionTypes.INVITATION}
        />
      ),
    },
  ];

  const handleTabClick = (key: string) => {
    setActiveTab(key);
    handleTabChange(
      key,
      searchParams,
      router,
      `${Routes.Profile.buildRoute(id)}`
    );
  };

  return (
    <Box
      sx={{
        maxWidth: '1300px',
        mx: 'auto',
        px: 3,
        py: 6,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        {t('common.info')}
      </Typography>
      <UserInfo
        user={selectedUser}
        currentUser={currentUser}
        isCurrentUser={isCurrentUser}
        invitationId={invitationId}
        selectedCompany={selectedCompany}
      />

      {isCurrentUser && (
        <HorizontalTabs
          tabs={tabs}
          activeKey={activeTab}
          onTabClick={handleTabClick}
        />
      )}
    </Box>
  );
}
