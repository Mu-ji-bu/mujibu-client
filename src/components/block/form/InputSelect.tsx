//下拉 select

import { TextField, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';

import clsxm from '@/libraries/utils/clsxm';

interface InputSelectProps {
  control: any;
  error?: boolean;
  helperText?: string;
  name: string;
  label: string;
  items: string[];
  className?: string;
  isNumber: boolean;
}

const InputSelect: React.FC<InputSelectProps> = ({
  control,
  error,
  helperText,
  name,
  label,
  items,
  className,
  isNumber,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextField
          className={clsxm(`${className} bg-white`)}
          fullWidth
          id={name}
          label={label}
          autoComplete={name}
          size="small"
          error={error}
          helperText={helperText}
          select
          value={value}
          onChange={onChange}
        >
          <MenuItem value="" disabled>
            請選擇
          </MenuItem>

          {items.length !== 0 &&
            items.map((item: string, i: number) => {
              return (
                <MenuItem key={`${item}${i}`} value={isNumber ? i : item}>
                  {item}
                </MenuItem>
              );
            })}
        </TextField>
      )}
    />
  );
};

export default InputSelect;
