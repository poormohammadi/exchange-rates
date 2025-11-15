import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  SelectChangeEvent,
  Typography,
  Alert,
} from '@mui/material';

interface CurrencySelectorProps {
  baseCurrency: string;
  selectedCurrencies: string[];
  availableCurrencies: { code: string; name: string }[];
  onBaseCurrencyChange: (currency: string) => void;
  onAddCurrency: (currency: string) => void;
  onRemoveCurrency: (currency: string) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  baseCurrency,
  selectedCurrencies,
  availableCurrencies,
  onBaseCurrencyChange,
  onAddCurrency,
  onRemoveCurrency,
}) => {
  const [newCurrency, setNewCurrency] = useState('');

  const handleBaseCurrencyChange = (event: SelectChangeEvent<string>) => {
    onBaseCurrencyChange(event.target.value);
  };

  const handleAddCurrency = (event: SelectChangeEvent<string>) => {
    const currency = event.target.value;
    if (currency && !selectedCurrencies.includes(currency)) {
      onAddCurrency(currency);
      setNewCurrency('');
    }
  };

  const availableForSelection = availableCurrencies.filter(
    currency =>
      currency.code !== baseCurrency &&
      !selectedCurrencies.includes(currency.code)
  );

  const canAddMore = selectedCurrencies.length < 7;
  const canRemoveMore = selectedCurrencies.length > 3;

  return (
    <Box mb={3}>
      <Box mb={2}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Base Currency</InputLabel>
          <Select
            value={baseCurrency}
            label="Base Currency"
            onChange={handleBaseCurrencyChange}
          >
            {availableCurrencies.map(currency => (
              <MenuItem key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          Selected Currencies ({selectedCurrencies.length}/7)
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          {selectedCurrencies.map(currency => {
            const currencyInfo = availableCurrencies.find(
              c => c.code === currency
            );
            return (
              <Chip
                key={currency}
                label={`${currency} - ${currencyInfo?.name || currency}`}
                onDelete={
                  canRemoveMore ? () => onRemoveCurrency(currency) : undefined
                }
                color="primary"
              />
            );
          })}
        </Box>
      </Box>

      {canAddMore && (
        <FormControl fullWidth>
          <InputLabel>Add Currency</InputLabel>
          <Select
            value={newCurrency}
            label="Add Currency"
            onChange={handleAddCurrency}
          >
            {availableForSelection.map(currency => (
              <MenuItem key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {!canAddMore && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Maximum of 7 currencies reached. Remove a currency to add a new one.
        </Alert>
      )}

      {!canRemoveMore && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Minimum of 3 currencies required. Add a currency before removing
          another.
        </Alert>
      )}
    </Box>
  );
};
