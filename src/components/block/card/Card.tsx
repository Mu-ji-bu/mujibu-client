import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CircularDeterminate from '@/components/block/circularDeterminate';
import LinearDeterminate from '@/components/block/linearDeterminate';
import Link from 'next/link';
import CircleCheckIcon from '@/components/block/circleCheckIcon';
import clsxm from '@/libraries/utils/clsxm';
import { DeterminateSize } from '@/components/types/enum';
import { getRemainingDays } from '@libraries/utils/index';
import { CardWidth } from '@/components/types/enum';

// interface ImgMediaCardProps {
//   isPC: boolean;
//   id: string;
//   image: string;
//   category: string;
// }

interface ImgMediaCardProps {
  isPC: boolean;
  id: string;
  image: string;
  category: string;
  cardWidth?: CardWidth;
  projectType: number;
  projectName: string;
  projectTeam: string;
  proposer: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  backers: number;
  prize: number;
  startTime: string;
  endTime: string;
  remainingTime: string;
}

const ImgMediaCard: React.FC<ImgMediaCardProps> = (props) => {
  const {
    isPC,
    cardWidth = CardWidth.Normal,
    projectType,
    projectName,
    currentAmount,
    targetAmount,
    backers,
    startTime,
    endTime,
    progress,
    image,
    category,
    proposer,
  } = props;
  const remainingDays = getRemainingDays(startTime, endTime);

  const renderIndicator = (projectType: number) => {
    switch (projectType) {
      case 0:
        return <CircularDeterminate value={progress} size={'4em'} textSize={DeterminateSize.Small} />;
      case 2:
        return <CircleCheckIcon />;
      default:
        return null;
    }
  };

  const renderLinearProgress = (projectType: number) => {
    switch (projectType) {
      case 0:
        return <LinearDeterminate value={progress} haslabel={true} />;
      case 2:
        return <LinearDeterminate value={100} haslabel={false} />;
      default:
        return null;
    }
  };

  const renderCardBottom = (projectType: number) => {
    if (projectType === 0 || projectType === 2) {
      return (
        <>
          <div className="h-px bg-secondary/[.12] my-5"></div>
          {!isPC && <div className="mb-3">{renderLinearProgress(projectType)}</div>}
          <div className="flex items-center gap-5">
            {isPC && renderIndicator(projectType)}
            <div>
              <div>
                <Typography className="opacity-60 mr-2" component="span" variant="caption" color="secondary">
                  達成
                </Typography>
                <Typography component="span" variant="h6" color="primary">
                  NT${currentAmount}k
                </Typography>
              </div>
              <div>
                <Typography className="opacity-60 mr-2" component="span" variant="caption" color="secondary">
                  目標
                </Typography>
                <Typography className="opacity-[.87]" component="span" variant="h6" color="secondary">
                  NT${targetAmount}k
                </Typography>
              </div>
            </div>
            <div className="text-right ml-auto">
              <div>
                <Typography className="mr-1" component="span" variant="caption" color="primary">
                  {backers}
                </Typography>
                <Typography className="opacity-60" component="span" variant="caption" color="secondary">
                  人支持
                </Typography>
              </div>
              <div>
                <Typography className="opacity-60 mr-1" component="span" variant="caption" color="secondary">
                  剩餘時間
                </Typography>
                <Typography className="opacity-60" component="span" variant="caption" color="secondary">
                  {remainingDays}天
                </Typography>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <Card
      className={clsxm(
        `max-w-[${cardWidth}]`,
        'm-auto p-4',
        'md:max-w-[416px] md:p-6',
        'rounded-lg border-secondary shadow-none border border-solid border-opacity-[.12]',
      )}
    >
      <CardMedia className="rounded-lg object-cover" component="img" alt={projectName} height="276" image={image} />
      <CardContent className="mt-5 p-0">
        <div className="flex justify-between items-center">
          <Chip className="text-green-accent border-green-accent" label={category} variant="outlined" />
          {projectType === 1 && (
            <Typography className="opacity-60" component="span" variant="caption" color="secondary">
              長期販售
            </Typography>
          )}
        </div>
        <div className="mt-2 mb-3 md:h-[90px] h-[72px]">
          <Typography variant={isPC ? 'body20' : 'body16'}>{projectName}</Typography>
        </div>
        <div className="truncate whitespace-nowrap  text-primary hover:text-secondary visited:text-primary">
          <Typography className="mr-1 opacity-60" component="span" variant={isPC ? 'h6' : 'caption'} color="secondary">
            提案者
          </Typography>
          <Link
            href="#"
            className="no-underline  text-primary  hover:text-secondary visited:text-primary font-normal md:font-medium text-sm md:text-base"
          >
            {proposer}
          </Link>
        </div>
        {renderCardBottom(projectType)}
      </CardContent>
    </Card>
  );
};

export default ImgMediaCard;
