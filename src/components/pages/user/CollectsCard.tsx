import { useState } from 'react';
import Link from 'next/link';
import { Typography, Button, Card, CardContent, CardMedia, Chip, Rating } from '@mui/material';

import clsxm from '@/libraries/utils/clsxm';

interface Team {
  teamId: string;
  teamName: string;
}

interface Collect {
  projectId: string;
  projectVisual: string;
  projectName: string;
  projectType: number;
  projectTeam: Team;
  projectUrl: string;
}

interface CollectsCardProps {
  isPC: boolean;
  collect: Collect;
}

const CollectsCard: React.FC<CollectsCardProps> = ({ isPC, collect }) => {
  return (
    <Card className="flex flex-col rounded-lg border border-solid border-secondary-10 shadow-none">
      <Link href={collect.projectId} className="">
        <div className="aspect-[16/9] w-full overflow-hidden">
          {' '}
          <CardMedia
            className="w-full h-full hover:scale-105 transition-all"
            component="img"
            image={collect.projectVisual}
            alt={collect.projectName}
          />
        </div>
      </Link>
      <CardContent className="p-5 flex flex-col">
        <div className="mb-3">
          {collect.projectType == 0 && <Chip className="px-1 self-start" color="primary" label="募資中" size="small" />}
          {collect.projectType == 1 && (
            <Chip className="px-1 self-start" color="secondary" label="長期販售" size="small" />
          )}
          {collect.projectType == 2 && <Chip className="px-1 self-start" label="已結束" size="small" />}
        </div>
        <Link
          href={collect.projectId}
          className="no-underline visited:text-secondary hover:text-primary text-secondary block mb-2"
        >
          <Typography component="h2" variant={isPC ? 'h5' : 'h6'} className="line-clamp-2">
            {collect.projectName}
          </Typography>
        </Link>
        <div className="mb-3 flex items-center">
          <Typography
            className="mr-1 text-secondary-66 leading-none shrink-0"
            component="span"
            variant={isPC ? 'h6' : 'caption'}
            color="secondary"
          >
            提案者
          </Typography>
          <Link
            href={collect.projectTeam.teamId}
            className="no-underline line-clamp-1  text-primary  hover:text-secondary visited:text-primary"
          >
            <Typography component="span" variant={isPC ? 'h6' : 'caption'}>
              {collect.projectTeam.teamName}
            </Typography>
          </Link>
        </div>
        <Button className="self-end" color="secondary" variant="outlined" size="small">
          取消追蹤
        </Button>
      </CardContent>
    </Card>
  );
};

export default CollectsCard;
