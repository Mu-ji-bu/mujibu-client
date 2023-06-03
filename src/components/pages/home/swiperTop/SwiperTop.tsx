import Image from 'next/image';
import { useRouter } from 'next/router';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import CircularDeterminate from '../../../block/circularDeterminate/CircularDeterminate';
import { DeterminateSize } from '@/components/types/enum';
import { IconButton, Tooltip, Typography } from '@mui/material';
import clsxm from '@/libraries/utils/clsxm';
import useBreakpoints from '@/libraries/hooks/useBreakPoints';

export interface ISlideOption {
  title: string;
  imgSrc: string;
  isMd?: boolean;
}

const SwiperTop = () => {
  SwiperCore.use([Autoplay]);
  const router = useRouter();
  const handleSlideClick = (slideIndex: number) => {
    // Navigate to the desired page using Next.js router
    router.push(`/projects/${slideIndex}`);
  };

  const goPrev = () => {
    if (swiper) swiper.slidePrev();
  };

  const goNext = () => {
    if (swiper) swiper.slideNext();
  };

  let swiper: any;

  const breakpoints = {
    // 1280 以下剩一張投影片
    640: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1280: {
      slidesPerView: 1.5,
      spaceBetween: 24,
    },
  };

  return (
    <div className="swiper-box relative w-screen flex justify-center">
      <Swiper
        initialSlide={1}
        breakpoints={breakpoints}
        onSwiper={(swiperInstance) => (swiper = swiperInstance)}
        modules={[Navigation]}
        centeredSlides={true}
        spaceBetween={24}
        loop={true}
        autoplay={{ delay: 5000 }}
        navigation={{
          prevEl: '.custom-swiper-button-prev',
          nextEl: '.custom-swiper-button-next',
        }}
        onSlideChange={() => {}}
      >
        <SwiperSlide className="cursor-pointer" onClick={() => handleSlideClick(0)}>
          <Slide
            title="PaintBoard - 運用圓圓方方角角的元素組成新的宇宙。PaintBoard - 運用圓圓方方角角的元素組成新的宇宙。PaintBoard - 運用圓圓方方角角的元素組成新的宇宙。"
            imgSrc="/slides/Desktop_slides_1@2x.png"
          />
        </SwiperSlide>
        <SwiperSlide className="cursor-pointer" onClick={() => handleSlideClick(1)}>
          <Slide
            title="智能家居系統 - 採用智能化技術和多功能設計，實現家居智能化控制和舒適度提升。智能家居系統 - 採用智能化技術和多功能設計，實現家居智能化控制和舒適度提升。智能家居系統 - 採用智能化技術和多功能設計，實現家居智能化控制和舒適度提升。"
            imgSrc="/slides/Desktop_slides_2@2x.png"
          />
        </SwiperSlide>
        <SwiperSlide className="cursor-pointer" onClick={() => handleSlideClick(2)}>
          <Slide
            title="DXRACER - 使用 DXR 新型人工纖維，編織出你我的夢想。DXRACER - 使用 DXR 新型人工纖維，編織出你我的夢想。DXRACER - 使用 DXR 新型人工纖維，編織出你我的夢想。"
            imgSrc="/slides/Desktop_slides_3@2x.png"
          />
        </SwiperSlide>
        <SwiperSlide className="cursor-pointer" onClick={() => handleSlideClick(3)}>
          <Slide
            title="PaintBoard - 運用圓圓方方角角的元素組成新的宇宙。PaintBoard - 運用圓圓方方角角的元素組成新的宇宙。PaintBoard - 運用圓圓方方角角的元素組成新的宇宙。"
            imgSrc="/slides/Desktop_slides_1@2x.png"
          />
        </SwiperSlide>
        <SwiperSlide className="cursor-pointer" onClick={() => handleSlideClick(4)}>
          <Slide
            title="智能家居系統 - 採用智能化技術和多功能設計，實現家居智能化控制和舒適度提升。智能家居系統 - 採用智能化技術和多功能設計，實現家居智能化控制和舒適度提升。智能家居系統 - 採用智能化技術和多功能設計，實現家居智能化控制和舒適度提升。"
            imgSrc="/slides/Desktop_slides_2@2x.png"
          />
        </SwiperSlide>
        <SwiperSlide className="cursor-pointer" onClick={() => handleSlideClick(5)}>
          <Slide
            title="DXRACER - 使用 DXR 新型人工纖維，編織出你我的夢想。DXRACER - 使用 DXR 新型人工纖維，編織出你我的夢想。DXRACER - 使用 DXR 新型人工纖維，編織出你我的夢想。"
            imgSrc="/slides/Desktop_slides_3@2x.png"
          />
        </SwiperSlide>
      </Swiper>

      <div
        className={clsxm(
          'btn-left',
          'absolute top-[42%] left-[2%] xl:left-[14.5%] z-50',
          'bg-white opacity-[.87]',
          'w-[60px] h-[60px] rounded-full',
          'border-solid border-green-accent border',
        )}
      >
        <IconButton
          className="custom-swiper-button-prev w-full h-full text-green-accent"
          aria-label="backward"
          onClick={goPrev}
        >
          <ArrowBackIosRoundedIcon />
        </IconButton>
      </div>

      <div
        className={clsxm(
          'btn-right',
          'absolute top-[42%] right-[2%] xl:right-[14.5%] z-50',
          'bg-white opacity-[.87]',
          'w-[60px] h-[60px] rounded-full',
          'border-solid border-green-accent border',
        )}
      >
        <IconButton
          className="custom-swiper-button-next w-full h-full text-green-accent"
          aria-label="forward"
          onClick={goNext}
        >
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
};

const Slide: React.FC<ISlideOption> = ({ title, imgSrc }) => {
  const { isSm, isMd, isLg, isXl, is2Xl } = useBreakpoints();

  let size: string;
  let textSize: DeterminateSize;

  if (is2Xl) {
    size = '148px';
    textSize = DeterminateSize.Large;
  } else if (isXl) {
    size = '100px';
    textSize = DeterminateSize.Medium;
  } else if (isLg) {
    size = '100px';
    textSize = DeterminateSize.Medium;
  } else if (isMd) {
    size = '100px';
    textSize = DeterminateSize.Medium;
  } else if (isSm) {
    size = '100px';
    textSize = DeterminateSize.Medium;
  } else {
    size = '64px';
    textSize = DeterminateSize.Small;
  }

  return (
    <div className="slide pb-[60px]">
      {isMd || isLg || isXl || is2Xl ? (
        <div className="relative h-[580px] w-full flex justify-center">
          <Image
            className="rounded-md overflow-hidden"
            priority={true}
            src={imgSrc}
            alt="slide1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            // 之前測試過的屬性
            // fill
          />

          <div className="cover absolute bottom-0 left-0 right-0 h-[100px] flex justify-center items-center bg-white bg-opacity-90 z-10">
            <div className="absolute bottom-11 left-[2%]">
              <CircularDeterminate value={30} size={size} textSize={textSize} />
            </div>
            <div
              className={clsxm(
                'white-bg bg-white rounded-full',
                'absolute bottom-[52px] left-[2.2%] -z-10',
                is2Xl ? 'w-[144px] h-[144px]' : 'w-[96px] h-[96px]',
              )}
            ></div>
            <div className="text w-[70%] flex justify-center">
              <Typography
                component="p"
                variant="body16"
                className="overflow-hidden text-secondary hover:text-black text-ellipsis whitespace-normal max-w-full"
                style={{
                  // 文字最多 3 行，超過會以 tooltips 顯示
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: '1.5',
                  maxHeight: '4.5em',
                }}
              >
                <Tooltip title={title}>
                  <span>{title}</span>
                </Tooltip>
              </Typography>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-[282px] w-full flex justify-center">
          <Image
            priority={true}
            src={imgSrc}
            alt="slide1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
          <div
            className={clsxm(
              'cover h-[96px]',
              'absolute bottom-[-48px] left-0 right-0 z-50',
              'mx-[2%] p-3',
              'flex justify-start items-center',
              'bg-white bg-opacity-90',
              'rounded-lg shadow-sm shadow-green-accent',
            )}
          >
            <div className="relative w-[30%]">
              <div className={clsxm('absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2')}>
                <CircularDeterminate value={30} size={size} textSize={textSize} />
              </div>
              <div
                className={clsxm(
                  'white-bg bg-white rounded-full',
                  'absolute top-1/2 left-1/2 -translate-y-[52%] -translate-x-1/2 -z-10',
                  isSm ? 'w-[96px] h-[96px] mx-auto' : 'w-[60px] h-[60px] mx-auto',
                )}
              ></div>
            </div>

            <div className="text w-[70%] h-full flex justify-start items-center">
              <Typography
                component="p"
                variant="body16"
                className="overflow-hidden hover:text-primary text-ellipsis whitespace-normal max-w-full"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: '1.5',
                  maxHeight: '4.5em',
                }}
              >
                <Tooltip title={title}>
                  <span>{title}</span>
                </Tooltip>
              </Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwiperTop;
