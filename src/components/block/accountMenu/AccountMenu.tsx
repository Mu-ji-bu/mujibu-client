import * as React from 'react';
import { useRouter } from 'next/router';
import { IconButton, Menu, MenuItem, ListItemIcon, Tooltip, Avatar } from '@mui/material';
import { PersonOutlineRounded as PersonOutlineRoundedIcon } from '@mui/icons-material';
import Button from '../button';
import clsxm from '@/libraries/utils/clsxm';
import { useAppSelector } from '@libraries/hooks/reduxHooks';
import { selectUser } from '../../../store/slices/userSlice';

export interface IAccountMenuOption {
  label: string;
  href: string;
  hasBorderBottom: boolean;
  icon?: JSX.Element;
  handleCustomEvent?: Function;
}

interface IAccountMenuProps {
  options: IAccountMenuOption[];
}

const AccountMenu: React.FC<IAccountMenuProps> = ({ options }) => {
  const router = useRouter();
  const { avatar, name } = useAppSelector(selectUser);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event?: React.MouseEvent<HTMLElement>) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="ml-5">
      <div className="flex justify-center items-center">
        <Button
          variant="outlined"
          color="secondary"
          className={clsxm(avatar ? 'p-0' : 'p-[6px]', 'min-w-0')}
          aria-label="search"
          onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          {avatar ? (
            <Avatar className="w-[36px] h-[36px]" alt={name} variant="square" src={avatar}></Avatar>
          ) : (
            <PersonOutlineRoundedIcon />
          )}
        </Button>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: '14px',
            padding: 0,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        MenuListProps={{ sx: { py: 0 } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.label}
            onClick={() => {
              option.handleCustomEvent ? option.handleCustomEvent() : router.push(option.href);
            }}
            sx={{
              minWidth: '58px',
              minHeight: '40px',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '14px',
              lineHeight: '20px',
              padding: '12px 40px',
              color: '#484848',
              borderBottom: option.hasBorderBottom ? '1px solid #E5E5E5' : 'none',
              // 下面這行是為了避免最後一個 MenuItem 也顯示底線
              ...(index === options.length - 1 && { borderBottom: 'none' }),
            }}
          >
            {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default AccountMenu;
