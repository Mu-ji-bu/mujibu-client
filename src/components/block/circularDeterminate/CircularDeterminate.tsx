import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  '& .MuiCircularProgress-circle': {
    strokeLinecap: 'round',
  },
}));

interface ICircularDeterminateProps {
  value: number;
  size: string;
}

const CircularDeterminate: React.FC<ICircularDeterminateProps> = (props) => {
  const { value, size } = props;

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
        <Typography variant="body16" component="span" color="primary">
          {`${Math.round(value)}`}
          <span className="text-xs pl-px">%</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularDeterminate;
