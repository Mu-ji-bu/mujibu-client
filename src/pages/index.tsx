import Seo from '@/components/Seo';
import SwiperCard from '@/components/block/home/swiperCard/SwiperCard';
import SwiperTop from '@/components/block/home/swiperTop';
import SwiperCore from 'swiper';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import SuccessShop from '@/components/block/home/SuccessShop';
import clsxm from '@/libraries/utils/clsxm';
import useBreakpoints from '@/libraries/hooks/useBreakPoints';
import { useRouter } from 'next/router';

let dataHot: { id: number; projectType: number; projectName: string }[] = [];
let dataNew: { id: number; projectType: number; projectName: string }[] = [];
let dataShop: { id: number; projectType: number; projectName: string }[] = [];
let dataSuccess: { id: number; projectType: number; projectName: string }[] = [];
for (let i = 0; i < 20; i++) {
  dataHot.push({
    id: i,
    projectType: 0,
    projectName: 'Balance衡壓坐墊｜市場唯一衡壓概念健康坐墊，坐出 Q 軟好體態！',
  });
  dataNew.push({
    id: i + 3,
    projectType: 0,
    projectName: '手繪畫冊 - 擁抱內心的創意，探索藝術家心靈深處的畫作',
  });
  if (i < 6) {
    dataShop.push({
      id: i + 3,
      projectType: 1,
      projectName: '環保藝術品 - 將廢棄物轉化為獨特藝術創作，展現綠色生活魅力',
    });
  }
  dataSuccess.push({
    id: i + 3,
    projectType: 0,
    projectName: '瞳孔識別支付系統 - 基於人工智能技術的安全支付系統，保護您的財產安全',
  });
}

