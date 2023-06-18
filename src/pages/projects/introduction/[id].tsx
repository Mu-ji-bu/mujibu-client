import { Key, useEffect, useMemo, useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '@/libraries/hooks/reduxHooks';
import { wrapper } from '@/store/store';

import DOMPurify from 'isomorphic-dompurify';
import he from 'he';
import Loading from '@/components/Loading';

import { Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import { IPlanState } from '@/types/plan';
import { IProjectState } from '@/types/project';

import { useGetCarouselDataQuery } from '@/store/services/homeApi';
import { useGetProjectByIdQuery, getRunningQueriesThunk, getProjectById } from '@/store/services/projectApi';
import { selectUser } from '@/store/slices/userSlice';
import { usePostUserCollectMutation } from '@/store/services/userApi';

import ProjectPlan from '@/components/pages/projects/ProjectPlan';
import ProjectsLayout from '@/components/layout/ProjectsLayout';
import useBreakpoints from '@/libraries/hooks/useBreakPoints';

interface DetailsProps {
  project: IProjectState;
}

const getBackendText = (text: string) => {
  let pattern = /<img\b((?![^>]*style=)[^>]*)>/gi;
  let modifiedText = text.replace(pattern, '<img $1 style="width: 100%">');

  return modifiedText;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { id } = context.query;
  console.log('id', id);
  if (typeof id === 'string') {
    store.dispatch(getProjectById.initiate(id));
  }
  const [res] = await Promise.all(store.dispatch(getRunningQueriesThunk()));
  console.log(res);
  return {
    props: {
      project: (res.data as { status: string; data: IProjectState }).data,
    },
  };
});

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

const Introduction = ({ project }: DetailsProps) => {
  const router = useRouter();
  const { id: projectId } = router.query;
  const { data, isLoading } = useGetProjectByIdQuery(projectId);

  // const project = useMemo((): IProjectState => data?.data || [], [data?.data]);
  const user = useAppSelector(selectUser);
  const userId = user._id;
  const [followed, setFollowed] = useState(false);

  const [postUserCollect, { isLoading: postUserCollectLoading }] = usePostUserCollectMutation();

  const handleFollow = async () => {
    if (!userId) {
      return alert('請登入');
    }
    await postUserCollect({ userId, projectId }).then((res: any) => {
      try {
        if (res?.data.status === 'Success') {
          setFollowed(true);
        }
      } catch (err) {
        alert('已新增');
      }
    });
  };
  const { isSm, isMd, isLg, isXl, is2Xl } = useBreakpoints();
  const [sample, setSample] = useState('');

  const handleProjectPlanClick = (projectId: string, projectPlanId: string) => {
    router.push(`/projects/select/${projectId}?projectPlanId=${projectPlanId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/sampleContent2.json'); // 請根據你的實際路徑修改這裡
        const jsonData = await response.json();
        setSample(jsonData.data);
      } catch (error) {
        console.error('Error fetching sample:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading && !project ? (
        <Loading />
      ) : (
        <ProjectsLayout projectState={project} tabIndex={0} followed={followed} handleFollow={handleFollow}>
          <div className="details w-full flex justify-center gap-6">
            <div className="flex flex-col w-2/3">
              {project &&
                ((project?.latestNews as string[]) || []).map((news, i) => (
                  <div key={i} className="news mb-5 h-16 flex items-center bg-gray-light pl-5 rounded-lg">
                    <span aria-label="homepage" className="text-secondary-66 flex items-center">
                      <VolumeUpIcon fontSize="small" />
                    </span>
                    <Typography component="span" variant="body16" className="mr-3">
                      最新消息
                    </Typography>
                    <Typography component="span" variant="body16" className="text-secondary-66">
                      {news}
                    </Typography>
                  </div>
                ))}
              <div className="desc p-5 bg-green-accent-10 rounded-lg border border-solid border-green-accent">
                <Typography component="p" variant="body20" className="text-primary">
                  {project?.projectDescription}
                </Typography>
              </div>
              {/* 左側編輯器 */}
              <BackendHtmlComponent htmlString={(project?.projectContent as string) || sample} />
            </div>
            {/* 右側方案 */}
            <div className="w-1/3 flex flex-col gap-6">
              {project?.projectPlans?.map((plan: IPlanState, i: Key | null | undefined) => (
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

const BackendHtmlComponent: React.FC<{ htmlString: string }> = ({ htmlString }) => {
  const decodedHtml = he.decode(htmlString);
  const imgModifiedHtml = getBackendText(decodedHtml);
  const sanitizedHtml = DOMPurify.sanitize(imgModifiedHtml);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default Introduction;
