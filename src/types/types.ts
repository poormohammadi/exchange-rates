export interface Currency {
  code: string;
  name: string;
}

export interface ExchangeRates {
  [currencyCode: string]: number;
}

export interface CurrencyData {
  date: string;
  rates: ExchangeRates;
}