export default function Home() {
  const swiperInstancesHot: SwiperCore[] = []; // 創建空的 Swiper 實例陣列
  const swiperInstancesNew: SwiperCore[] = []; // 創建空的 Swiper 實例陣列
  const swiperInstancesSuccess: SwiperCore[] = []; // 創建空的 Swiper 實例陣列
  const { isSm, isMd, isLg, isXl, is2Xl } = useBreakpoints();
  const router = useRouter();
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
          <SwiperCard swiperInstances={swiperInstancesHot} projectData={dataHot} buttonClass={2} />
          <Button variant="outlined" color="secondary" className="mt-[40px] mb-[60px]">
            發現更多
          </Button>
        </div>
      </div>

      <div className="new w-full flex justify-center">
        <div className="flex flex-col items-center">
          <div className="title mb-10">
            <Typography component="h2" variant="h2">
              最新募資
            </Typography>
          </div>
          <SwiperCard swiperInstances={swiperInstancesNew} projectData={dataNew} buttonClass={3} />
          <Button variant="outlined" color="secondary" className="mt-[40px] mb-[60px]">
            發現更多
          </Button>
        </div>
      </div>

      <div className="promise w-full flex-wrap md:flex-nowrap flex justify-center  bg-gray-light">
        <div className="flex flex-col w-2/3 md:w-1/3 items-center p-6">
          <Image
            src={'/feature/icon_feature_1@2x.png'}
            alt="promise1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
          <Typography component="h4" variant="h4" className="mt-5">
            最透明
          </Typography>
          <Typography component="p" variant="body16" className="mt-[10px]">
            所有募資專案皆提供豐富資訊給贊助者，以了解該募資項目的所有細節，包括用途、目標金額、計畫時間、募資團隊、風險因素等。
          </Typography>
        </div>
        <div className="flex flex-col w-2/3 md:w-1/3 items-center p-6">
          <Image
            src={'/feature/icon_feature_2@2x.png'}
            alt="promise1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
          <Typography component="h4" variant="h4" className="mt-5">
            最安心
          </Typography>
          <Typography component="p" variant="body16" className="mt-[10px]">
            募質部保證會員們的個人資料和金融資訊的安全。致力給會員們最安心的保障！
          </Typography>
        </div>
        <div className="flex flex-col w-2/3 md:w-1/3 items-center p-6">
          <Image
            src={'/feature/icon_feature_3@2x.png'}
            alt="promise1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
          <Typography component="h4" variant="h4" className="mt-5">
            最負責
          </Typography>
          <Typography component="p" variant="body16" className="mt-[10px]">
            確保資金用於指定用途，並且在募資達成後及時支付。如果募資項目未能實現，募質部會負責退款或提供其他解決方案。
          </Typography>
        </div>
      </div>

      <div className="shop w-full flex justify-center">
        <div className="flex flex-col items-center">
          <div className="title mt-[60px] mb-5">
            <Typography component="h2" variant="h2">
              募資選物
            </Typography>
          </div>
          <div className="subtitle mb-10 text-center">
            <Typography component="h5" variant="h5" className="text-primary">
              隨時隨地就能夠購買到精選的集資成功產品
            </Typography>
          </div>
          <div className="shop-cards">
            <SuccessShop projectData={dataShop} />
          </div>
          <Button variant="outlined" color="secondary" className="mt-[40px] mb-[60px]">
            發現更多
          </Button>
        </div>
      </div>

      <div className="background relative">
        {isSm ? (
          <>
            <Image
              src={'/bg/Desktop_bg@2x.png'}
              alt="bg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: '350px' }}
            />
            <div
              className={clsxm(
                'backgroundCenter flex-col items-center w-full',
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              )}
            >
              <div className="backgroundText mt-20">
                <div className="reality flex justify-center">
                  <Typography component="h5" variant="h5" className="mb-2">
                    將您的創意專案變為現實，讓有價值的事物讓更多人看見
                  </Typography>
                </div>
                <div className="better-life flex justify-center">
                  <Typography component="span" variant="h5">
                    與
                  </Typography>
                  <Typography component="span" variant="h5" className="text-primary">
                    募質部
                  </Typography>
                  <Typography component="span" variant="h5">
                    一同創造更美好、更有品質的生活！
                  </Typography>
                </div>
              </div>
              <div className="backgroundButton flex justify-center">
                <Button variant="contained" className="mt-5" onClick={() => router.push('/proposal')}>
                  我要發起募資提案！
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Image
              src={'/bg/Mobile_bg@2x.png'}
              alt="bg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: '350px' }}
            />
            <div
              className={clsxm(
                'backgroundCenter flex-col items-center w-full',
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              )}
            >
              <div className="backgroundText mt-8">
                <div className="reality flex justify-center">
                  <Typography component="h6" variant="h6" className="mb-2">
                    將您的創意專案變為現實
                  </Typography>
                </div>
                <div className="valubale flex justify-center text-center">
                  <Typography component="h6" variant="h6" className="mb-2">
                    讓有價值的事物讓更多人看見
                  </Typography>
                </div>
                <div className="better-life flex justify-center">
                  <Typography component="span" variant="h6">
                    與
                  </Typography>
                  <Typography component="span" variant="h6" className="text-primary">
                    募質部
                  </Typography>
                  <Typography component="span" variant="h6">
                    一同創造更美好、更有品質的生活！
                  </Typography>
                </div>
              </div>
              <div className="backgroundButton flex justify-center">
                <Button variant="contained" className="mt-5">
                  我要發起募資提案！
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="success w-full flex justify-center mt-10">
        <div className="flex flex-col items-center">
          <div className="title mb-5">
            <Typography component="h2" variant="h2">
              經典成功案例
            </Typography>
          </div>
          <div className="subtitle mb-10 text-center">
            <Typography component="h5" variant="h5" className="text-primary">
              募質部已成功幫助募資案列超過 2000 件
            </Typography>
          </div>
          <SwiperCard swiperInstances={swiperInstancesSuccess} projectData={dataSuccess} buttonClass={4} />
          <Button variant="outlined" color="secondary" className="mt-[40px] mb-[60px]">
            發現更多
          </Button>
        </div>
      </div>
    </div>
  );
}
