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
import { IconButton } from '@mui/material';
import clsxm from '@/libraries/utils/clsxm';
import useBreakpoints from '@/libraries/hooks/useBreakPoints';
import { ReactNode, useRef } from 'react';
import { CardWidth } from '@/components/types/enum';
import { IProjectState } from '@/types/project';

SwiperCore.use([Autoplay]);

interface ISwiperCardProps {
  swiperInstances: SwiperCore[];
  projectData: IProjectState[];
  buttonClass: number;
}

const SwiperCard: React.FC<ISwiperCardProps> = ({ ...props }) => {
  const { swiperInstances, projectData, buttonClass } = props;

  const { isSm, isMd, isLg, isXl, is2Xl } = useBreakpoints();
  const router = useRouter();

  const swiperBoxRef = useRef<HTMLDivElement>(null); // 用於獲取 swiper-box 元素的參考

  return (
    <div className="relative w-screen flex justify-center">
      <div
        ref={swiperBoxRef}
        className={clsxm(
          'swiper-box flex 2xl:relative',
          'justify-center overflow-x-auto',
          'w-[80%]',
          !isLg && 'max-w-[416px]',
        )}
      >
        {is2Xl ? (
          <>
            <Swiper
              onSwiper={(swiperInstance) => (swiperInstances[0] = swiperInstance)} // 儲存第一個 Swiper 實例
              modules={[Navigation]}
              centeredSlides={true}
              spaceBetween={24}
              loop={true}
              autoplay={{ delay: 10000 }}
              navigation={{
                prevEl: `.custom-swiper-button-prev-${buttonClass}`,
                nextEl: `.custom-swiper-button-next-${buttonClass}`,
              }}
              onSlideChange={() => {}}
            >
              {projectData.reduce((accumulator: ReactNode[], p, index) => {
                if (index % 3 === 0) {
                  const slideProjects = projectData.slice(index, index + 3);
                  const slide = (
                    <SwiperSlide key={index}>
                      <div className="flex justify-center gap-6">
                        {slideProjects.map((slideProject) => (
                          <div key={slideProject._id} className="max-w-[416px]">
                            <Card isPC={true} {...slideProject} />
                          </div>
                        ))}
                      </div>
                    </SwiperSlide>
                  );
                  accumulator.push(slide);
                }
                return accumulator;
              }, [])}
            </Swiper>
            <ArrowButtons swiperInstance={swiperInstances[0]} buttonClass={buttonClass} />
          </>
        ) : isXl || isLg ? (
          <>
            <Swiper
              onSwiper={(swiperInstance) => (swiperInstances[1] = swiperInstance)} // 儲存第二個 Swiper 實例
              modules={[Navigation]}
              centeredSlides={true}
              spaceBetween={24}
              loop={true}
              autoplay={{ delay: 10000 }}
              navigation={{
                prevEl: `.custom-swiper-button-prev-${buttonClass}`,
                nextEl: `.custom-swiper-button-next-${buttonClass}`,
              }}
              onSlideChange={() => {}}
            >
              {projectData.reduce((accumulator: ReactNode[], p, index) => {
                if (index % 2 === 0) {
                  const slideProjects = projectData.slice(index, index + 2);
                  const slide = (
                    <SwiperSlide key={index}>
                      <div className="flex justify-center gap-6">
                        {slideProjects.map((slideProject) => (
                          <div key={slideProject._id} className="max-w-[416px]">
                            <Card isPC={true} {...slideProject} />
                          </div>
                        ))}
                      </div>
                    </SwiperSlide>
                  );
                  accumulator.push(slide);
                }
                return accumulator;
              }, [])}
            </Swiper>
            <ArrowButtons swiperInstance={swiperInstances[1]} buttonClass={buttonClass} />
          </>
        ) : (
          <>
            <Swiper
              onSwiper={(swiperInstance) => (swiperInstances[2] = swiperInstance)} // 儲存第三個 Swiper 實例
              modules={[Navigation]}
              centeredSlides={true}
              spaceBetween={24}
              loop={true}
              autoplay={{ delay: 10000 }}
              navigation={{
                prevEl: `.custom-swiper-button-prev-${buttonClass}`,
                nextEl: `.custom-swiper-button-next-${buttonClass}`,
              }}
              onSlideChange={() => {}}
            >
              {projectData &&
                projectData.map((project) => (
                  <SwiperSlide key={project._id}>
                    <div className="max-w-[416px]">
                      <Card isPC={true} {...project} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            <ArrowButtons swiperInstance={swiperInstances[2]} buttonClass={buttonClass} />
          </>
        )}
      </div>
    </div>
  );
};

interface IArrowButtonsProps {
  swiperInstance: SwiperCore; // 可選的 Swiper 實例
  buttonClass: number;
}
const ArrowButtons: React.FC<IArrowButtonsProps> = ({ swiperInstance, buttonClass }) => {
  const goPrev = () => {
    if (swiperInstance) swiperInstance.slidePrev();
  };

  const goNext = () => {
    if (swiperInstance) swiperInstance.slideNext();
  };
  return (
    <>
      <div
        className={clsxm(
          'btn-left',
          'absolute top-[42%] left-[2%] xl:left-[14.5%] 2xl:left-0 z-50 ',
          'bg-white opacity-[.87]',
          'w-[60px] h-[60px] rounded-full',
          'border-solid border-green-accent border',
        )}
      >
        <IconButton
          className={clsxm(`custom-swiper-button-prev-${buttonClass}`, 'w-full h-full text-green-accent')}
          aria-label="backward"
          onClick={goPrev}
        >
          <ArrowBackIosRoundedIcon />
        </IconButton>
      </div>

      <div
        className={clsxm(
          'btn-right',
          'absolute top-[42%] right-[2%] xl:right-[14.5%] 2xl:right-0 z-50',
          'bg-white opacity-[.87]',
          'w-[60px] h-[60px] rounded-full',
          'border-solid border-green-accent border',
        )}
      >
        <IconButton
          className={clsxm(`custom-swiper-button-next-${buttonClass}`, 'w-full h-full text-green-accent')}
          aria-label="forward"
          onClick={goNext}
        >
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </div>
    </>
  );
};

export default SwiperCard;
