import axios from 'axios';
import { Currency } from '../types';

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
