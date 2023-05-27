import { Tab, Tabs } from '@mui/material';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@libraries/hooks/reduxHooks';
import { setUserTabsPage, selectTabs } from '../../../store/slices/tabsSlice';

const NavTabs: React.FC = () => {
  const { userTabs } = useAppSelector(selectTabs);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(setUserTabsPage(newValue));
  };

  return (
    <div className="mb-5 border-0 border-b border-solid border-secondary-10 pb-[0.2px]">
      <Tabs
        value={userTabs}
        onChange={handleChange}
        aria-label="nav tabs example"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        <Tab label="個人設定" href="/user/personal-settings" LinkComponent={Link} />
        <Tab label="贊助紀錄" href="/user/orders" LinkComponent={Link} />
        <Tab label="我的收藏" href="/user/collects" LinkComponent={Link} />
        <Tab disabled href="#" className="min-w-0 w-[1px] bg-secondary-30 p-0 mx-6 min-h-0 h-6 mt-3" />
        <Tab label="團隊設定" href="/user/team-settings" LinkComponent={Link} />
        <Tab label="提案管理" href="/user/projects" LinkComponent={Link} />
      </Tabs>
    </div>
  );
};

export default NavTabs;
