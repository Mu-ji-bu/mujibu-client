//文字 input 前方有裝飾字

import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Controller } from 'react-hook-form';

import clsxm from '@/libraries/utils/clsxm';

interface InputTextDecoProps {
  control: any;
  error?: boolean;
  helperText?: string;
  name: string;
  label: string;
  placeholder?: string;
  deco: string;
  defaultValue?: number;
  className?: string;
}

const InputTextDeco: React.FC<InputTextDecoProps> = ({
  control,
  error,
  helperText,
  name,
  label,
  placeholder,
  deco,
  defaultValue,
  className,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || ''}
      render={({ field: { onChange, value } }) => (
        <FormControl className={clsxm(`${className} bg-white`)}>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <OutlinedInput
            fullWidth
            id={name}
            label={label}
            placeholder={placeholder}
            size="small"
            startAdornment={<InputAdornment position="start">{deco}</InputAdornment>}
            value={value}
            onChange={onChange}
            error={error}
          />
          {error && <FormHelperText className="text-error">{helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default InputTextDeco;
