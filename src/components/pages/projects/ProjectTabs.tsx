import { Tab, Tabs, Badge, styled } from '@mui/material';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@libraries/hooks/reduxHooks';
import { setProjectTabsPage, selectTabs } from '../../../store/slices/tabsSlice';
import ProjectProgress from './ProjectProgress';
import clsxm from '@/libraries/utils/clsxm';
import { useEffect } from 'react';

interface ICusmtomTabProps {
  label: string;
  count: number;
  href: string;
  LinkComponent: any;
}

interface IProjectTabProps {
  projectId?: string;
  tabIndex?: number;
}

const CustomTab: React.FC<ICusmtomTabProps> = ({ label, count, ...props }) => (
  <Tab
    label={
      <div className="relative inline-block">
        {label}
        {count > 0 && (
          <Badge
            badgeContent={count}
            overlap="circular"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              color: '#1CA69A',
            }}
            className="absolute -top-1 -right-2"
          />
        )}
      </div>
    }
    {...props}
  />
);

const ProjectTabs: React.FC<IProjectTabProps> = ({ projectId, tabIndex }) => {
  const { projectTabs } = useAppSelector(selectTabs);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(setProjectTabsPage(newValue));
  };

  useEffect(() => {
    if (!tabIndex) return;
    dispatch(setProjectTabsPage(tabIndex));
  }, [tabIndex]);

  return (
    <div
      className={clsxm(
        'flex justify-between',
        'border-0 border-b border-solid border-secondary-10',
        'mb-10 pb-[0.2px]',
      )}
    >
      <Tabs
        value={projectTabs}
        onChange={handleChange}
        aria-label="nav projects tabs"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        <Tab label="專案介紹" href={`/projects/introduction/${projectId ? projectId : ''}`} LinkComponent={Link} />
        <CustomTab
          label="消息更新"
          href={`/projects/news/${projectId ? projectId : ''}`}
          LinkComponent={Link}
          count={3}
        />
        <CustomTab
          label="常見問題"
          href={`/projects/questions/${projectId ? projectId : ''}`}
          LinkComponent={Link}
          count={7}
        />
        <CustomTab
          label="留言"
          href={`/projects/msg-board/${projectId ? projectId : ''}`}
          LinkComponent={Link}
          count={1}
        />
      </Tabs>
      <ProjectProgress step={0} />
    </div>
  );
};

export default ProjectTabs;
