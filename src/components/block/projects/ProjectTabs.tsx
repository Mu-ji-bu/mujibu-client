import { Tab, Tabs, Badge, styled } from '@mui/material';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@libraries/hooks/reduxHooks';
import { setProjectTabsPage, selectTabs } from '../../../store/slices/tabsSlice';
import ProjectProgress from './ProjectProgress';
import clsxm from '@/libraries/utils/clsxm';

interface ICusmtomTabProps {
  label: string;
  count: number;
  href: string;
  LinkComponent: any;
}

const CustomTab: React.FC<ICusmtomTabProps> = ({ label, count, ...props }) => (
  <Tab
    label={
      <div className="relative inline-block">
        {label}
        {count > 0 && (
          <Badge
            color="primary"
            badgeContent={count}
            overlap="circular"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            className="absolute -top-0.5 -right-1"
          />
        )}
      </div>
    }
    {...props}
  />
);

const ProjectTabs: React.FC = () => {
  const { projectTabs } = useAppSelector(selectTabs);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(setProjectTabsPage(newValue));
  };

  return (
    <div
      className={clsxm('flex justify-between', 'border-0 border-b border-solid border-secondary-10', 'mb-5 pb-[0.2px]')}
    >
      <Tabs
        value={projectTabs}
        onChange={handleChange}
        aria-label="nav projects tabs"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        <Tab label="專案介紹" href="/projects/introduction" LinkComponent={Link} />
        <CustomTab label="消息更新" href="/projects/news" LinkComponent={Link} count={3} />
        <CustomTab label="常見問題" href="/projects/questions" LinkComponent={Link} count={7} />
        <CustomTab label="留言" href="/projects/msg-board" LinkComponent={Link} count={1} />
      </Tabs>
      <ProjectProgress />
    </div>
  );
};

export default ProjectTabs;
