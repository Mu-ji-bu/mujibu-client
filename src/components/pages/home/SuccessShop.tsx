import Card from '@/components/block/card';
import { CardWidth } from '@/components/types/enum';
import useBreakpoints from '@/libraries/hooks/useBreakPoints';
import clsxm from '@/libraries/utils/clsxm';
import { IProjectState } from '@/types/project';

interface ISuccessShopProps {
  projectData: IProjectState[];
}

const SuccessShop: React.FC<ISuccessShopProps> = ({ ...props }) => {
  const { projectData } = props;

  const { isSm, isMd, isLg, isXl, is2Xl } = useBreakpoints();

  if (!projectData) return null;

  return (
    <div className="w-screen flex-col items-center px-5">
      {is2Xl ? (
        <>
          <div className="flex justify-center gap-6">
            {projectData.slice(0, 3).map((project, i) => (
              <div key={i}>
                <Card isPC={true} {...project} />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-6">
            {projectData.slice(3, 7).map((project, i) => (
              <div key={i}>
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
                <div key={i}>
                  <Card isPC={true} {...project} />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-6">
              {projectData.slice(2, 4).map((project, i) => (
                <div key={i}>
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
              {projectData &&
                projectData.slice(0, 3).map((project, i) => (
                  <div key={i} className={clsxm(i > 0 ? 'mt-6' : null)}>
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
