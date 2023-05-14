import * as React from 'react';
import { useRouter } from 'next/router';
import { Menu, MenuItem } from '@mui/material';
import { NotificationsOutlined as NotificationsOutlinedIcon } from '@mui/icons-material';
import Button from '../button';

export interface INotificationsMenuOption {
  label: string;
  type: string;
}

interface IAccountMenuProps {
  options: INotificationsMenuOption[];
}

const NotificationsMenu: React.FC<IAccountMenuProps> = ({ options }) => {
  const router = useRouter();
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
    <>
      <div className="flex justify-center items-center">
        <Button
          variant="outlined"
          color="secondary"
          className="p-[6px] min-w-0"
          aria-label="search"
          onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <NotificationsOutlinedIcon />
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
        {options.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => router.push('/')}
            sx={{
              minWidth: '58px',
              minHeight: '40px',
              display: 'flex',
              fontSize: '14px',
              lineHeight: '20px',
              padding: '12px 40px',
              color: '#484848',
              borderBottom: '1px solid #E5E5E5',
            }}
          >
            <div className="flex flex-col">
              <div className="text-secondary">{option.type}</div>
              <div>{option.label}</div>
            </div>
          </MenuItem>
        ))}
        <div className="flex justify-end">
          <div className="ml-auto p-2">查看更多</div>
        </div>
      </Menu>
    </>
  );
};

export default NotificationsMenu;
