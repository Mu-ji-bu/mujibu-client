import { useMemo, useCallback } from 'react';
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
import { IProjectState } from 'types/project';
import { projectCategoryEnum, projectFormEnum } from '@/libraries/enum';
import { calculatePercentage } from '@/libraries/utils';
import { CardActionArea } from '@mui/material';

// interface ImgMediaCardProps {
//   isPC: boolean;
//   id: string;
//   image: string;
//   category: string;
// }

interface ImgMediaCardProps extends IProjectState {
  isPC: boolean;
  cardWidth?: CardWidth;
}

const ImgMediaCard: React.FC<ImgMediaCardProps> = (props) => {
  const {
    isPC,
    cardWidth = CardWidth.Normal,
    _id: projectId,
    projectForm,
    projectName,
    currentAmount,
    goalAmount,
    projectBackers,
    projectImage,
    projectCategory,
    projectProposer,
    projectTeam,
    endTime,
  } = props;

  const progressBar = useMemo(() => {
    return currentAmount && goalAmount ? calculatePercentage(currentAmount, goalAmount) : 0;
  }, [currentAmount, goalAmount]);

  const renderIndicator = useCallback(() => {
    switch (projectForm) {
      case projectFormEnum.GENERAL:
        return <CircularDeterminate value={progressBar} size={'4em'} textSize={DeterminateSize.Small} />;
      case projectFormEnum.SUCCESS:
        return <CircleCheckIcon />;
      default:
        return null;
    }
  }, [projectForm, progressBar]);

  const renderLinearProgress = useCallback(() => {
    switch (projectForm) {
      case projectFormEnum.GENERAL:
        return <LinearDeterminate value={progressBar} haslabel={true} />;
      case projectFormEnum.SUCCESS:
        return <LinearDeterminate value={100} haslabel={false} />;
      default:
        return null;
    }
  }, [projectForm, progressBar]);

  const renderCardBottom = () => {
    const currentDate = new Date().toString();
    const remainingDays = endTime ? getRemainingDays(currentDate, endTime.toString()) : 0;

    if (projectForm === projectFormEnum.GENERAL || projectForm === projectFormEnum.SUCCESS) {
      return (
        <>
          <div className="h-px bg-secondary/[.12] my-5"></div>
          {!isPC && <div className="mb-3">{renderLinearProgress()}</div>}
          <div className="flex items-center gap-5">
            {isPC && renderIndicator()}
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
                  NT${goalAmount}k
                </Typography>
              </div>
            </div>
            <div className="text-right ml-auto">
              <div>
                <Typography className="mr-1" component="span" variant="caption" color="primary">
                  {projectBackers}
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
      <Link href={`/projects/introduction/${projectId}`}>
        <CardActionArea>
          <CardMedia
            className="rounded-lg object-cover"
            component="img"
            alt={projectName}
            height="276"
            image={projectImage}
          />
        </CardActionArea>
      </Link>
      <CardContent className="mt-5 p-0">
        <div className="flex justify-between items-center">
          <Chip
            className="text-green-accent border-green-accent"
            label={projectCategoryEnum[projectCategory as keyof typeof projectCategoryEnum]}
            variant="outlined"
          />
          {projectForm !== projectFormEnum.FAILED && (
            <Typography className="opacity-60" component="span" variant="caption" color="secondary">
              {projectForm?.toString() && projectFormEnum[projectForm]}
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
            {projectTeam?.teamName || '沒有團隊也沒有提案者'}
          </Link>
        </div>
        {renderCardBottom()}
      </CardContent>
    </Card>
  );
};

export default ImgMediaCard;
