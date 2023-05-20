import { useMediaQuery } from '@mui/material';

/**
sm: 小型螢幕，寬度大於等於 640px /
md: 中型螢幕，寬度大於等於 768px /
lg: 大型螢幕，寬度大於等於 1024px /
xl: 超大型螢幕，寬度大於等於 1280px /
2xl: 非常大型螢幕，寬度大於等於 1536px
 */

const useBreakpoints = () => {
  const isSm = useMediaQuery('(min-width: 640px)');
  const isMd = useMediaQuery('(min-width: 768px)');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const isXl = useMediaQuery('(min-width: 1280px)');
  const is2Xl = useMediaQuery('(min-width: 1536px)');

  return { isSm, isMd, isLg, isXl, is2Xl };
};

export default useBreakpoints;
