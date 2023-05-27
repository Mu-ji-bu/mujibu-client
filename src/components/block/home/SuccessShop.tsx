import Card from '@/components/block/card';
import useBreakpoints from '@/libraries/hooks/useBreakPoints';
import clsxm from '@/libraries/utils/clsxm';
import { ReactNode } from 'react';

interface ISuccessShopProps {
  projectData: { id: number; projectType: number; projectName: string }[];
}

const SuccessShop: React.FC<ISuccessShopProps> = ({ ...props }) => {
  const { projectData } = props;

  const { isSm, isMd, isLg, isXl, is2Xl } = useBreakpoints();

  return (
    <div className="w-screen flex-col items-center">
      {is2Xl ? (
        <>
          <div className="flex justify-center gap-6">
            {projectData.slice(0, 3).map((project, i) => (
              <div key={project.id}>
                <Card isPC={true} {...project} />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-6">
            {projectData.slice(3, 7).map((project) => (
              <div key={project.id}>
                <Card isPC={true} {...project} />
              </div>
            ))}
          </div>
        </>
      ) : isXl || isLg ? (
        <div>
          {' '}
          <>
            <div className="flex justify-center gap-6">
              {projectData.slice(0, 2).map((project, i) => (
                <div key={project.id}>
                  <Card isPC={true} {...project} />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-6">
              {projectData.slice(2, 4).map((project) => (
                <div key={project.id}>
                  <Card isPC={true} {...project} />
                </div>
              ))}
            </div>
          </>
        </div>
      ) : (
        <div>
          <>
            <div className="flex-col items-center">
              {projectData.slice(0, 3).map((project, i) => (
                <div key={project.id} className={clsxm(i > 0 ? 'mt-6' : null)}>
                  <Card isPC={true} {...project} />
                </div>
              ))}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default SuccessShop;
