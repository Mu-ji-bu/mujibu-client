import { Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';

interface ProposalStep6Props {
  setValue?: any;
  postProposalLoading?: boolean;
  proposalSuccess?: boolean;
}
const ProposalStep6: React.FC<ProposalStep6Props> = ({ setValue, postProposalLoading, proposalSuccess }) => {
  return (
    <div className="py-20 px-5 md:px-20  bg-white w-full rounded-md md:border md:border-solid md:border-secondary-10">
      {postProposalLoading && (
        <>
          {' '}
          <div className="flex items-center justify-center mb-5">
            <div className="animate-spin bg-primary rounded-full text-white h-32 w-32 flex items-center justify-center">
              <LoopRoundedIcon sx={{ fontSize: 70 }} />
            </div>
          </div>{' '}
          <Typography className="text-secondary mb-2 text-center" component="h3" variant="h6">
            送出中
          </Typography>
          <Typography className="text-secondary-66 mb-5 md:mb-10 text-center" component="p" variant="caption">
            Sending...
          </Typography>
        </>
      )}

      {!postProposalLoading &&
        (!proposalSuccess ? (
          <>
            <div className="flex items-center justify-center mb-5">
              <div className="bg-primary rounded-full text-white h-32 w-32 flex items-center justify-center">
                <CloseRoundedIcon sx={{ fontSize: 70 }} />
              </div>
            </div>

            <Typography className="text-secondary mb-2 text-center" component="h3" variant="h6">
              送出失敗
            </Typography>

            <Typography className="text-secondary-66 mb-5 md:mb-10 text-center" component="p" variant="caption">
              請回前頁修改表單
            </Typography>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center mb-5">
              <svg width="128" height="128" viewBox="0 0 117 117" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="58.5" cy="58.5" r="58.5" fill="#1CA69A" />
                <path
                  d="M58.292 45.9215L52.4218 43.1056C52.1627 42.9812 51.8789 42.9167 51.5914 42.9167H46.5363C46.0409 42.9167 45.5646 43.1082 45.2071 43.4512L40.0911 48.3596C39.7137 48.7217 39.5003 49.2221 39.5003 49.7451V68.9093C39.5003 69.5641 39.8341 70.1739 40.3858 70.5267L57.133 81.2385C57.8259 81.6817 58.7241 81.6343 59.3665 81.1207L73.6925 70.5267M80.5003 73.9778V50.2498C80.5003 49.5296 80.0973 48.87 79.4565 48.5414L68.9017 43.1283C68.6305 42.9892 68.3302 42.9167 68.0255 42.9167H63.1923C62.7349 42.9167 62.2925 43.08 61.9448 43.3772L46.025 56.9847C45.1814 57.7058 45.123 58.9899 45.8978 59.7845L49.4258 63.4032C50.0408 64.0341 51.0063 64.1654 51.7675 63.7216L62.1826 57.6501C63.0336 57.154 64.122 57.3824 64.7018 58.1787L77.0282 75.108C78.1224 76.6107 80.5003 75.8368 80.5003 73.9778ZM22.917 73.6667H32.167C32.4431 73.6667 32.667 73.4428 32.667 73.1667V43.4167C32.667 43.1405 32.4431 42.9167 32.167 42.9167H22.917C22.6408 42.9167 22.417 43.1405 22.417 43.4167V73.1667C22.417 73.4428 22.6408 73.6667 22.917 73.6667ZM87.8337 73.6667H97.0837C97.3598 73.6667 97.5837 73.4428 97.5837 73.1667V43.4167C97.5837 43.1405 97.3598 42.9167 97.0837 42.9167H87.8337C87.5575 42.9167 87.3337 43.1405 87.3337 43.4167V73.1667C87.3337 73.4428 87.5575 73.6667 87.8337 73.6667Z"
                  stroke="white"
                  strokeWidth="3"
                />
              </svg>
            </div>
            <Typography className="text-secondary mb-2 text-center" component="h3" variant="h6">
              提案已送出完成
            </Typography>
            <Typography className="text-secondary-66 mb-5 md:mb-10 text-center" component="p" variant="caption">
              待審核通過後會在個人中心通知您。
            </Typography>
          </>
        ))}
    </div>
  );
};

export default ProposalStep6;
