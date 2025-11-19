import React from 'react';
import { render, screen } from '@testing-library/react';
import { CurrencySelector } from '../exchange-rates/CurrencySelector';
import { Currency } from '../../types';

const mockCurrencies: Currency[] = [
  { code: 'GBP', name: 'British Pound' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'ZAR', name: 'South African Rand' },
];

describe('CurrencySelector', () => {
  const mockOnBaseCurrencyChange = jest.fn();
  const mockOnAddCurrency = jest.fn();
  const mockOnRemoveCurrency = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays selected currencies as chips', () => {
    render(
      <CurrencySelector
        baseCurrency="GBP"
        selectedCurrencies={['USD', 'EUR', 'JPY']}
        availableCurrencies={mockCurrencies}
        onBaseCurrencyChange={mockOnBaseCurrencyChange}
        onAddCurrency={mockOnAddCurrency}
        onRemoveCurrency={mockOnRemoveCurrency}
      />
    );

    expect(screen.getByText(/USD - US Dollar/i)).toBeInTheDocument();
    expect(screen.getByText(/EUR - Euro/i)).toBeInTheDocument();
    expect(screen.getByText(/JPY - Japanese Yen/i)).toBeInTheDocument();
  });

  it('shows alert when maximum currencies reached', () => {
    render(
      <CurrencySelector
        baseCurrency="GBP"
        selectedCurrencies={['USD', 'EUR', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR']}
        availableCurrencies={mockCurrencies}
        onBaseCurrencyChange={mockOnBaseCurrencyChange}
        onAddCurrency={mockOnAddCurrency}
        onRemoveCurrency={mockOnRemoveCurrency}
      />
    );

    expect(
      screen.getByText(/Maximum of 7 currencies reached/i)
    ).toBeInTheDocument();
  });

  it('shows alert when minimum currencies reached', () => {
    render(
      <CurrencySelector
        baseCurrency="GBP"
        selectedCurrencies={['USD', 'EUR', 'JPY']}
        availableCurrencies={mockCurrencies}
        onBaseCurrencyChange={mockOnBaseCurrencyChange}
        onAddCurrency={mockOnAddCurrency}
        onRemoveCurrency={mockOnRemoveCurrency}
      />
    );

    expect(
      screen.getByText(/Minimum of 3 currencies required/i)
    ).toBeInTheDocument();
  });
});
