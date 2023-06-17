import { IProjectState } from '@/types/project';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

const ProjectSelectPage = ({ project }: DetailsProps) => {
  const router = useRouter();
  const [projectPlanId, setProjectPlanId] = useState('');

  useEffect(() => {
    // 取得 projectPlanId 參數的值
    setProjectPlanId(router.query.projectPlanId as string);

    // 移除網址中的 projectPlanId 參數
    const urlWithoutParam = window.location.href.replace(`?projectPlanId=${projectPlanId}`, '');

    // 使用 replaceState 方法修改網址，不會產生新的歷史紀錄
    window.history.replaceState({}, '', urlWithoutParam);
  }, [projectPlanId, router.query.projectPlanId]);

  return (
    <div>
      <h1>Project Select Page</h1>
      <p>Clicked projectPlan ID: {projectPlanId}</p>
    </div>
  );
};

export default ProjectSelectPage;
