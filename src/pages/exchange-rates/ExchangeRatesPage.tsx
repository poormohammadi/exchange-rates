import { Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import { DatePicker } from './DatePicker';

export const ExchangeRatesPage = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');

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
      <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
    </Container>
  );
};
