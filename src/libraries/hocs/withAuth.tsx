import { useEffect } from 'react';
import { useRouter } from 'next/router';
import routePath from '@routes/routePath';
import Cookies from 'js-cookie';

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const WrappedComponent = (props: P) => {
    const router = useRouter();
    const currentPath = router.pathname;

    useEffect(() => {
      const isAuthenticated = Cookies.get('googleToken');

      // 需判斷登入驗證的路由
      const protectedRoutes = [
        routePath.forgetPassword,
        routePath.user,
        routePath.userFollows,
        routePath.userOrders,
        routePath.userPersonalSettings,
        routePath.userProjects,
        routePath.userTeamSettings,
        routePath.newPassword,
        routePath.notifications,
        routePath.proposalId,
      ];

      if (!isAuthenticated && protectedRoutes.includes(currentPath)) {
        //TODO: 需改為登入popup
        alert('請登錄');
        router.push(routePath.login);
      }
    }, [currentPath]);

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default withAuth;
