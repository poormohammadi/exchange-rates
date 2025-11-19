import React from 'react';
import { render, screen } from '@testing-library/react';
import { CurrencyTable } from '../exchange-rates/CurrencyTable';
import { CurrencyData } from '../../types';

const mockExchangeRates: CurrencyData[] = [
  {
    date: '2024-01-01',
    rates: {
      USD: 1.25,
      EUR: 1.15,
      JPY: 150.0,
    },
  },
  {
    date: '2024-01-02',
    rates: {
      USD: 1.26,
      EUR: 1.16,
      JPY: 151.0,
    },
  },
];

describe('CurrencyTable', () => {
  it('renders loading state', () => {
    render(
      <CurrencyTable
        exchangeRates={[]}
        selectedCurrencies={['USD', 'EUR']}
        loading={true}
      />
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    render(
      <CurrencyTable
        exchangeRates={[]}
        selectedCurrencies={['USD', 'EUR']}
        loading={false}
      />
    );
    expect(
      screen.getByText(/No exchange rate data available/i)
    ).toBeInTheDocument();
  });

  it('renders exchange rates table', () => {
    render(
      <CurrencyTable
        exchangeRates={mockExchangeRates}
        selectedCurrencies={['USD', 'EUR', 'JPY']}
        loading={false}
      />
    );

    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();
    expect(screen.getByText('JPY')).toBeInTheDocument();
    expect(screen.getByText('1.2500')).toBeInTheDocument();
    expect(screen.getByText('1.1500')).toBeInTheDocument();
  });

  it('displays N/A for missing rates', () => {
    const ratesWithMissing: CurrencyData[] = [
      {
        date: '2024-01-01',
        rates: {
          USD: 1.25,
        },
      },
    ];

    render(
      <CurrencyTable
        exchangeRates={ratesWithMissing}
        selectedCurrencies={['USD', 'EUR']}
        loading={false}
      />
    );

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});
