import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  maxDaysBack?: number;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
  maxDaysBack = 90,
}) => {
  const today = dayjs();
  const minDate = today.subtract(maxDaysBack, 'day');
  const maxDate = today;

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      const formattedDate = newValue.format('YYYY-MM-DD');
      onDateChange(formattedDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        label="Select Date"
        value={dayjs(selectedDate)}
        onChange={handleDateChange}
        minDate={minDate}
        maxDate={maxDate}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
          },
        }}
      />
    </LocalizationProvider>
  );
};
