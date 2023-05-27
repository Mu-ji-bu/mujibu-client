import * as React from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface ToggleButtonsProps {
  types: number[];
  setTypes: (types: number[]) => void;
}
const ToggleButtons: React.FC<ToggleButtonsProps> = ({ types, setTypes }) => {
  const handleTypes = (event: React.MouseEvent<HTMLElement>, newTypes: number[]) => {
    setTypes(newTypes);
  };

  return (
    <ToggleButtonGroup
      value={types}
      onChange={handleTypes}
      aria-label="project types"
      color="primary"
      className="rounded-lg"
      size="small"
    >
      <ToggleButton className="px-5" value={0} aria-label="募資中">
        募資中
      </ToggleButton>
      <ToggleButton className="px-5" value={1} aria-label="長期販售">
        長期販售
      </ToggleButton>
      <ToggleButton className="px-5" value={2} aria-label="已結束">
        已結束
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleButtons;
