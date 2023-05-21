import Seo from '@/components/Seo';
import SwiperTop from '@/components/block/swiperTop';
import { Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <>
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
      <h2>木質部，募質部。</h2>
      <h2>木質部，募質部。</h2>
    </>
  );
}
