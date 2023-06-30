import { useState } from 'react';
import Link from 'next/link';
import { Typography, Button, Card, CardContent, CardMedia, Chip, Rating } from '@mui/material';
import { projectFormEnum } from '@/libraries/enum';
import routePath from '@/routes/routePath';

import clsxm from '@/libraries/utils/clsxm';
interface Collect {
  _id: string;
  projectImage: string;
  projectName: string;
  projectForm: number;
  projectTeam: any;
  projectUrl: string;
}

interface CollectsCardProps {
  isPC: boolean;
  collect: Collect;
  onCancelFollow: Function;
}

const CollectsCard: React.FC<CollectsCardProps> = ({ isPC, collect, onCancelFollow }) => {
  const projectId = collect._id;

  return (
    <Card className="flex flex-col rounded-lg border border-solid border-secondary-10 shadow-none">
      <Link href={`${routePath.projectsIntroduction}/${collect._id}`} className="">
        <div className="aspect-[16/9] w-full overflow-hidden">
          {' '}
          <CardMedia
            className="w-full h-full hover:scale-105 transition-all"
            component="img"
            image={collect.projectImage}
            alt={collect.projectName}
          />
        </div>
      </Link>
      <CardContent className="p-5 flex flex-col">
        <div className="mb-3">
          {collect.projectForm == projectFormEnum.GENERAL && (
            <Chip className="px-1 self-start" color="primary" label={projectFormEnum[0]} size="small" />
          )}
          {collect.projectForm == projectFormEnum.LONG_TERM && (
            <Chip className="px-1 self-start" color="primary" label={projectFormEnum[1]} size="small" />
          )}
          {collect.projectForm == projectFormEnum.SUCCESS && (
            <Chip className="px-1 self-start" color="secondary" label={projectFormEnum[2]} size="small" />
          )}
          {collect.projectForm == projectFormEnum.FAILED && (
            <Chip className="px-1 self-start" label={projectFormEnum[3]} size="small" />
          )}
        </div>
        <Link
          href={`${routePath.projectsIntroduction}/${collect._id}`}
          className="no-underline visited:text-secondary hover:text-primary text-secondary block mb-2"
        >
          <Typography component="h2" variant={isPC ? 'h5' : 'h6'} className="line-clamp-2">
            {collect.projectName}
          </Typography>
        </Link>
        <div className="mb-3 flex items-center">
          {/* <Typography
            className="mr-1 text-secondary-66 leading-none shrink-0"
            component="span"
            variant={isPC ? 'h6' : 'caption'}
            color="secondary"
          >
            提案者
          </Typography> */}
          {/* <Link
            href={collect.projectTeam?._id || ''}
            className="no-underline line-clamp-1  text-primary  hover:text-secondary visited:text-primary"
          >
            <Typography component="span" variant={isPC ? 'h6' : 'caption'}>
              {collect.projectTeam?.teamName || '沒有團隊名稱'}
            </Typography>
          </Link> */}
        </div>
        <Button
          className="self-end"
          color="secondary"
          variant="outlined"
          size="small"
          onClick={() => onCancelFollow(projectId)}
        >
          取消追蹤
        </Button>
      </CardContent>
    </Card>
  );
};

export default CollectsCard;
