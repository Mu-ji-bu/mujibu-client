import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Seo from '@/components/Seo';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.back();
      //   router.push("/");
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Seo templateTitle="404" />
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <div className="mb-5 text-secondary-30">
          <svg width="502" height="272" viewBox="0 0 502 272" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M103.002 266.379V266.879H103.502H124.974H125.474V266.379V119.306V118.806H124.974H103.502H103.002V119.306V164.994H25.2159L84.929 3.19891L85.1774 2.52579H84.4599H62.177H61.8325L61.7098 2.84765L0.53281 163.29L0.5 163.377V163.469V187.373V187.873H1H103.002V266.379ZM283.717 32.1853L283.726 32.192C291.143 37.7554 294.87 45.8342 294.87 56.5067V213.303C294.87 222.902 291.675 231.153 285.282 238.08C278.893 244.735 271.19 248.052 262.148 248.052H249.183C239.868 248.052 232.033 244.732 225.647 238.084C219.524 231.158 216.461 222.906 216.461 213.303V56.5067C216.461 50.0772 217.533 44.9006 219.641 40.9458C222.038 36.6859 225.095 33.2329 228.811 30.5783C232.534 27.9195 236.791 26.0549 241.591 24.9879C246.686 23.9155 252.052 23.3786 257.691 23.3786C267.577 23.3786 276.246 26.315 283.717 32.1853ZM300.585 254.578L300.594 254.568C305.499 249.391 309.313 243.397 312.036 236.591C315.035 229.773 316.532 222.414 316.532 214.519V56.5067C316.532 48.6115 315.035 41.2521 312.036 34.4341C309.313 27.6279 305.498 21.7668 300.589 16.8572C295.683 11.6794 289.957 7.72553 283.415 4.99845C276.869 1.99914 269.913 0.5 262.553 0.5H249.183C241.556 0.5 234.465 1.99806 227.915 4.99857C221.373 7.72575 215.647 11.6798 210.741 16.8577C205.835 21.7656 201.886 27.6239 198.893 34.4268L198.889 34.4346L198.886 34.4425C196.16 41.2586 194.799 48.615 194.799 56.5067V214.519C194.799 222.41 196.16 229.767 198.886 236.583C201.61 243.392 205.425 249.389 210.331 254.568L210.331 254.568L210.341 254.578C215.246 259.483 220.968 263.433 227.502 266.428L227.51 266.432L227.518 266.435C234.066 269.164 241.154 270.525 248.778 270.525H262.148C269.771 270.525 276.86 269.164 283.408 266.435L283.416 266.432L283.424 266.428C289.958 263.433 295.68 259.483 300.585 254.578ZM479.027 266.379V266.879H479.527H501H501.5V266.379V119.306V118.806H501H479.527H479.027V119.306V164.994H401.241L460.955 3.19891L461.203 2.52579H460.485H438.202H437.858L437.735 2.84765L376.558 163.29L376.526 163.377V163.469V187.373V187.873H377.026H479.027V266.379Z"
              stroke="currentColor"
            />
          </svg>
        </div>

        <div className="flex items-center justify-center text-primary">
          <LoopRoundedIcon className="animate-spin mr-2" />
          <p>找不到此頁面，跳轉回前頁...</p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
