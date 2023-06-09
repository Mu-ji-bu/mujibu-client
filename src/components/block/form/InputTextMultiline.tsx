//文字區塊 input textarea

import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import clsxm from '@/libraries/utils/clsxm';

interface InputTextMultilineProps {
  control: any;
  error?: boolean;
  helperText?: string;
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  rows: number;
  className?: string;
}

const InputTextMultiline: React.FC<InputTextMultilineProps> = ({
  control,
  error,
  helperText,
  name,
  label,
  placeholder,
  defaultValue,
  rows,
  className,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || ''}
      render={({ field: { onChange, value } }) => (
        <TextField
          multiline
          rows={rows}
          fullWidth
          className={clsxm(className)}
          id={name}
          label={label}
          placeholder={placeholder}
          autoComplete={name}
          size="small"
          value={value}
          onChange={onChange}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};

export default InputTextMultiline;
