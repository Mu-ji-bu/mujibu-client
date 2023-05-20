import * as React from 'react';
import { Typography, Avatar } from '@mui/material';
import { useAppSelector } from '@libraries/hooks/reduxHooks';
import { selectUser } from '../../../store/slices/userSlice';
import dayjs from 'dayjs';

const UserAvatar: React.FC = () => {
  const { avatar, userName, createdAt } = useAppSelector(selectUser);

  return (
    <div className="flex items-center px-10 mb-10">
      {avatar ? (
        <Avatar className="w-[100px] h-[100px] mr-5" alt={userName} src={avatar}></Avatar>
      ) : (
        <Avatar className="bg-primary" alt={userName}>
          {userName.slice(0, 1)}
        </Avatar>
      )}
      <div className="flex flex-col">
        <Typography className="text-secondary mb-2" component="h4" variant="h5">
          {userName}
        </Typography>
        <Typography className="text-secondary-50" component="p" variant="caption">
          加入慕質時間：{dayjs(createdAt).format('YYYY年MM月DD日 HH:mm')}
        </Typography>
      </div>
    </div>
  );
};

export default UserAvatar;
