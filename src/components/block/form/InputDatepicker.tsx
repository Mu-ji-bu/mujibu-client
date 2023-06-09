//DatePicker

import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import clsxm from '@/libraries/utils/clsxm';

interface InputDatepickerProps {
  control: any;
  error?: boolean;
  helperText?: string;
  name: string;
  label: string;
  disableFuture?: boolean;
  disablePast?: boolean;
  className?: string;
}

const InputDatepicker: React.FC<InputDatepickerProps> = ({
  control,
  error,
  helperText,
  name,
  label,
  disableFuture,
  disablePast,
  className,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <DatePicker
          className={clsxm(className)}
          label={label}
          disableFuture={disableFuture || false}
          disablePast={disablePast || false}
          value={dayjs(value)}
          onChange={(newValue) => onChange(newValue)}
          slotProps={{
            textField: {
              size: 'small',
              error: error,
              helperText: helperText,
            },
          }}
        />
      )}
    />
  );
};

export default InputDatepicker;
