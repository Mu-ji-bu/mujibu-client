import ProjectPlan from '@/components/pages/projects/ProjectPlan';
import Image from 'next/image';
import { projectCategoryEnum } from '@/libraries/enum';
import { IProjectState } from '@/types/project';
import { Button, IconButton, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { use, useEffect, useMemo, useState } from 'react';
import clsxm from '@/libraries/utils/clsxm';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { IPlanState } from '@/types/plan';
import PaymentForm from '@/components/pages/select/PaymentForm';
import { useGetProjectByIdQuery } from '@/store/services/projectApi';
import Seo from '@/components/Seo';

// interface DetailsProps {
//   project: IProjectState;
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch('https://mujibu-server-fau1.onrender.com/api/projects');
//   const response = await res.json();
//   const data: IProjectState[] = response.data;

//   const paths = data.map((project) => {
//     return {
//       params: { id: project._id as string },
//     };
//   });

//   return {
//     paths: paths,
//     fallback: false, // beyond the scope, id doesn't exist, go to 404
//   };
// };

// export const getStaticProps: GetStaticProps<DetailsProps> = async (context) => {
//   const id = context.params?.id;
//   const res = await fetch(`https://mujibu-server-fau1.onrender.com/api/projects/${id}`);
//   const response = await res.json();
//   const data: IProjectState = response.data;

//   return {
//     props: { project: data },
//   };
// };

// const ProjectSelectPage = ({ project }: DetailsProps) => {
const ProjectSelectPage = () => {
  const router = useRouter();
  const { id: projectId } = router.query;
  const { data, isLoading, error, refetch } = useGetProjectByIdQuery(projectId);

  const project = useMemo((): IProjectState => data?.data || [], [data?.data]);
  const {
    _id,
    projectType,
    projectForm,
    projectStatus,
    projectCategory,
    projectName,
    projectImage,
    projectDescription,
    goalAmount,
    currentAmount,
    currentAmountPercentage,
    startTime,
    endTime,
    officialPage,
    fanPage,
    attachmentLink,
    projectContent,
    projectTeam,
    projectProposer,
    projectFollowers,
    projectBackers,
    createdAt,
    updatedAt,
  } = project;
  const [projectPlanId, setProjectPlanId] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<IPlanState[]>([]);
  const [count, setCount] = useState(1);
  const [prize, setPrize] = useState(0);
  let shippingFee = 10;

  const addCount = () => {
    setCount((prev) => {
      return prev + 1;
    });
  };
  const minusCount = () => {
    setCount((prev) => {
      return prev - 1 >= 0 ? prev - 1 : 0;
    });
  };

  const updatePrize = () => {
    if (!selectedPlan) {
      setPrize(0);
      return;
    }
    setPrize(Number(selectedPlan[0]?.planDiscountPrice) * count + shippingFee);
  };

  useEffect(() => {
    updatePrize();
  }, [count, selectedPlan]);

  useEffect(() => {
    if (!router.query.projectPlanId) return;
    // 取得 projectPlanId 參數的值
    setProjectPlanId(router.query.projectPlanId as string);

    // 移除網址中的 projectPlanId 參數
    const urlWithoutParam = window.location.href.replace(`?projectPlanId=${projectPlanId}`, '');

    // 使用 replaceState 方法修改網址，不會產生新的歷史紀錄
    window.history.replaceState({}, '', urlWithoutParam);
  }, [router.query]);

  useEffect(() => {
    let selectedPlan =
      project.projectPlans &&
      project.projectPlans.filter((plan) => {
        return plan._id === projectPlanId;
      });
    setSelectedPlan(selectedPlan as IPlanState[]);
  }, [project.projectPlans, projectPlanId]);

  const handleProjectPlanClick = (projectId: string, projectPlanId: string) => {
    console.log(`click on plan ${projectPlanId}`);
    router.push(`/projects/select/${projectId}?projectPlanId=${projectPlanId}`);
  };

  const handleSelect = (planId: string) => {
    setProjectPlanId(planId);
  };

  return (
    <div>
      <Seo templateTitle="選擇方案" />
      <div className="select-top bg-gray-light">
        <div className="max-w-screen-xl mx-auto px-10">
          <div className="project-category py-5">
            <Typography component="span" variant="h6">
              Home
            </Typography>
            <Typography component="span" variant="h6" className="px-3">
              \
            </Typography>
            <Typography component="span" variant="h6">
              募資專案
            </Typography>
            <Typography component="span" variant="h6" className="px-3">
              \
            </Typography>
            <Typography component="span" variant="h6" className="text-primary">
              {projectCategoryEnum[projectCategory as keyof typeof projectCategoryEnum]}
            </Typography>
          </div>
          <div className="project-main py-8">
            <div className="details w-full flex justify-center gap-6">
              <div className="flex flex-col w-1/3">
                <Image
                  src={projectImage || '/project/Desktop_Project_kv.png'}
                  alt="project1"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
              <div className="w-2/3">
                <Typography component="h3" variant="h3" className="text-secondary mb-5">
                  {projectDescription}
                </Typography>
                <Typography component="span" variant="body16" className="text-secondary-66 mr-1">
                  提案者
                </Typography>
                <Typography component="span" variant="body16" className="text-primary">
                  {projectTeam?.teamName || '沒有團隊名稱'}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="select-bottom">
        <div className="details max-w-screen-xl mx-auto px-10 py-[60px]">
          {!projectPlanId && (
            <Typography component="h4" variant="h4" className="text-secondary pb-10">
              請選擇贊助方案：
            </Typography>
          )}
          <div className="flex gap-6">
            <div className="flex flex-wrap w-[816px] gap-8">
              {project.projectPlans?.map((plan, i) => (
                <div key={i} className="w-[392px]">
                  <ProjectPlan
                    projectId={project._id || '0'}
                    projectPlan={plan}
                    handleProjectPlanClick={handleProjectPlanClick}
                    isSelectPage={true}
                    isSelecting={plan._id === projectPlanId ? true : false}
                    handleSelect={handleSelect}
                  />
                </div>
              ))}
            </div>
            <div
              className={clsxm(
                'plan p-6 w-[360px] h-fit',
                'flex flex-col gap-5',
                'border border-solid border-secondary-10 rounded-xl',
              )}
            >
              {!projectPlanId && (
                <Typography component="h5" variant="h5" className="text-secondary">
                  請先選擇要贊助的方案：
                </Typography>
              )}
              {selectedPlan?.length > 0 && (
                <Typography component="h3" variant="h3" className="text-secondary mb-5">
                  {selectedPlan[0]?.planName}
                </Typography>
              )}
              <div className="quantity flex justify-between items-center">
                <Typography component="span" variant="body16" className="text-secondary-66">
                  數量
                </Typography>
                <div
                  className={clsxm(
                    'counter flex items-center gap-5',
                    'border border-solid border-secondary-10 rounded-sm',
                    !selectedPlan?.length ? 'bg-secondary-10 border-secondary-10' : '',
                  )}
                >
                  <div
                    className={clsxm(
                      'minus',
                      'border-solid border-0 border-r border-secondary-10',
                      !selectedPlan?.length ? 'border-secondary-10' : '',
                    )}
                  >
                    <IconButton
                      disabled={!selectedPlan?.length}
                      aria-label="minus"
                      color="secondary"
                      size="large"
                      onClick={minusCount}
                      className={clsxm('text-secondary', !selectedPlan?.length ? 'text-secondary-30' : '')}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </div>
                  <Typography
                    component="h5"
                    variant="h5"
                    className={clsxm(
                      'count w-[60px] flex justify-center items-center text-secondary',
                      !selectedPlan?.length ? 'text-secondary-30' : '',
                    )}
                  >
                    {count}
                  </Typography>
                  <div
                    className={clsxm(
                      'plus',
                      'border-solid border-0 border-r border-secondary-10',
                      !selectedPlan?.length ? 'border-secondary-10' : '',
                    )}
                  >
                    <IconButton
                      disabled={!selectedPlan?.length}
                      aria-label="plus"
                      color="secondary"
                      size="large"
                      onClick={addCount}
                      className={clsxm('text-secondary', !selectedPlan?.length ? 'text-secondary-30' : '')}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
              <div className="plan-prize">
                <Typography component="h6" variant="h6" className="text-secondary-66">
                  方案單價
                </Typography>
                <div className="money flex justify-between items-center mt-2">
                  <Typography component="h4" variant="h4" className="text-primary">
                    NT$
                  </Typography>
                  <Typography component="h4" variant="h4" className="text-primary">
                    {selectedPlan?.length > 0 ? selectedPlan[0]?.planDiscountPrice.toString() : '-'}
                  </Typography>
                </div>
              </div>
              <div className="shipping-fee">
                <Typography component="h6" variant="h6" className="text-secondary-66">
                  運費
                </Typography>
                <div className="money flex justify-between items-center mt-2">
                  <Typography component="h4" variant="h4" className="text-primary">
                    NT$
                  </Typography>
                  <Typography component="h4" variant="h4" className="text-primary">
                    {selectedPlan?.length > 0 ? shippingFee.toString() : '-'}
                  </Typography>
                </div>
              </div>
              <div className="total-amount">
                <Typography component="h6" variant="h6" className="text-secondary-66">
                  總金額
                </Typography>
                <div className="money flex justify-between items-center mt-2">
                  <Typography component="h4" variant="h4" className="text-primary">
                    NT$
                  </Typography>
                  <Typography component="h4" variant="h4" className="text-primary">
                    {count > 0 && selectedPlan?.length > 0 ? prize.toString() : '-'}
                  </Typography>
                </div>
              </div>
              {count > 0 && selectedPlan?.length > 0 ? (
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  className="mt-3"
                  onClick={() => console.log('結帳！')}
                >
                  前往結帳
                </Button>
              ) : (
                <Button variant="contained" fullWidth disabled color="secondary" size="large" className="mt-3">
                  前往結帳
                </Button>
              )}
              <PaymentForm prize={prize} isDisabled={!selectedPlan?.length} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSelectPage;
