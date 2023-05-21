import { useRouter } from 'next/router';
import Card from '@/components/block/card';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

let data1: { id: number; projectType: string; projectName: string }[] = [];
let data2: { id: number; projectType: string; projectName: string }[] = [];
let data3: { id: number; projectType: string; projectName: string }[] = [];
for (let i = 0; i < 3; i++) {
  data1.push({
    id: i,
    projectType: 'InProgress',
    projectName: 'Balance衡壓坐墊｜市場唯一衡壓概念健康坐墊，坐出 Q 軟好體態！',
  });
  data2.push({
    id: i + 3,
    projectType: 'InProgress',
    projectName: '手繪畫冊 - 擁抱內心的創意，探索藝術家心靈深處的畫作',
  });
  data3.push({
    id: i + 6,
    projectType: 'InProgress',
    projectName: '瞳孔識別支付系統 - 基於人工智能技術的安全支付系統，保護您的財產安全 ',
  });
}
const SwiperCard = () => {
  SwiperCore.use([Autoplay]);
  const router = useRouter();
  const handleSlideClick = (slideIndex: number) => {
    console.log('Slide clicked:', slideIndex);
    // Navigate to the desired page using Next.js router
    router.push(`/projects/${slideIndex}`);
  };

  const goPrev = () => {
    if (swiper2) swiper2.slidePrev();
  };

  const goNext = () => {
    if (swiper2) swiper2.slideNext();
  };

  let swiper2: any;

  return (
    <div className="swiper-box relative w-screen flex justify-center">
      <Swiper
        onSwiper={(swiperInstance) => (swiper2 = swiperInstance)}
        modules={[Navigation]}
        centeredSlides={true}
        spaceBetween={24}
        loop={true}
        autoplay={{ delay: 10000 }}
        navigation={{
          prevEl: '.custom-swiper-button-prev-2',
          nextEl: '.custom-swiper-button-next-2',
        }}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide className="cursor-pointer" onClick={() => handleSlideClick(0)}>
          <div className="flex flex-wrap justify-between gap-6">
            {data1.map((project) => (
              <div key={project.id} className="">
                <Card isPC={false} {...project} />
              </div>
            ))}
          </div>
          ;
        </SwiperSlide>
        <SwiperSlide className="cursor-pointer" onClick={() => handleSlideClick(1)}>
          <div className="flex flex-wrap justify-between gap-6">
            {data2.map((project) => (
              <div key={project.id} className="">
                <Card isPC={true} {...project} />
              </div>
            ))}
          </div>
          ;
        </SwiperSlide>
        <SwiperSlide className="cursor-pointer" onClick={() => handleSlideClick(2)}>
          <div className="flex flex-wrap justify-between gap-6">
            {data3.map((project) => (
              <div key={project.id} className="">
                <Card isPC={true} {...project} />
              </div>
            ))}
          </div>
          ;
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperCard;
