import { Alert, Box, Button, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';

import { DatePicker } from '../../components';
import {
  addCurrency,
  clearError,
  loadAvailableCurrencies,
  loadExchangeRates,
  removeCurrency,
  setBaseCurrency,
  setSelectedDate,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { CurrencySelector } from './CurrencySelector';
import { CurrencyTable } from './CurrencyTable';

export const ExchangeRatesPage = () => {
  const dispatch = useAppDispatch();
  const {
    baseCurrency,
    selectedCurrencies,
    availableCurrencies,
    selectedDate,
    exchangeRates,
    loading,
    error,
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

  const handleDateChange = (date: string) => {
    dispatch(setSelectedDate(date));
  };

  const handleRetry = () => {
    dispatch(clearError());
    if (baseCurrency && selectedDate) {
      dispatch(loadExchangeRates({ date: selectedDate, baseCurrency }));
    }
  };

  useEffect(() => {
    dispatch(loadAvailableCurrencies());
  }, [dispatch]);

  useEffect(() => {
    if (baseCurrency && selectedDate) {
      dispatch(loadExchangeRates({ date: selectedDate, baseCurrency }));
    }
  }, [dispatch, baseCurrency, selectedDate]);

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
      {error && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={handleRetry}>
              Retry
            </Button>
          }
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      <Box mb={3}>
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
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
