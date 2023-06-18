import * as React from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { projectFormEnum } from '@/libraries/enum';

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
      <ToggleButton className="px-5" value={projectFormEnum.GENERAL} aria-label={projectFormEnum[0]}>
        {projectFormEnum[0]}
      </ToggleButton>
      <ToggleButton className="px-5" value={projectFormEnum.LONG_TERM} aria-label={projectFormEnum[1]}>
        {projectFormEnum[1]}
      </ToggleButton>
      <ToggleButton className="px-5" value={projectFormEnum.SUCCESS} aria-label={projectFormEnum[2]}>
        {projectFormEnum[2]}
      </ToggleButton>
      <ToggleButton className="px-5" value={projectFormEnum.FAILED} aria-label={projectFormEnum[3]}>
        {projectFormEnum[3]}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleButtons;
