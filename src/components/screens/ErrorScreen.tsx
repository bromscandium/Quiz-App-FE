import React from 'react';

import { Box, Typography } from '@mui/material';

interface ErrorScreenProps {
  error: string;
}

export const ErrorScreen = ({ error }: ErrorScreenProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200,
      }}
    >
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    </Box>
  );
};
