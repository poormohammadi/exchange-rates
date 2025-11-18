import axios from 'axios';
import { Currency, ExchangeRates } from '../types';

const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0';

const customAxios = axios.create({
  baseURL: BASE_URL,
});

export const fetchAvailableCurrencies = async (): Promise<Currency[]> => {
  const response = await customAxios.get<Record<string, string>>(
    'currency-api@latest/v1/currencies.json'
  );
  return Object.entries(response.data).map(([code, name]) => ({
    code: code.toUpperCase(),
    name: name as string,
  }));
};

export const fetchExchangeRates = async (
  date: string,
  currencyCode: string
): Promise<ExchangeRates> => {
  const url = `currency-api@${date}/v1/currencies/${currencyCode.toLowerCase()}.json`;
  const response =
    await customAxios.get<Record<string, Record<string, number>>>(url);
  const rates: ExchangeRates = {};
  Object.entries(response.data[currencyCode.toLowerCase()]).forEach(
    ([code, rate]) => {
      rates[code.toUpperCase()] = rate as number;
    }
  );
  return rates;
};
