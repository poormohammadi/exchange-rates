import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchAvailableCurrencies } from '../../api';
import { Currency, CurrencyData } from '../../types';

const DEFAULT_CURRENCIES = ['USD', 'EUR', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR'];
const DEFAULT_BASE_CURRENCY = 'GBP';

interface CurrencyState {
  baseCurrency: string;
  selectedCurrencies: string[];
  availableCurrencies: Currency[];
  exchangeRates: CurrencyData[];
  loading: boolean;
  error: string | null;
  selectedDate: string;
}

const initialState: CurrencyState = {
  baseCurrency: DEFAULT_BASE_CURRENCY,
  selectedCurrencies: DEFAULT_CURRENCIES,
  availableCurrencies: [],
  exchangeRates: [],
  loading: false,
  error: null,
  selectedDate: new Date().toISOString().split('T')[0],
};

export const loadAvailableCurrencies = createAsyncThunk(
  'currency/loadAvailableCurrencies',
  async () => {
    return await fetchAvailableCurrencies();
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency: (state, action: PayloadAction<string>) => {
      state.baseCurrency = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    addCurrency: (state, action: PayloadAction<string>) => {
      if (
        state.selectedCurrencies.length < 7 &&
        !state.selectedCurrencies.includes(action.payload)
      ) {
        state.selectedCurrencies.push(action.payload);
      }
    },
    removeCurrency: (state, action: PayloadAction<string>) => {
      if (state.selectedCurrencies.length > 3) {
        state.selectedCurrencies = state.selectedCurrencies.filter(
          code => code !== action.payload
        );
      }
    },
    setSelectedCurrencies: (state, action: PayloadAction<string[]>) => {
      if (action.payload.length >= 3 && action.payload.length <= 7) {
        state.selectedCurrencies = action.payload;
      }
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAvailableCurrencies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAvailableCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.availableCurrencies = action.payload;
      })
      .addCase(loadAvailableCurrencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load currencies';
      });
  },
});

export const {
  setBaseCurrency,
  setSelectedDate,
  addCurrency,
  removeCurrency,
  setSelectedCurrencies,
  clearError,
} = currencySlice.actions;

export default currencySlice.reducer;
