import { Loop } from '@mui/icons-material';

const Loading = ({ className = null }) => {
  return (
    <div className={`rotating-icon-wrapper ${className}`}>
      <Loop className="rotating-icon" />
    </div>
  );
};

export default Loading;
