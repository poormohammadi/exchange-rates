import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  baseCurrency: string;
}

const initialState: CurrencyState = {
  baseCurrency: 'GBP',
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency: (state, action: PayloadAction<string>) => {
      state.baseCurrency = action.payload;
    },
  },
});

export const { setBaseCurrency } = currencySlice.actions;
export default currencySlice.reducer;
