import { Stack, Typography } from '@mui/material';

interface InfoRowProps {
  label?: string;
  value?: string;
}

export const InfoRow = ({ label, value }: InfoRowProps) => (
  <Stack direction="row" spacing={1}>
    <Typography fontWeight={600}>{label}:</Typography>
    <Typography>{value}</Typography>
  </Stack>
);
