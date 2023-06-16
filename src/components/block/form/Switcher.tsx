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
  defaultChecked?: boolean;
  className?: string;
}

const Switcher: React.FC<SwitcherProps> = ({ control, error, helperText, name, label, defaultChecked, className }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          className={clsxm(className)}
          control={<Switch color="primary" checked={value} onChange={onChange} />}
          label={label}
          labelPlacement="start"
        />
      )}
    />
  );
};

export default Switcher;
