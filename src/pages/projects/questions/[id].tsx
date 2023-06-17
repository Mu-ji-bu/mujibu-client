import MujiAccordion from '@/components/block/mujiAccordion';
import ProjectsLayout from '@/components/layout/ProjectsLayout';
import Loading from '@/components/Loading';
import ProjectPlan from '@/components/pages/projects/ProjectPlan';
import useBreakpoints from '@/libraries/hooks/useBreakPoints';
import { useGetCarouselDataQuery } from '@/store/services/homeApi';
import { IProjectState } from '@/types/project';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface DetailsProps {
  project: IProjectState;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://mujibu-server-fau1.onrender.com/api/projects');
  const response = await res.json();
  const data: IProjectState[] = response.data;

  const paths = data.map((project) => {
    return {
      params: { id: project._id as string },
    };
  });

  return {
    paths: paths,
    fallback: false, // beyond the scope, id doesn't exist, go to 404
  };
};

export const getStaticProps: GetStaticProps<DetailsProps> = async (context) => {
  const id = context.params?.id;
  const res = await fetch(`https://mujibu-server-fau1.onrender.com/api/projects/${id}`);
  const response = await res.json();
  const data: IProjectState = response.data;

  return {
    props: { project: data },
  };
};

const questionArray = [
  {
    q: 'Q1',
    question: '還有其他周邊可以購買嗎？',
    answer:
      '除了進行群眾集資外，為確保演出可順利進行，瘋戲樂同步仍透過其他管道籌措資金，包含企業投資、政府補助等，請所有購買預售優惠、新劇周邊的朋友們安心，團隊並不會因為集資未達標就取消演出。我們希望的是，透過群眾集資找到更多觀眾，並凝聚支持我們、認同我們的人的力量，讓團隊與產業更健康地發展下去。',
    updateAt: '更新時間： 2023/03/10 10:00',
  },
  {
    q: 'Q2',
    question: '第一階段解鎖的「線上見面會」是什麼？',
    answer:
      '除了進行群眾集資外，為確保演出可順利進行，瘋戲樂同步仍透過其他管道籌措資金，包含企業投資、政府補助等，請所有購買預售優惠、新劇周邊的朋友們安心，團隊並不會因為集資未達標就取消演出。我們希望的是，透過群眾集資找到更多觀眾，並凝聚支持我們、認同我們的人的力量，讓團隊與產業更健康地發展下去。',
    updateAt: '更新時間： 2023/03/10 10:00',
  },
  {
    q: 'Q3',
    question: '什麼時候會正式啟售？',
    answer:
      '除了進行群眾集資外，為確保演出可順利進行，瘋戲樂同步仍透過其他管道籌措資金，包含企業投資、政府補助等，請所有購買預售優惠、新劇周邊的朋友們安心，團隊並不會因為集資未達標就取消演出。我們希望的是，透過群眾集資找到更多觀眾，並凝聚支持我們、認同我們的人的力量，讓團隊與產業更健康地發展下去。',
    updateAt: '更新時間： 2023/03/10 10:00',
  },
  {
    q: 'Q4',
    question: '本次計劃的發起團隊為何？',
    answer:
      '除了進行群眾集資外，為確保演出可順利進行，瘋戲樂同步仍透過其他管道籌措資金，包含企業投資、政府補助等，請所有購買預售優惠、新劇周邊的朋友們安心，團隊並不會因為集資未達標就取消演出。我們希望的是，透過群眾集資找到更多觀眾，並凝聚支持我們、認同我們的人的力量，讓團隊與產業更健康地發展下去。',
    updateAt: '更新時間： 2023/03/10 10:00',
  },
  {
    q: 'Q5',
    question: '我希望洽談大宗採購、或者其他合作事宜或者其他合作事宜或者其他合作事宜，可以與誰聯繫呢？',
    answer:
      '除了進行群眾集資外，為確保演出可順利進行，瘋戲樂同步仍透過其他管道籌措資金，包含企業投資、政府補助等，請所有購買預售優惠、新劇周邊的朋友們安心，團隊並不會因為集資未達標就取消演出。我們希望的是，透過群眾集資找到更多觀眾，並凝聚支持我們、認同我們的人的力量，讓團隊與產業更健康地發展下去。',
    updateAt: '更新時間： 2023/03/10 10:00',
  },
  {
    q: 'Q6',
    question:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt nostrum qui, adipisci quasi, velit dolor dolores et optio aperiam aspernatur facere laborum error animi vitae natus corporis exercitationem! Nam, unde!',
    answer:
      '除了進行群眾集資外，為確保演出可順利進行，瘋戲樂同步仍透過其他管道籌措資金，包含企業投資、政府補助等，請所有購買預售優惠、新劇周邊的朋友們安心，團隊並不會因為集資未達標就取消演出。我們希望的是，透過群眾集資找到更多觀眾，並凝聚支持我們、認同我們的人的力量，讓團隊與產業更健康地發展下去。',
    updateAt: '更新時間： 2023/03/10 10:00',
  },
  {
    q: 'Q7',
    question: 'What is Mujibu',
    answer:
      '儘管 Mujibu 團隊保持著神秘感，但他們的名字已經在創業和科技社群中傳開。許多人對他們的創新和潛力充滿期待，並且期待著他們能夠為世界帶來更多的改變和突破。',
    updateAt: '更新時間： 2023/03/10 10:00',
  },
];

const Questions = ({ project }: DetailsProps) => {
  const router = useRouter();
  const { data: carouselDataRes, isLoading } = useGetCarouselDataQuery();
  const { isSm, isMd, isLg, isXl, is2Xl } = useBreakpoints();

  const handleProjectPlanClick = (projectId: string, projectPlanId: string) => {
    console.log(`click on plan ${projectPlanId}`);
    // router.push(`/projects/select/`);
    router.push(`/projects/select/${projectId}?projectPlanId=${projectPlanId}`);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ProjectsLayout projectState={project} tabIndex={2}>
          <div className="details w-full flex justify-center gap-6">
            <div className="flex flex-col w-2/3 gap-8">
              <MujiAccordion {...questionArray[0]} />
              <MujiAccordion {...questionArray[1]} />
              <MujiAccordion {...questionArray[2]} />
              <MujiAccordion {...questionArray[3]} />
              <MujiAccordion {...questionArray[4]} />
              <MujiAccordion {...questionArray[5]} />
              <MujiAccordion {...questionArray[6]} />
            </div>
            {/* 右側方案 */}
            <div className="w-1/3 flex flex-col gap-6">
              {project.projectPlans?.map((plan, i) => (
                <ProjectPlan
                  key={i}
                  projectId={project._id || '0'}
                  projectPlan={plan}
                  handleProjectPlanClick={handleProjectPlanClick}
                />
              ))}
            </div>
          </div>
        </ProjectsLayout>
      )}
    </>
  );
};

export default Questions;
