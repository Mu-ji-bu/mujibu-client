import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

interface ISelectOption {
  label: string;
  value: any;
}

interface IBasicSelect {
  placeholder: string;
  option: ISelectOption[];
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgb(72,72,72,0.12)',
  },
}));

const BasicSelect: React.FC<IBasicSelect> = (props) => {
  const { placeholder, option } = props;

  const [selectedValue, setSelectedValue] = React.useState(placeholder);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 180 }}>
      <StyledFormControl fullWidth>
        <Select
          value={selectedValue}
          onChange={handleChange}
          size="small"
          IconComponent={ExpandMoreIcon}
          // MenuProps={{
          //   sx: { color: 'red' },
          // }}
        >
          <MenuItem sx={{ paddingBlock: '12px' }} value={placeholder} disabled>
            {placeholder}
          </MenuItem>
          {option.map(({ label, value }, index) => (
            <MenuItem key={index} sx={{ paddingBlock: '12px' }} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </Box>
  );
};

export default BasicSelect;
