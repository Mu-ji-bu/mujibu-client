import ProjectTabs from '../block/projects/ProjectTabs';
import { ReactNode } from 'react';

const ProjectsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-10 py-10">
        <ProjectTabs />
        {children}
      </div>
    </div>
  );
};

export default ProjectsLayout;
