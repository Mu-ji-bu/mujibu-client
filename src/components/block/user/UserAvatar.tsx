import * as React from 'react';
import { Typography, Avatar } from '@mui/material';
import { useAppSelector } from '@libraries/hooks/reduxHooks';
import { selectUser } from '../../../store/slices/userSlice';
import dayjs from 'dayjs';

const UserAvatar: React.FC = () => {
  const { avatar, name, createdAt } = useAppSelector(selectUser);

  return (
    <div className="flex items-center px-5 md:px-10 mb-10">
      {avatar ? (
        <Avatar className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] mr-5" alt={name} src={avatar}></Avatar>
      ) : (
        <Avatar className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] mr-5 bg-primary" alt={name}>
          {name?.slice(0, 1)}
        </Avatar>
      )}
      <div className="flex flex-col">
        <Typography className="text-secondary mb-2" component="h4" variant="h5">
          {name}
        </Typography>
        <Typography className="text-secondary-50" component="p" variant="caption">
          加入募質時間：
          <br className="sm:hidden" /> {dayjs(createdAt).format('YYYY年MM月DD日 HH:mm')}
        </Typography>
      </div>
    </div>
  );
};

export default UserAvatar;
