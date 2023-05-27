import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@/components/block/card';
import Loading from '@/components/Loading';
import { useGetProjectDataQuery } from '@store/services/projectApi';

interface IProjectPlan {
  id: string;
  name: string;
  description: string;
  minimumAmount: number;
  maximumAmount: number;
  remaining: number;
  estimatedDelivery: string;
  discount?: number;
  earlyBirdEndDate?: string;
}

interface IProject {
  id: string;
  image: string;
  category: string;
  projectName: string;
  projectTeam: string;
  proposer: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  backers: number;
  prize: number;
  startTime: string;
  endTime: string;
  remainingTime: string;
  projectType: string; // 修改這裡的類型為字串
  plans: IProjectPlan[];
}

const Projects = () => {
  const isPC = useMediaQuery('(min-width:768px)'); // tailwind breakpoint md
  const { data, refetch } = useGetProjectDataQuery();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      await refetch();
      setisLoading(false);
    };

    fetchData();
  }, []);

  return (
    <main className="max-w-screen-xl mx-auto p-5">
      <div className="flex flex-wrap justify-between gap-4 px-4">
        {isLoading ? (
          <Loading />
        ) : (
          data?.data.projects.map((project: IProject) => (
            <div key={project.id} className="-mx-4 w-full md:w-1/2 lg:w-1/3">
              <Card isPC={isPC} {...project} />
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Projects;
