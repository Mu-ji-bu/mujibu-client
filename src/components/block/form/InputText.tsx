//文字 input

import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import clsxm from '@/libraries/utils/clsxm';

interface InputTextProps {
  control: any;
  error?: boolean;
  helperText?: string;
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

const InputText: React.FC<InputTextProps> = ({
  control,
  error,
  helperText,
  name,
  label,
  placeholder,
  defaultValue,
  className,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || ''}
      render={({ field: { onChange, value } }) => (
        <TextField
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

export default InputText;
