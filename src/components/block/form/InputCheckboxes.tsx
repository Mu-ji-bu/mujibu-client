//checkbox 多選

import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@mui/material';
import { Controller } from 'react-hook-form';

import clsxm from '@/libraries/utils/clsxm';

interface InputCheckboxesProps {
  control: any;
  error?: boolean;
  helperText?: string;
  name: string;
  label: string;
  items: string[];
  defaultValue: string[];
  className?: string;
}

const InputCheckboxes: React.FC<InputCheckboxesProps> = ({
  control,
  error,
  helperText,
  name,
  label,
  items,
  defaultValue,
  className,
}) => {
  const handleItemsChange = (value: string[], item: string) => {
    const newItems = value?.includes(item) ? value.filter((el) => el !== item) : [...(value ?? []), item];
    return newItems;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange: onCheckBoxChange, value } }) => (
        <FormControl component="fieldset">
          <FormLabel component="legend">{label}</FormLabel>{' '}
          <FormGroup className="flex-row">
            {items &&
              items.map((item: string, i: number) => {
                return (
                  <FormControlLabel
                    className={clsxm(className)}
                    value={item}
                    key={`${item}${i}`}
                    label={item}
                    control={
                      <Checkbox
                        checked={value?.includes(item)}
                        onChange={() => value && onCheckBoxChange(handleItemsChange(value, item))}
                      />
                    }
                  />
                );
              })}
          </FormGroup>
          {error && <FormHelperText className="text-error m-0">{helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default InputCheckboxes;
