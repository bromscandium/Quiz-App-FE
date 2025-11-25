import { Box, CircularProgress } from '@mui/material';

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
}