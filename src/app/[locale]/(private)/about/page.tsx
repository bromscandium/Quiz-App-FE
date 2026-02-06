'use client';

import { useTranslations } from 'next-intl';

import { Env } from '@constants';
import {
  Box,
  List,
  ListItem,
  Link as MuiLink,
  Typography,
} from '@mui/material';

export default function AboutUsPage() {
  const t = useTranslations();

  const email: string = Env.SUPPORT_EMAIL!;

  const offerPoints = [
    'offerList.firstPoint',
    'offerList.secondPoint',
    'offerList.thirdPoint',
    'offerList.fourthPoint',
  ];

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: 3,
        py: 6,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Typography variant="h3" component="h1" fontWeight={800}>
        {Env.APP_NAME}
      </Typography>

      <Typography variant="body1">{t('about.welcome')}</Typography>

      <Typography variant="h5" component="h2" fontWeight={700}>
        {t('about.visionTitle')}
      </Typography>
      <Typography variant="body1">{t('about.visionText')}</Typography>

      <Typography variant="h5" component="h2" fontWeight={700}>
        {t('about.offerTitle')}
      </Typography>
      <List sx={{ pl: 2 }}>
        {offerPoints.map((key) => (
          <ListItem
            key={key}
            sx={{
              display: 'list-item',
              py: 0,
            }}
          >
            <Typography variant="body1">{t(`about.${key}`)}</Typography>
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" component="h2" fontWeight={700}>
        {t('about.contactTitle')}
      </Typography>
      <Typography variant="body1">{t('about.contactQuestion')}</Typography>
      {t('about.contactEmail', { email }) && (
        <Typography variant="body1">
          <MuiLink
            href={`mailto:${email}`}
            sx={{
              color: 'primary.main',
              '&:hover': {
                color: 'primary.dark',
              },
            }}
          >
            {email}
          </MuiLink>
        </Typography>
      )}
      <Typography variant="body1">{t('about.contactEnd')}</Typography>
    </Box>
  );
}
