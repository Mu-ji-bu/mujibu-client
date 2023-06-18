import { Typography } from '@mui/material';

const ProjectProgress: React.FC<{ step: number }> = ({ step }) => {
  return (
    <>
      <div className="project-progress-box pt-2 pr-14">
        <div className="w-60 h-2 bg-gray-dark relative">
          <div className="circle1 absolute w-5 h-5 -left-[10px] -top-[6px] bg-gray-dark rounded-full">
            <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="7.5" fill="#1CA69A" />
              <path
                d="M4.5 8.5L6.5 10.5L11 6"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Typography component="p" variant="caption" className="absolute -left-[12px] top-5 w-max">
              募資中
            </Typography>
          </div>
          <div className="circle1 absolute w-5 h-5 left-[70px] -top-[6px] bg-gray-dark rounded-full">
            {step > 0 && (
              <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="7.5" fill="#1CA69A" />
                <path
                  d="M4.5 8.5L6.5 10.5L11 6"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <Typography component="p" variant="caption" className="absolute -left-[18px] top-5 w-max">
              產品生產
            </Typography>
          </div>
          <div className="circle3 absolute w-5 h-5 right-[70px] -top-[6px] bg-gray-dark rounded-full">
            {step > 1 && (
              <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="7.5" fill="#1CA69A" />
                <path
                  d="M4.5 8.5L6.5 10.5L11 6"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            <Typography component="p" variant="caption" className="absolute -left-[18px] top-5 w-max">
              產品寄送
            </Typography>
          </div>
          <div className="circle4 absolute w-5 h-5 -right-[10px] -top-[6px] bg-gray-dark rounded-full">
            {step > 2 && (
              <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="7.5" fill="#1CA69A" />
                <path
                  d="M4.5 8.5L6.5 10.5L11 6"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <Typography component="p" variant="caption" className="absolute -left-[5px] top-5 w-max">
              結案
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectProgress;
