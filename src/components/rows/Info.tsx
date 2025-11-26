import { Stack, Typography } from '@mui/material';

export const InfoRow = ({
  label,
  value,
}: {
  label?: string;
  value?: string;
}) => (
  <Stack direction="row" spacing={1}>
    <Typography fontWeight={600}>{label}:</Typography>
    <Typography>{value}</Typography>
  </Stack>
);
