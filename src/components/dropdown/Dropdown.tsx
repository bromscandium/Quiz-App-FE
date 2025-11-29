import React, { ReactNode, useState } from 'react';

import { Button, ButtonProps, Menu, MenuItem } from '@mui/material';

import { Link } from '@libs/i18n/navigation';

interface MenuItemType {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

interface DropdownButtonProps {
  buttonLabel: ReactNode;
  menuItems: MenuItemType[];
  buttonProps?: ButtonProps;
}

export const DropdownButton = ({
  buttonLabel,
  menuItems,
  buttonProps,
}: DropdownButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleItemClick = (item: MenuItemType) => {
    if (item.onClick) item.onClick();
    handleClose();
  };

  return (
    <>
      <Button {...buttonProps} onClick={handleOpen}>
        {buttonLabel}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ '& .MuiPaper-root': { minWidth: 160 } }}
      >
        {menuItems.map((item, idx) => {
          const Component = item.href ? Link : 'div';
          return (
            <MenuItem
              key={idx}
              component={Component}
              {...(item.href ? { href: item.href } : {})}
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
