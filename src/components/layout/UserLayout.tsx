import UserAvatar from '../block/user/UserAvatar';
import NavTabs from '../block/user/NavTabs';
import { ReactNode } from 'react';

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-5 py-10">
        <UserAvatar />
        <NavTabs />
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
