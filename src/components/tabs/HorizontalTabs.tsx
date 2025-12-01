'use client';

import { ReactNode, SyntheticEvent } from 'react';

import { Box, Tab, Tabs } from '@mui/material';

interface TabItem {
  key: string;
  label: string;
  content: ReactNode;
}

interface HorizontalTabsProps {
  tabs: TabItem[];
  activeKey: string;
  onTabClick: (key: string) => void;
}

export const HorizontalTabs = ({
  tabs,
  activeKey,
  onTabClick,
}: HorizontalTabsProps) => {
  const activeIndex = tabs.findIndex((tab) => tab.key === activeKey);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    onTabClick(tabs[newValue].key);
  };

  return (
    <Box>
      <Tabs value={activeIndex >= 0 ? activeIndex : 0} onChange={handleChange}>
        {tabs.map((tab) => (
          <Tab key={tab.key} label={tab.label} />
        ))}
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tabs[activeIndex >= 0 ? activeIndex : 0]?.content}
      </Box>
    </Box>
  );
};
