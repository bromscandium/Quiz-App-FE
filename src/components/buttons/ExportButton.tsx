'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { ExportAPI } from '@api';
import { ExportTypes } from '@enums/exportTypes';
import { downloadBlob } from '@helpers/export';
import { ExportInterfaces } from '@interfaces';
import { Download, FileDownload } from '@mui/icons-material';
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { useSnackbar } from 'notistack';

interface ExportButtonProps {
  type: 'my-results' | 'company-user' | 'company-all' | 'company-quiz';
  params: {
    quiz_id?: string;
    company_id?: string;
    user_id?: string;
  };
  label?: string;
}

export const ExportButton = ({ type, params, label }: ExportButtonProps) => {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = async (exportType: ExportTypes) => {
    setLoading(true);
    handleClose();

    try {
      let blob: Blob;

      switch (type) {
        case 'my-results':
          blob = await ExportAPI.exportMyResults({
            quiz_id: params.quiz_id,
            export_type: exportType,
          });
          break;
        case 'company-user':
          blob = await ExportAPI.exportCompanyUserResults({
            company_id: params.company_id!,
            user_id: params.user_id!,
            quiz_id: params.quiz_id,
            export_type: exportType,
          });
          break;
        case 'company-all':
          blob = await ExportAPI.exportCompanyAllResults({
            company_id: params.company_id!,
            quiz_id: params.quiz_id,
            export_type: exportType,
          });
          break;
        case 'company-quiz':
          blob = await ExportAPI.exportCompanyQuizResults({
            company_id: params.company_id!,
            quiz_id: params.quiz_id!,
            export_type: exportType,
          });
          break;
      }

      const filename = `results_${new Date().toISOString()}.${exportType}`;
      downloadBlob(blob, filename);
      enqueueSnackbar(t('export.success'), { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(t('export.error'), { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<Download />}
        onClick={handleClick}
        disabled={loading}
      >
        {label || t('export.download')}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleExport(ExportTypes.CSV)}>
          <ListItemIcon>
            <FileDownload />
          </ListItemIcon>
          <ListItemText>CSV</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleExport(ExportTypes.JSON)}>
          <ListItemIcon>
            <FileDownload />
          </ListItemIcon>
          <ListItemText>JSON</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
