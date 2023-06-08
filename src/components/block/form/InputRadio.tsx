//radio 單選

import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Controller } from 'react-hook-form';

import clsxm from '@/libraries/utils/clsxm';

interface InputRadioProps {
  control: any;
  error?: boolean;
  helperText?: string;
  name: string;
  label: string;
  items: string[];
  defaultValue?: number;
  classNameForm?: string;
  classNameRadio?: string;
}

const InputRadio: React.FC<InputRadioProps> = ({
  control,
  error,
  helperText,
  name,
  label,
  items,
  defaultValue,
  classNameForm,
  classNameRadio,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || false}
      render={({ field: { onChange, value } }) => (
        <>
          <FormControl size="small" className={clsxm(classNameForm)}>
            <FormLabel>{label}</FormLabel>
            <RadioGroup row name={name} value={value} onChange={onChange} aria-labelledby={name}>
              {items &&
                items.map((item: string, i: number) => {
                  return (
                    <FormControlLabel
                      className={clsxm(classNameRadio)}
                      key={`${item}${i}`}
                      value={i}
                      control={<Radio size="small" />}
                      label={item}
                    />
                  );
                })}
            </RadioGroup>
            {error && <FormHelperText className="text-error w-full">{helperText}</FormHelperText>}
          </FormControl>
        </>
      )}
    />
  );
};

export default InputRadio;
