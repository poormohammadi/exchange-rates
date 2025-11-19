import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
} from '@mui/material';
import { CurrencyData } from '../../types';

interface CurrencyTableProps {
  exchangeRates: CurrencyData[];
  selectedCurrencies: string[];
  loading: boolean;
}

export const CurrencyTable: React.FC<CurrencyTableProps> = ({
  exchangeRates,
  selectedCurrencies,
  loading,
}) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (exchangeRates.length === 0) {
    return (
      <Box p={4}>
        <Typography variant="body1" color="text.secondary" align="center">
          No exchange rate data available. Please select a date.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            {selectedCurrencies.map(currency => (
              <TableCell key={currency} align="center">
                {currency}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {exchangeRates.map(data => (
            <TableRow key={data.date}>
              <TableCell component="th" scope="row">
                {new Date(data.date).toLocaleDateString()}
              </TableCell>
              {selectedCurrencies.map(currency => (
                <TableCell key={currency} align="center">
                  {data.rates[currency]?.toFixed(4) || 'N/A'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
