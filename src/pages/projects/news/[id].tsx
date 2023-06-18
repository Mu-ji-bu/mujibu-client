import ProjectsLayout from '@/components/layout/ProjectsLayout';
import Loading from '@/components/Loading';
import Message from '@/components/pages/projects/message';
import ProjectPlan from '@/components/pages/projects/ProjectPlan';
import Seo from '@/components/Seo';
import useBreakpoints from '@/libraries/hooks/useBreakPoints';
import { useGetCarouselDataQuery } from '@/store/services/homeApi';
import { useGetProjectByIdQuery } from '@/store/services/projectApi';
import { IProjectState } from '@/types/project';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

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

// const News = ({ project }: DetailsProps) => {
const News = () => {
  const router = useRouter();
  const { id: projectId } = router.query;
  const { data, isLoading } = useGetProjectByIdQuery(projectId);

  const project = useMemo((): IProjectState => data?.data || [], [data?.data]);
  const handleProjectPlanClick = (projectId: string, projectPlanId: string) => {
    console.log(`click on plan ${projectPlanId}`);
    // router.push(`/projects/select/`);
    router.push(`/projects/select/${projectId}?projectPlanId=${projectPlanId}`);
  };
  const message1 = {
    text: 'Mujibu 是一個神秘而傳奇的募資網站新創團隊，他們的存在引起了廣大眾人的好奇和談論。雖然他們的團隊成員身分未知，但他們以匿名的方式在網路上展示著他們的才華和創新。Mujibu 團隊以其獨特的技術和創意著稱，他們開發出一個引人注目且具有革命性的募資平台，為各種有潛力的創意和項目提供支持。透過他們的平台，創業家和創作者能夠向廣大的投資者群眾展示他們的想法並籌集資金，從而實現他們的夢想。儘管 Mujibu 團隊保持著神秘感，但他們的名字已經在創業和科技社群中傳開。許多人對他們的創新和潛力充滿期待，並且期待著他們能夠為世界帶來更多的改變和突破。',
    time: '2023/03/10 10:00',
    title: '標題標題好眠城實木床組配送進度通知',
  };
  const message2 = {
    text: 'Mujibu 是一個神秘而傳奇的募資網站新創團隊，他們的存在引起了廣大眾人的好奇和談論。雖然他們的團隊成員身分未知，但他們以匿名的方式在網路上展示著他們的才華和創新。Mujibu 團隊以其獨特的技術和創意著稱，他們開發出一個引人注目且具有革命性的募資平台，為各種有潛力的創意和項目提供支持。透過他們的平台，創業家和創作者能夠向廣大的投資者群眾展示他們的想法並籌集資金，從而實現他們的夢想。',
    time: '2023/03/10 10:00',
    title: '標題標題好眠城實木床組配送進度通知',
  };
  const message3 = {
    text: 'Mujibu 是一個神秘而傳奇的募資網站新創團隊，他們的存在引起了廣大眾人的好奇和談論。雖然他們的團隊成員身分未知，但他們以匿名的方式在網路上展示著他們的才華和創新。Mujibu 團隊以其獨特的技術和創意著稱，他們開發出一個引人注目且具有革命性的募資平台，為各種有潛力的創意和項目提供支持。透過他們的平台，創業家和創作者能夠向廣大的投資者群眾展示他們的想法並籌集資金，從而實現他們的夢想。',
    time: '2023/03/10 10:00',
    title: '標題標題好眠城實木床組配送進度通知',
  };

  return (
    <>
      <Seo templateTitle="最新消息" />
      {isLoading ? (
        <Loading />
      ) : (
        <ProjectsLayout projectState={project} tabIndex={1}>
          <div className="details w-full flex justify-center gap-6">
            <div className="flex flex-col w-2/3 gap-8">
              <Message {...message1} />
              <Message {...message2} />
              <Message {...message3} />
            </div>
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

export default News;
