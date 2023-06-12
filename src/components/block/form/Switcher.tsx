//checkbox true/false

import { Checkbox, FormControlLabel, Switch, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';

import clsxm from '@/libraries/utils/clsxm';

interface SwitcherProps {
  control: any;
  error?: boolean;
  helperText?: string;
  name: string;
  label: string;
  defaultValue?: boolean | number;
  className?: string;
}

const Switcher: React.FC<SwitcherProps> = ({ control, error, helperText, name, label, defaultValue, className }) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || false}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          className={clsxm(className)}
          control={<Switch color="primary" value={value} onChange={onChange} />}
          label={label}
          labelPlacement="start"
        />
      )}
    />
  );
};

export default Switcher;
