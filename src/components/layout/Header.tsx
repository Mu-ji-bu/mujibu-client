import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import AccountMenu, { IAccountMenuOption } from '../block/accountMenu/AccountMenu';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import NotificationsMenu, { INotificationsMenuOption } from '../block/notificationsMenu/NotificationsMenu';
import SearchButton from '../block/searchButton';
import { Menu } from '@mui/icons-material';
import routePath from '@routes/routePath';
import Cookies from 'js-cookie';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { authentication } from '../../../firebaseConfig';
import { useAppDispatch, useAppSelector } from '@libraries/hooks/reduxHooks';
import { useLoginMutation } from '../../store/services/authApi';
import { updateUser } from '../../store/slices/userSlice';
import { clearToken, selectAuth, setToken, setUserToken } from '../../store/slices/authSlice';
import clsxm from '@/libraries/utils/clsxm';

const Header = () => {
  const loginToken: string | undefined = Cookies.get('googleToken');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector(selectAuth);
  const [login] = useLoginMutation();
  const headerRef = useRef(null);

  const handleGetUser = useCallback(async () => {
    try {
      const res = await login().unwrap();
      const resUser = res.user;
      const userDataGender = resUser.gender == 'other' ? 2 : 0;
      const userData = {
        ...resUser,
        gender: userDataGender,
      };

      dispatch(setUserToken(res.tokens));
      dispatch(updateUser(userData));

      // console.log(res);

      // onAuthStateChanged(authentication, (user: any) => {
      //   if (user) {
      //     const userData = {
      //       name: resUser.name,
      //       email: resUser.email,
      //       avatar: user.photoURL,
      //       uid: user.uid,
      //       createdAt: user.metadata.creationTime,
      //       id: resUser.id,
      //     };

      //     dispatch(updateUser(userData));
      //   } else {
      //     console.log('無使用者資料，使用者已登出');
      //   }
      // });
    } catch (err) {
      console.log(err);
    }
  }, [login, dispatch]);

  const handleLogout = () => {
    signOut(authentication)
      .then(() => {
        Cookies.remove('googleToken');
        dispatch(clearToken());
        router.push(routePath.home);
        console.log('Signed out successfully');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const accountOptions: IAccountMenuOption[] = [
    { label: '個人設定', href: routePath.userPersonalSettings, hasBorderBottom: false },
    { label: '贊助紀錄', href: routePath.userOrders, hasBorderBottom: false },
    { label: '我的收藏', href: routePath.userCollects, hasBorderBottom: true },
    { label: '團隊設定', href: routePath.userTeamSettings, hasBorderBottom: false },
    { label: '提案管理', href: routePath.userProjects, hasBorderBottom: true },
    { label: '登出', href: routePath.home, hasBorderBottom: true, handleCustomEvent: handleLogout },
  ];
  const notificationOptions: INotificationsMenuOption[] = [
    { type: '您的提案有新通知', label: '您提案募資人數超過 100 人!!!' },
    { type: '你參與的提案有新通知', label: '您參與的提案目前累積進度 50 %!!!' },
    { type: '您追蹤的提案有新通知', label: '您追蹤的提案剩下十天就募資完畢囉～' },
  ];

  useEffect(() => {
    if (loginToken) {
      dispatch(setToken(loginToken));
      handleGetUser();
    }
  }, [loginToken, dispatch, handleGetUser]);

  useEffect(() => {
    const fixNav = () => {
      if (window.scrollY > 0 && headerRef.current) {
        document.body.style.paddingTop = (headerRef.current as HTMLElement).offsetHeight + 'px';
        document.body.classList.add('fixed-nav');
      } else {
        document.body.classList.remove('fixed-nav');
        document.body.style.paddingTop = '0px';
      }
    };

    window.addEventListener('scroll', fixNav);

    return () => {
      window.removeEventListener('scroll', fixNav);
    };
  }, []);

  return (
    <>
      <header ref={headerRef} className="border-0 border-b border-solid border-secondary-10">
        <div className="max-w-screen-xl mx-auto px-5 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <Link href={'/'} className="flex items-center mr-4">
              <Image src={'/logo@2x.png'} alt={'募質部 Mujibu logo'} width={128} height={48} priority={true} />
            </Link>
            <Typography component="span" variant="h6" className="md:block hidden text-primary">
              讓創意萌芽
            </Typography>
            <div className="division w-[1px] h-6 bg-secondary-30 mx-6 md:block hidden"></div>
            <Link
              className="mr-6 text-secondary-66 hover:text-secondary visited:text-secondary-66 no-underline md:block hidden"
              href={'/projects'}
            >
              <Typography component="p" variant="h6">
                探索
              </Typography>
            </Link>
            <Link
              className="mr-2 text-secondary-66 hover:text-secondary visited:text-secondary-66 no-underline md:block hidden"
              href={'/proposal'}
            >
              <Typography component="p" variant="h6">
                提案
              </Typography>
            </Link>
          </div>
          <div className="flex items-center">
            {isLogin ? (
              <>
                <div className="hidden md:block">
                  <SearchButton />
                </div>
                <div className="w-[1px] h-6 bg-secondary-30 mx-6 hidden md:block"></div>
                <NotificationsMenu options={notificationOptions} />
                <AccountMenu options={accountOptions} />
              </>
            ) : (
              <>
                {' '}
                <div className="hidden md:flex items-center">
                  <SearchButton />
                  <div className="w-[1px] h-6 bg-secondary-30 mx-6"></div>
                  <Button variant="contained" onClick={() => router.push('/signup')}>
                    註冊
                  </Button>
                  <Button variant="outlined" color="secondary" className="ml-5" onClick={() => router.push('/login')}>
                    登入
                  </Button>
                </div>
                <div className="md:hidden">
                  <SearchButton />
                </div>
              </>
            )}

            <Button variant="outlined" color="secondary" className="p-[6px] min-w-0 md:hidden ml-5" aria-label="search">
              <Menu />
            </Button>
          </div>
        </div>
      </header>
      <ScrollUpButton />
    </>
  );
};

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      className={clsxm(
        'fixed right-10 bottom-10 z-50',
        'bg-primary text-white',
        'rounded-md',
        isVisible ? 'opacity-80' : 'opacity-0',
        'transition-opacity duration-300',
      )}
      onClick={handleScrollUp}
    >
      <ArrowUpwardIcon className="h-6 w-6" />
    </Button>
  );
};

export default Header;
