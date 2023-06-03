import Seo from '@/components/Seo';
import SwiperCard from '@/components/pages/home/swiperCard/SwiperCard';
import SwiperTop from '@/components/pages/home/swiperTop';
import SwiperCore from 'swiper';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import SuccessShop from '@/components/pages/home/SuccessShop';
import clsxm from '@/libraries/utils/clsxm';
import useBreakpoints from '@/libraries/hooks/useBreakPoints';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { IProject, useGetProjectDataQuery } from '@/store/services/projectApi';

export default function Home() {
  const { data, refetch } = useGetProjectDataQuery();
  const swiperInstancesHot: SwiperCore[] = []; // 創建空的 Swiper 實例陣列
  const swiperInstancesNew: SwiperCore[] = []; // 創建空的 Swiper 實例陣列
  const swiperInstancesSuccess: SwiperCore[] = []; // 創建空的 Swiper 實例陣列
  const { isSm, isMd, isLg, isXl, is2Xl } = useBreakpoints();
  const router = useRouter();

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      await refetch();
      setisLoading(false);
    };

    fetchData();
  }, []);

  return (
    <main className="home w-full">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Seo templateTitle="Home" />
          <div className="linkText flex flex-wrap justify-center py-5">
            <Link
              href={'/projects'}
              className="no-underline text-secondary  hover:text-primary visited:text-secondary mr-8"
            >
              <Typography component="h6" variant="h6">
                藝術
              </Typography>
            </Link>
            <Link
              href={'/projects'}
              className="no-underline text-secondary hover:text-primary visited:text-secondary mr-8"
            >
              <Typography component="h6" variant="h6">
                設計
              </Typography>
            </Link>
            <Link
              href={'/projects'}
              className="no-underline text-secondary hover:text-primary visited:text-secondary mr-8"
            >
              <Typography component="h6" variant="h6">
                電影
              </Typography>
            </Link>
            <Link
              href={'/projects'}
              className="no-underline text-secondary hover:text-primary visited:text-secondary mr-8"
            >
              <Typography component="h6" variant="h6">
                音樂
              </Typography>
            </Link>
            <Link
              href={'/projects'}
              className="no-underline text-secondary hover:text-primary visited:text-secondary mr-8"
            >
              <Typography component="h6" variant="h6">
                科技
              </Typography>
            </Link>
            <Link href={'/projects'} className="no-underline text-secondary hover:text-primary visited:text-secondary">
              <Typography component="h6" variant="h6">
                出版
              </Typography>
            </Link>
          </div>

          <SwiperTop />

          <div className="hot w-full flex justify-center mt-10 md:mt-0">
            <div className="flex flex-col items-center">
              <div className="title mb-10 md:block hidden">
                <Typography component="h2" variant="h2">
                  熱門精選
                </Typography>
              </div>
              <div className="title mb-5 block md:hidden">
                <Typography component="h2" variant="h4">
                  熱門精選
                </Typography>
              </div>
              <SwiperCard
                swiperInstances={swiperInstancesHot}
                projectData={data?.data?.projects as IProject[]}
                buttonClass={2}
              />
              <Button variant="outlined" color="secondary" className="mt-[40px] mb-[60px]">
                發現更多
              </Button>
            </div>
          </div>

          <div className="new w-full flex justify-center">
            <div className="flex flex-col items-center">
              <div className="title mb-10 md:block hidden">
                <Typography component="h2" variant="h2">
                  最新募資
                </Typography>
              </div>
              <div className="title mb-5 block md:hidden">
                <Typography component="h2" variant="h4">
                  最新募資
                </Typography>
              </div>
              <SwiperCard
                swiperInstances={swiperInstancesNew}
                projectData={data?.data?.projects as IProject[]}
                buttonClass={3}
              />
              <Button variant="outlined" color="secondary" className="mt-[40px] mb-[60px]">
                發現更多
              </Button>
            </div>
          </div>

          <div className="promise w-full bg-gray-light mb-10">
            <div className="max-w-screen-xl mx-auto p-5 flex flex-wrap md:flex-nowrap justify-center">
              <div className="flex flex-col  w-2/3 md:w-1/3 items-center p-6">
                <div className="aspect-square w-1/2">
                  <Image
                    src={'/feature/icon_feature_1@2x.png'}
                    alt="promise1"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </div>
                <Typography component="h4" variant="h4" className="mt-5">
                  最透明
                </Typography>
                <Typography component="p" variant="body16" className="mt-[10px]">
                  所有募資專案皆提供豐富資訊給贊助者，以了解該募資項目的所有細節，包括用途、目標金額、計畫時間、募資團隊、風險因素等。
                </Typography>
              </div>
              <div className="flex flex-col  w-2/3 md:w-1/3 items-center p-6">
                <div className="aspect-square w-1/2">
                  <Image
                    src={'/feature/icon_feature_2@2x.png'}
                    alt="promise1"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </div>
                <Typography component="h4" variant="h4" className="mt-5">
                  最安心
                </Typography>
                <Typography component="p" variant="body16" className="mt-[10px]">
                  募質部保證會員們的個人資料和金融資訊的安全。致力給會員們最安心的保障！
                </Typography>
              </div>
              <div className="flex flex-col w-2/3 md:w-1/3 items-center p-6">
                <div className="aspect-square w-1/2">
                  <Image
                    src={'/feature/icon_feature_3@2x.png'}
                    alt="promise1"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </div>
                <Typography component="h4" variant="h4" className="mt-5">
                  最負責
                </Typography>
                <Typography component="p" variant="body16" className="mt-[10px]">
                  確保資金用於指定用途，並且在募資達成後及時支付。如果募資項目未能實現，募質部會負責退款或提供其他解決方案。
                </Typography>
              </div>
            </div>
          </div>

          <div className="shop w-full flex justify-center">
            <div className="flex flex-col items-center">
              <div className="title mb-5 md:block hidden">
                <Typography component="h2" variant="h2">
                  募資選物
                </Typography>
              </div>
              <div className="title mb-5 block md:hidden">
                <Typography component="h2" variant="h4">
                  募資選物
                </Typography>
              </div>
              <div className="subtitle mb-10 text-center">
                <Typography component="h5" variant="h6" className="text-primary">
                  隨時隨地就能夠購買到精選的集資成功產品
                </Typography>
              </div>
              <div className="shop-cards">
                <SuccessShop projectData={data?.data?.projects as IProject[]} />
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
              <div className="title mb-5 md:block hidden">
                <Typography component="h2" variant="h2">
                  經典成功案例
                </Typography>
              </div>
              <div className="title mb-5 block md:hidden">
                <Typography component="h2" variant="h4">
                  經典成功案例
                </Typography>
              </div>
              <div className="subtitle mb-10 text-center">
                <Typography component="h5" variant="h6" className="text-primary">
                  募質部已成功幫助募資案列超過 2000 件
                </Typography>
              </div>
              <SwiperCard
                swiperInstances={swiperInstancesSuccess}
                projectData={data?.data?.projects as IProject[]}
                buttonClass={4}
              />
              <Button variant="outlined" color="secondary" className="mt-[40px] mb-[60px]">
                發現更多
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
