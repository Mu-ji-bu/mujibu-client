import clsxm from '@/libraries/utils/clsxm';
import { Typography } from '@mui/material';

interface ITagProps {
  text: string;
  color: string;
}
const PlanTag: React.FC<ITagProps> = (props) => {
  const { text, color } = props;

  return (
    <div
      className={clsxm(
        'tag w-fit px-2 py-1 rounded-md',
        color === 'green' ? 'bg-green-accent-10 text-primary' : 'bg-secondary-10 text-secondary-66',
      )}
    >
      <Typography component="p" variant="caption">
        {text}
      </Typography>
    </div>
  );
};

export default PlanTag;
