import { useState } from 'react';
import Link from 'next/link';
import { Typography, Button, Card, CardContent, CardMedia, Chip, Rating } from '@mui/material';
import { useAppSelector } from '@libraries/hooks/reduxHooks';
import { selectUser } from '../../../store/slices/userSlice';
import dayjs from 'dayjs';

interface Plan {
  planId: string;
  planName: string;
}

interface Project {
  projectId: string;
  projectVisual: string;
  projectName: string;
  projectStartTime: number;
  projectEndTime: number;
  projectTeam: {
    teamId: string;
    teamName: string;
  };
  projectUrl: string;
  projectType: number;
}

interface OrderCardProps {
  isPC: boolean;
  order: {
    orderId: string;
    orderNumber: string;
    orderAmount: number;
    orderUnit: number;
    createdAt: number;
    project: Project;
    plan: Plan;
  };
}

const OrderCard: React.FC<OrderCardProps> = ({ isPC, order }) => {
  const [starValue, setStarValue] = useState<number | null>(2);

  return (
    <Card className="flex sm:flex-row flex-col rounded-lg border border-solid border-secondary-10 shadow-none">
      <CardMedia
        component="img"
        className="w-full sm:w-1/4 aspect-[3/1] sm:aspect-square shrink-0"
        image={order.project.projectVisual}
        alt={order.project.projectName}
      />
      <CardContent className="w-full sm:w-3/4 p-5 flex-col flex justify-between">
        <div>
          <div className="flex md:flex-row flex-col md:items-center justify-between w-full mb-3">
            <div className="flex md:flex-row flex-col md:items-center space-y-2 md:space-y-0 md:space-x-2">
              <Chip className="px-1 self-start" color="primary" label="募資中" size="small" />
              <Typography className="text-secondary-66" component="span" variant="caption">
                剩餘時間 : 14d 10h 40m 20s
              </Typography>
            </div>
            <Typography className="text-secondary-66" component="span" variant="caption">
              贊助日期 : 2022/07/19 10:00
            </Typography>
          </div>

          <Link href="#" className="no-underline visited:text-secondary hover:text-primary text-secondary block mb-2">
            <Typography component="h2" variant={isPC ? 'h5' : 'h6'} className="line-clamp-2">
              {order.project.projectName}
            </Typography>
          </Link>

          <div className="mb-5 flex items-center">
            <Typography
              className="mr-1 text-secondary-66 leading-none shrink-0"
              component="span"
              variant={isPC ? 'h6' : 'caption'}
              color="secondary"
            >
              提案者
            </Typography>
            <Link
              href="#"
              className="no-underline line-clamp-1  text-primary  hover:text-secondary visited:text-primary font-medium"
            >
              <Typography component="span" variant={isPC ? 'h6' : 'caption'}>
                {order.project.projectTeam.teamName}
              </Typography>
            </Link>
          </div>

          <div className="mb-2 sm:mb-5 flex sm:flex-row flex-col space-y-2 sm:space-y-0 sm:space-x-5 justify-between">
            <Typography
              className="font-bold w-full sm:w-2/3 line-clamp-1"
              component="h3"
              variant={isPC ? 'body20' : 'body16'}
            >
              {order.plan.planName}
            </Typography>
            <div className="flex justify-end space-x-5">
              <Typography className="font-bold shrink-0" component="p" variant={isPC ? 'body20' : 'body16'}>
                x{order.orderUnit}
              </Typography>
              <Typography className="font-bold shrink-0" component="p" variant={isPC ? 'body20' : 'body16'}>
                NT${order.orderAmount}
              </Typography>
            </div>

            <Button className="shrink-0 shadow-none" color="secondary" variant="contained" size="small">
              查看訂單資訊
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex space-x-2 mb-4 sm:mb-0">
            <Button className="w-1/2 sm:w-auto sm:shrink-0" color="secondary" variant="outlined" size="small">
              聯絡提案團隊
            </Button>
            <Button className="w-1/2 sm:w-auto sm:shrink-0" color="secondary" variant="outlined" size="small">
              取消贊助
            </Button>
          </div>

          <div className="flex items-center">
            <Typography
              className="mr-1 text-secondary-66 leading-none"
              component="span"
              variant="caption"
              color="secondary"
            >
              評價專案
            </Typography>
            <Rating
              name="simple-controlled"
              value={starValue}
              onChange={(event, newValue) => {
                setStarValue(newValue);
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
