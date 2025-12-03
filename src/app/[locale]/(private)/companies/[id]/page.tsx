'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { Routes } from '@constants';
import { ActionTypes, Roles, Tabs } from '@enums';
import { getTabParam, handleTabChange } from '@helpers/queryParams';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { CompanyInfo } from '@components/infos/CompanyInfo';
import { CompanyActionsList } from '@components/lists/CompanyActionsList';
import { MembersList } from '@components/lists/MembersList';
import { QuizzesList } from '@components/lists/QuizzesList';
import { ErrorScreen } from '@components/screens/ErrorScreen';
import { LoadingScreen } from '@components/screens/LoadingScreen';
import { NotFoundScreen } from '@components/screens/NotFoundScreen';
import { HorizontalTabs } from '@components/tabs/HorizontalTabs';

import {
  clearSelectedCompany,
  readCompanyByIdThunk,
} from '@libs/redux/slices/company';
import { readUserMembershipsThunk } from '@libs/redux/slices/membership';
import { AppDispatch, RootState } from '@libs/redux/store';

export default function CompanyPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const { selectedCompany, loading, error } = useSelector(
    (state: RootState) => state.company
  );
  const { memberships } = useSelector((state: RootState) => state.membership);

  const { currentUser } = useSelector((state: RootState) => state.user);

  const defaultTab = Tabs.MEMBERS;
  const tabFromUrl = getTabParam(searchParams, defaultTab) as Tabs;
  const [activeTab, setActiveTab] = useState<string>(tabFromUrl);

  useEffect(() => {
    if (!selectedCompany || selectedCompany.id !== id) {
      dispatch(clearSelectedCompany());
      dispatch(readCompanyByIdThunk(id));
      dispatch(readUserMembershipsThunk({ params: { offset: 0, limit: 20 } }));
    }
  }, [dispatch, id]);

  if (loading) return <LoadingScreen />;

  if (error) return <ErrorScreen error={error} />;

  if (!selectedCompany) return NotFoundScreen(t('company.noCompany'));

  const currentUserMembership = memberships?.find(
    (membership) => membership.company?.id === id
  );

  const isOwner = currentUser?.id === selectedCompany.owner?.id;

  const isAdmin = currentUserMembership?.role === Roles.ADMIN;

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

  const isMember = !!currentUserMembership;

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
        currentUser={currentUser!}
        userMembership={currentUserMembership}
        isOwner={isOwner}
      />

      {isMember && (
        <QuizzesList companyId={id} isOwnerOrAdmin={isOwner || isAdmin} />
      )}

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
