import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { fetchAvailableCurrencies, fetchExchangeRates } from '../../api';
import { Currency, CurrencyData } from '../../types';

const DEFAULT_CURRENCIES = ['USD', 'EUR', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR'];
const DEFAULT_BASE_CURRENCY = 'GBP';
const DAYS_TO_FETCH = 7;

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

export const loadExchangeRates = createAsyncThunk(
  'currency/loadExchangeRates',
  async (
    { date, baseCurrency }: { date: string; baseCurrency: string },
    { rejectWithValue }
  ) => {
    try {
      const selectedDate = dayjs(date);

      const dates = Array.from({ length: DAYS_TO_FETCH }, (_, index) =>
        selectedDate.subtract(index, 'day').format('YYYY-MM-DD')
      );

      const ratesPromises = dates.map(async dateStr => {
        try {
          const rates = await fetchExchangeRates(dateStr, baseCurrency);
          return {
            date: dateStr,
            rates,
          };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
          throw new Error(
            `Failed to load rates for ${dateStr}: ${errorMessage}`
          );
        }
      });

      const ratesData = await Promise.all(ratesPromises);
      return ratesData;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to load exchange rates'
      );
    }
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
      })
      .addCase(loadExchangeRates.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadExchangeRates.fulfilled, (state, action) => {
        state.loading = false;
        state.exchangeRates = action.payload;
      })
      .addCase(loadExchangeRates.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Failed to load exchange rates';
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
