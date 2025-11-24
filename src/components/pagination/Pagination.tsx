'use client';

import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  const handlePrev = () => onChange(Math.max(1, page - 1));
  const handleNext = () => onChange(Math.min(totalPages, page + 1));

  if (totalPages <= 1) return null;

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 4 }}
    >
      <IconButton onClick={handlePrev} disabled={page === 1}>
        <ArrowBackIos />
      </IconButton>
      <Typography variant="body1">{page}</Typography>
      <IconButton onClick={handleNext} disabled={page === totalPages}>
        <ArrowForwardIos />
      </IconButton>
    </Stack>
  );
}
