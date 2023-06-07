import { Button, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface IMessageProps {
  title: string;
  time: string;
  text: string;
}

const Message: React.FC<IMessageProps> = (props) => {
  const { title, time, text } = props;
  const [showFullMessage, setShowFullMessage] = useState(false);

  const toggleShowFullMessage = () => {
    setShowFullMessage(!showFullMessage);
  };

  return (
    <div className="p-5 border border-solid border-secondary-10 rounded-lg">
      <Typography component="h4" variant="h4" className="text-secondary">
        【最新消息】{title}
      </Typography>
      <Typography component="p" variant="caption" className="text-secondary-66 py-3">
        {time}
      </Typography>
      <Typography
        component="p"
        variant="body16"
        className="max-w-full text-secondary-66"
        style={{
          // 文字最多 3 行，超過會以 tooltips 顯示
          display: '-webkit-box',
          overflow: showFullMessage ? 'auto' : 'hidden',
          WebkitLineClamp: showFullMessage ? 'unset' : 3,
          WebkitBoxOrient: 'vertical',
          lineHeight: '1.5',
        }}
      >
        <span>{text}</span>
      </Typography>
      <div className="full-text-btn w-fit flex justify-center mx-auto py-[12.5px]">
        <Button
          variant="text"
          fullWidth
          color="primary"
          endIcon={showFullMessage ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          onClick={toggleShowFullMessage}
        >
          {showFullMessage ? (
            <Typography component="span" variant="body16" className="text-primary">
              收合此則消息
            </Typography>
          ) : (
            <Typography component="span" variant="body16" className="text-primary">
              查看完整消息
            </Typography>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Message;
