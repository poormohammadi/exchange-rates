import React from 'react';
import { render, screen } from '@testing-library/react';
import { DatePicker } from '../DatePicker/DatePicker';

jest.mock('@mui/x-date-pickers/LocalizationProvider', () => ({
  LocalizationProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="localization-provider">{children}</div>
  ),
}));

jest.mock('@mui/x-date-pickers/DatePicker', () => ({
  DatePicker: ({ label, value, onChange }: any) => (
    <div data-testid="date-picker">
      <label>{label}</label>
      <input
        type="date"
        value={value?.format('YYYY-MM-DD')}
        onChange={e => {
          const dayjs = require('dayjs');
          onChange(dayjs(e.target.value));
        }}
        data-testid="date-input"
      />
    </div>
  ),
}));

describe('DatePicker', () => {
  const mockOnDateChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders date picker', () => {
    render(
      <DatePicker selectedDate="2024-01-01" onDateChange={mockOnDateChange} />
    );

    expect(screen.getByTestId('localization-provider')).toBeInTheDocument();
    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
  });

  it('displays the selected date', () => {
    render(
      <DatePicker selectedDate="2024-01-15" onDateChange={mockOnDateChange} />
    );

    const input = screen.getByTestId('date-input') as HTMLInputElement;
    expect(input.value).toBe('2024-01-15');
  });
});
