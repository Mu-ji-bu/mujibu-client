import Image from 'next/image';
import Link from 'next/link';
import PlanTag from '@/components/pages/projects/planTag';
import { Button, Typography } from '@mui/material';

const ProjectPlan = () => {
  return (
    <div className="plan p-6 border border-solid border-secondary-10 rounded-xl">
      <Image
        src={'/project/Desktop_Project_plan1.png'}
        alt="project1"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
      />
      <div className="plan-description mt-5">
        <div className="primary-info flex justify-between mb-4">
          <PlanTag text="超早鳥限時優惠" color="green" />
          <div className="remaining-time">
            <Typography component="span" variant="caption" className="text-secondary-66">
              剩餘時間
            </Typography>
            <Typography component="span" variant="caption" className="text-secondary-66">
              1
            </Typography>
            <Typography component="span" variant="caption" className="text-secondary-66">
              d&nbsp;
            </Typography>
            <Typography component="span" variant="caption" className="text-secondary-66">
              13
            </Typography>
            <Typography component="span" variant="caption" className="text-secondary-66">
              h&nbsp;
            </Typography>
            <Typography component="span" variant="caption" className="text-secondary-66">
              55
            </Typography>
            <Typography component="span" variant="caption" className="text-secondary-66">
              m&nbsp;
            </Typography>
            <Typography component="span" variant="caption" className="text-secondary-66">
              55
            </Typography>
            <Typography component="span" variant="caption" className="text-secondary-66">
              s
            </Typography>
          </div>
        </div>
        <Typography component="h4" variant="h4" className="text-secondary mb-2">
          超薄可折疊筆記電腦套組
        </Typography>
        <Typography component="h3" variant="h3" className="text-primary">
          NT$13000
        </Typography>
        <Typography component="p" variant="caption" className="future-prize my-3 text-secondary">
          未來售價 $53,000 現省 $40,000
        </Typography>
        <Typography component="p" variant="caption" className="plan-desc text-secondary-66">
          這款超薄可折疊筆記電腦套組提供了高效的處理器和充足的存儲空間，讓您能夠在不同的場景中輕鬆地進行多任務處理。
        </Typography>
        <ul className="my-3">
          <li className="-ml-6 text-secondary-66">
            <Typography component="p" variant="caption" className="plan-desc">
              內容物： 超薄可折疊筆記電腦本體x1，充電器x1，保護套x1，筆記本鼠標x1，使用說明書x1
            </Typography>
          </li>
          <li className="-ml-6 text-secondary-66">
            <Typography component="p" variant="caption" className="plan-desc">
              贈送市值2000元螢幕保護膜
            </Typography>
          </li>
        </ul>
      </div>
      <div className="plan-tags flex gap-3">
        <PlanTag text="已有 72 人支持" color="gray" />
        <PlanTag text="限量 200 組" color="gray" />
      </div>
      <Button variant="contained" fullWidth size="large" className="mt-5">
        贊助此方案
      </Button>
    </div>
  );
};

export default ProjectPlan;
