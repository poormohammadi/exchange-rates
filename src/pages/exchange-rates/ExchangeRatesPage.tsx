import { Container, Typography } from '@mui/material';
import React from 'react';

export const ExchangeRatesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Exchange Rates
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        align="center"
        sx={{ mb: 4 }}
      >
        View exchange rates for the last 7 days from your selected date
      </Typography>
    </Container>
  );
};
