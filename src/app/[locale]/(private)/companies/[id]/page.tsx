'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { Routes } from '@constants';
import { ActionTypes, Roles, Tabs } from '@enums';
import { getTabParam, handleTabChange } from '@helpers/queryParams';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { CompanyInfo } from '@components/info/CompanyInfo';
import { CompanyActionsList } from '@components/list/CompanyActionsList';
import { MembersList } from '@components/list/MembersList';
import { LoadingScreen } from '@components/screens/LoadingScreen';
import { notFoundMessage } from '@components/screens/NotFoundScreen';
import { HorizontalTabs } from '@components/tabs/HorizontalTabs';

import {
  clearSelectedCompany,
  readCompanyByIdThunk,
} from '@libs/redux/slices/company';
import { readUserMembershipsThunk } from '@libs/redux/slices/membership';
import { readUserByMeThunk } from '@libs/redux/slices/user';
import { AppDispatch, RootState } from '@libs/redux/store';

export default function CompanyPage() {
  const t = useTranslations('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const { selectedCompany, loading } = useSelector(
    (state: RootState) => state.company
  );
  const { currentUser } = useSelector((state: RootState) => state.user);

  const { memberships } = useSelector((state: RootState) => state.membership);

  const defaultTab = Tabs.MEMBERS;
  const tabFromUrl = getTabParam(searchParams, defaultTab) as Tabs;
  const [activeTab, setActiveTab] = useState<string>(tabFromUrl);

  useEffect(() => {
    if (!currentUser) dispatch(readUserByMeThunk());
    if (!selectedCompany || selectedCompany.id !== id) {
      dispatch(clearSelectedCompany());
      dispatch(readCompanyByIdThunk(id));
    }
  }, [dispatch, currentUser, id]);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(readUserMembershipsThunk({ params: { limit: 20, offset: 0 } }));
    }
  }, [currentUser?.id, dispatch]);

  if (loading) return <LoadingScreen />;
  if (!selectedCompany || !currentUser)
    return notFoundMessage(t('company.noCompany'));

  const currentUserMembership = memberships?.find(
    (membership) => membership.user?.id === currentUser.id
  );

  const isOwner = currentUser?.id === selectedCompany.owner?.id;

  const tabs = [
    {
      label: t('tabs.members'),
      key: Tabs.MEMBERS,
      content: <MembersList companyId={selectedCompany.id} />,
    },
    {
      label: t('tabs.admins'),
      key: Tabs.ADMINS,
      content: (
        <MembersList companyId={selectedCompany.id} filterParam={Roles.ADMIN} />
      ),
    },
    {
      label: t('tabs.requests'),
      key: Tabs.REQUESTS,
      content: (
        <CompanyActionsList
          companyId={selectedCompany.id}
          actionType={ActionTypes.REQUEST}
        />
      ),
    },
    {
      label: t('tabs.invitations'),
      key: Tabs.INVITATIONS,
      content: (
        <CompanyActionsList
          companyId={selectedCompany.id}
          actionType={ActionTypes.INVITATION}
        />
      ),
    },
  ];

  const handleTabClick = (key: string) => {
    setActiveTab(key);
    handleTabChange(key, searchParams, router, Routes.Companies.buildRoute(id));
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
      <CompanyInfo
        company={selectedCompany}
        currentUser={currentUser}
        userMembership={currentUserMembership}
        isOwner={isOwner}
      />

      {isOwner && (
        <HorizontalTabs
          tabs={tabs}
          activeKey={activeTab}
          onTabClick={handleTabClick}
        />
      )}
    </Box>
  );
}
