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
import clsxm from '@/lib/clsxm';
import { DeterminateSize } from '@/components/types/enum';

interface ImgMediaCardProps {
  isPC: boolean;
  projectType: number;
  projectName: string;
}

const ImgMediaCard: React.FC<ImgMediaCardProps> = ({ isPC, ...props }) => {
  const { projectType, projectName } = props;

  const renderIndicator = (projectType: number) => {
    switch (projectType) {
      case 0:
        return <CircularDeterminate value={30} size={'4em'} textSize={DeterminateSize.Small} />;
      case 2:
        return <CircleCheckIcon />;
      default:
        return null;
    }
  };

  const renderLinearProgress = (projectType: number) => {
    switch (projectType) {
      case 0:
        return <LinearDeterminate value={30} haslabel={true} />;
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
                  NT$25k
                </Typography>
              </div>
              <div>
                <Typography className="opacity-60 mr-2" component="span" variant="caption" color="secondary">
                  目標
                </Typography>
                <Typography className="opacity-[.87]" component="span" variant="h6" color="secondary">
                  NT$100k
                </Typography>
              </div>
            </div>
            <div className="text-right ml-auto">
              <div>
                <Typography className="mr-1" component="span" variant="caption" color="primary">
                  999
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
                  14天
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
        { 'max-w-[351px]': projectType !== 2 },
        { 'max-w-[257px]': projectType === 2 },
        'm-auto p-4',
        'md:max-w-[416px] md:p-6',
        'rounded-lg border-secondary shadow-none border border-solid border-opacity-[.12]',
      )}
    >
      <CardMedia
        className="rounded-lg object-cover"
        component="img"
        alt="project img"
        height="276"
        image="/slides/Mobile_slides_3@2x.png"
      />
      <CardContent className="mt-5 p-0">
        <div className="flex justify-between items-center">
          <Chip className="text-green-accent border-green-accent" label="設計" variant="outlined" />
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
            財團法人高雄市私立慈暉關懷學園
          </Link>
        </div>
        {renderCardBottom(projectType)}
      </CardContent>
    </Card>
  );
};

export default ImgMediaCard;
