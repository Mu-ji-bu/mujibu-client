import Seo from '@/components/Seo';
import SwiperCard from '@/components/block/swiperCard/SwiperCard';
import SwiperTop from '@/components/block/swiperTop';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="home w-full">
      <Seo templateTitle="Home" />
      <div className="linkText flex flex-wrap justify-center mt-11 mb-8">
        <Link href={'/projects'} className="no-underline text-secondary visited:text-secondary mr-8">
          <Typography component="h6" variant="h6">
            藝術
          </Typography>
        </Link>
        <Link href={'/projects'} className="no-underline text-secondary visited:text-secondary mr-8">
          <Typography component="h6" variant="h6">
            設計
          </Typography>
        </Link>
        <Link href={'/projects'} className="no-underline text-secondary visited:text-secondary mr-8">
          <Typography component="h6" variant="h6">
            電影
          </Typography>
        </Link>
        <Link href={'/projects'} className="no-underline text-secondary visited:text-secondary mr-8">
          <Typography component="h6" variant="h6">
            音樂
          </Typography>
        </Link>
        <Link href={'/projects'} className="no-underline text-secondary visited:text-secondary mr-8">
          <Typography component="h6" variant="h6">
            科技
          </Typography>
        </Link>
        <Link href={'/projects'} className="no-underline text-secondary visited:text-secondary">
          <Typography component="h6" variant="h6">
            出版
          </Typography>
        </Link>
      </div>

      <SwiperTop />
      <div className="hot w-full flex justify-center">
        <div className="flex flex-col items-center">
          <div className="title mb-10">
            <Typography component="h2" variant="h2">
              熱門精選
            </Typography>
          </div>
          <SwiperCard />
          <Button variant="outlined" color="secondary" className="mt-[52.5px] mb-[60px]">
            發現更多
          </Button>
        </div>
      </div>

      <Typography component="h2" variant="h2">
        最新募資
      </Typography>
      <Typography component="h2" variant="h2">
        募資選物
      </Typography>
      <Typography component="h2" variant="h2">
        經典成功案例
      </Typography>
      <Typography component="h5" variant="h5" className="text-primary">
        募質部已成功幫助募資案列超過 2000 件
      </Typography>
      <h2>木質部，募質部。</h2>
      <h2>木質部，募質部。</h2>
    </div>
  );
}
