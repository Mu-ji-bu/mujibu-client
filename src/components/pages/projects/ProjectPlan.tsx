import Image from 'next/image';
import Link from 'next/link';
import PlanTag from '@/components/pages/projects/planTag';
import { Button, Typography } from '@mui/material';
import { IPlanState } from '@/types/plan';
import { useEffect, useState } from 'react';
import { string } from 'yup';
import clsxm from '@/libraries/utils/clsxm';

interface IProjectPlanProps {
  projectId: string;
  handleProjectPlanClick: Function;
  projectPlan: IPlanState;
  isSelectPage?: boolean;
  isSelecting?: boolean;
  handleSelect?: Function;
}

const ProjectPlan: React.FC<IProjectPlanProps> = ({
  projectId,
  projectPlan,
  handleProjectPlanClick,
  isSelectPage,
  isSelecting,
  handleSelect,
}) => {
  const {
    _id,
    planName,
    planType,
    planDiscountPrice,
    planOriginalPrice,
    planImage,
    planQuantity,
    planStartTime,
    planEndTime,
    planDescription,
    planNotes,
    planOrders,
    planBackers,
    otherNotes,
  } = projectPlan;

  const [remainingTime, setRemainingTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    if (planEndTime) {
      console.log('running in ProjectPlan', planEndTime);
      const timer = setInterval(() => {
        setRemainingTime(getRemainingTime(new Date(planEndTime)));
        // setRemainingTime(getRemainingTime(planEndTime as Date));
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [planEndTime]);

  useEffect(() => {
    setIsSelected(isSelecting as boolean);
  }, [isSelecting]);

  function getRemainingTime(endT: Date) {
    const now = new Date();
    const endTime = endT;
    const timeDiff = Math.max(endTime.getTime() - now.getTime(), 0);

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={clsxm(
        'plan p-6',
        'border border-solid border-secondary-10 rounded-xl',
        isSelected ? 'border-green-accent' : 'hover:border-green-accent',
      )}
      onClick={() => {
        handleSelect && handleSelect(_id);
      }}
    >
      <Image
        src={planImage || '/project/Desktop_Project_plan1.png'}
        alt="project1"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
      />
      <div className="plan-description mt-5">
        <div className="primary-info flex justify-between mb-4">
          <PlanTag text={planType || '超早鳥限時優惠'} color="green" />
          <div className="remaining-time">
            <Typography component="span" variant="caption" className="text-secondary-66">
              剩餘時間
            </Typography>
            <Typography component="span" variant="caption" className="text-secondary-66">
              {remainingTime?.days}
            </Typography>
            <Typography component="span" variant="caption" className="text-secondary-66">
              d&nbsp;
            </Typography>
            <Typography component="span" variant="caption" className="text-secondary-66">
              {remainingTime?.hours}
            </Typography>
            <Typography component="span" variant="caption" className="text-secondary-66">
              h&nbsp;
            </Typography>
            <Typography component="span" variant="caption" className="text-secondary-66">
              {remainingTime?.minutes}
            </Typography>
            <Typography component="span" variant="caption" className="text-secondary-66">
              m&nbsp;
            </Typography>
            <Typography component="span" variant="caption" className="text-secondary-66">
              {remainingTime?.seconds}
            </Typography>
            <Typography component="span" variant="caption" className="text-secondary-66">
              s
            </Typography>
          </div>
        </div>
        <Typography component="h4" variant="h4" className="text-secondary mb-2">
          ${planName}
        </Typography>
        <Typography component="h3" variant="h3" className="text-primary">
          ${planDiscountPrice}
        </Typography>
        <Typography component="p" variant="caption" className="future-prize my-3 text-secondary">
          {`未來售價 $${planOriginalPrice} 現省 $${planOriginalPrice - planDiscountPrice}`}
        </Typography>
        <Typography component="p" variant="caption" className="plan-desc text-secondary-66">
          {planDescription}
        </Typography>
        <ul className="my-3">
          {otherNotes?.map((note, i) => (
            <li key={i} className="-ml-6 text-secondary-66">
              <Typography component="p" variant="caption" className="plan-desc">
                {note}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
      <div className="plan-tags flex gap-3">
        <PlanTag text={`已有 ${planBackers || 72} 人支持`} color="gray" />
        <PlanTag text={`限量 ${planQuantity} 組`} color="gray" />
      </div>
      {isSelectPage ? null : (
        <Button
          variant="contained"
          fullWidth
          size="large"
          className="mt-5"
          onClick={() => handleProjectPlanClick(projectId, _id)}
        >
          贊助此方案
        </Button>
      )}
    </div>
  );
};

export default ProjectPlan;
