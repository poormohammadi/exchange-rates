import { Box, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';

import {
  addCurrency,
  loadAvailableCurrencies,
  removeCurrency,
  setBaseCurrency,
  setSelectedDate,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { CurrencySelector } from './CurrencySelector';
import { CurrencyTable } from './CurrencyTable';
import { DatePicker } from './DatePicker';

export const ExchangeRatesPage = () => {
  const dispatch = useAppDispatch();
  const {
    baseCurrency,
    selectedCurrencies,
    availableCurrencies,
    selectedDate,
    exchangeRates,
    loading,
  } = useAppSelector(state => state.currency);

  const handleAddCurrency = (currency: string) => {
    dispatch(addCurrency(currency));
  };

  const handleRemoveCurrency = (currency: string) => {
    dispatch(removeCurrency(currency));
  };

  const handleBaseCurrencyChange = (currency: string) => {
    dispatch(setBaseCurrency(currency));
  };

  useEffect(() => {
    dispatch(loadAvailableCurrencies());
  }, [dispatch]);

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
      <Box mb={3}>
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </Box>
      <Box mb={3}>
        <CurrencySelector
          baseCurrency={baseCurrency}
          selectedCurrencies={selectedCurrencies}
          availableCurrencies={availableCurrencies}
          onBaseCurrencyChange={handleBaseCurrencyChange}
          onAddCurrency={handleAddCurrency}
          onRemoveCurrency={handleRemoveCurrency}
        />
      </Box>
      <CurrencyTable
        exchangeRates={exchangeRates}
        selectedCurrencies={selectedCurrencies}
        loading={loading}
      />
    </Container>
  );
};
