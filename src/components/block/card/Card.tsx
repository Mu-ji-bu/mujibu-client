import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CircularDeterminate from '@/components/block/circularDeterminate/CircularDeterminate';
import Link from 'next/link';

interface ImgMediaCardProps {
  projectType: string;
  projectName: string;
}

const ImgMediaCard: React.FC<ImgMediaCardProps> = (props) => {
  const { projectType, projectName } = props;

  return (
    <Card className="md:max-w-card-pc max-w-card-mobile md:p-card-pc p-card-mobile rounded-lg border-secondary shadow-none border border-solid border-opacity-[.12]">
      <CardMedia
        className="rounded-lg object-cover"
        component="img"
        alt="project img"
        height="276"
        image="/slides/Mobile_slides_3@2x.png"
      />
      <CardContent className="mt-5 p-0">
        <Chip label="設計" variant="outlined" color="primary" />
        <div className="pt-2 pb-3 md:h-card-title-pc h-card-title-mobile">
          <Typography variant="body20">{projectName}</Typography>
        </div>
        <Typography className="mr-1 opacity-60" component="span" variant="h6" color="secondary">
          提案者
        </Typography>
        <Link href="#" className="no-underline visited:text-primary text-primary font-medium hover:text-secondary">
          財團法人高雄市私立慈暉關懷學園
        </Link>
        <div className="h-px bg-secondary/[.12] my-5"></div>
        <div className="flex items-center gap-5">
          <CircularDeterminate value={30} size={'4em'} />
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
      </CardContent>
    </Card>
  );
};

export default ImgMediaCard;
