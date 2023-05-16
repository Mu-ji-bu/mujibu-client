import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DeterminateSize } from '@/components/types/enum';

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  '& .MuiCircularProgress-circle': {
    strokeLinecap: 'round',
  },
}));

interface ICircularDeterminateProps {
  value: number;
  size: string;
  textSize: DeterminateSize;
}

const CircularDeterminate: React.FC<ICircularDeterminateProps> = (props) => {
  const { value, size, textSize } = props;

  return (
    <Box className="relative inline-flex">
      <StyledCircularProgress
        className="bottom-circle absolute z-0 text-secondary-10"
        variant="determinate"
        value={100}
        size={size}
      />
      <StyledCircularProgress variant="determinate" value={value} size={size} className="text-green-accent" />
      <Box className="absolute inset-0 flex items-center justify-center">
        <TextComponent textSize={textSize} value={value} />
      </Box>
    </Box>
  );
};

const TextComponent: React.FC<{ textSize: DeterminateSize; value: number }> = ({ textSize, value }) => {
  switch (textSize) {
    case DeterminateSize.Large:
      return (
        <>
          <span className=" text-3xl text-primary">{`${Math.round(value)}`}</span>
          <span className="text-xl pl-px text-primary">%</span>
        </>
      );
    case DeterminateSize.Small:
      return (
        <>
          <span className="text-base text-primary">{`${Math.round(value)}`}</span>
          <span className="text-xs pl-px text-primary">%</span>
        </>
      );
    case DeterminateSize.Medium:
      return (
        <>
          <span className="text-2xl text-primary">{`${Math.round(value)}`}</span>
          <span className="text-base pl-px text-primary">%</span>
        </>
      );
    default:
      return (
        <>
          <span className="text-2xl text-primary">{`${Math.round(value)}`}</span>
          <span className="text-base pl-px text-primary">%</span>
        </>
      );
  }
};

export default CircularDeterminate;
