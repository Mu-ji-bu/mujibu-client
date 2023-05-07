import { Button as MuiButton, ButtonProps } from '@mui/material';

interface IButton extends ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<IButton> = (props): JSX.Element => {
  const { children } = props;
  return <MuiButton {...props}>{children}</MuiButton>;
};

export default Button;
