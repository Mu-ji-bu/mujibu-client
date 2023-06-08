//checkbox true/false

import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';

import clsxm from '@/libraries/utils/clsxm';

interface InputCheckboxProps {
  control: any;
  error?: boolean;
  helperText?: string;
  name: string;
  label: string;
  defaultValue: boolean;
  className?: string;
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({
  control,
  error,
  helperText,
  name,
  label,
  defaultValue,
  className,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || false}
      render={({ field: { onChange, value } }) => (
        <>
          <FormControlLabel
            className={clsxm(className)}
            control={<Checkbox checked={value} onChange={onChange} />}
            label={label}
          />
          {error && <FormHelperText className="text-error">{helperText}</FormHelperText>}
        </>
      )}
    />
  );
};

export default InputCheckbox;
