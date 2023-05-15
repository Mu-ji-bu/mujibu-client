import Link from 'next/link';
import Image from 'next/image';
import clsxm from '@/lib/clsxm';
import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
// import Button from '../block/button';
import AccountMenu, { IAccountMenuOption } from '../block/accountMenu/AccountMenu';
import NotificationsMenu, { INotificationsMenuOption } from '../block/notificationsMenu/NotificationsMenu';
import SearchButton from '../block/searchButton';
import { Menu, Search } from '@mui/icons-material';

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const accountOptions: IAccountMenuOption[] = [
    { label: '個人設定', href: '/member', hasBorderBottom: false },
    { label: '贊助紀錄', href: '/member/1/funding-record', hasBorderBottom: false },
    { label: '我的收藏', href: '/member/1/favorite', hasBorderBottom: true },
    { label: '團隊設定', href: '/member/1/team-setting', hasBorderBottom: false },
    { label: '提案管理', href: '/member/1/proposal-management', hasBorderBottom: true },
    { label: '登出', href: '/', hasBorderBottom: true },
  ];
  const notificationOptions: INotificationsMenuOption[] = [
    { type: '您的提案有新通知', label: '您提案募資人數超過 100 人!!!' },
    { type: '你參與的提案有新通知', label: '您參與的提案目前累積進度 50 %!!!' },
    { type: '您追蹤的提案有新通知', label: '您追蹤的提案剩下十天就募資完畢囉～' },
  ];

  return (
    <header className="border-0 border-b border-solid border-secondary-10">
      <div className="max-w-screen-xl mx-auto px-5 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Link href={'/'} className="flex items-center mr-4">
            <Image src={'/logo@2x.png'} alt={'募質部 Mujibu logo'} width={128} height={48} />
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
          {isLoggedIn ? (
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
              <Button
                variant="outlined"
                color="secondary"
                className="p-[6px] min-w-0 md:hidden ml-5"
                aria-label="instagram"
              >
                <Search />
              </Button>
            </>
          )}

          <Button
            variant="outlined"
            color="secondary"
            className="p-[6px] min-w-0 md:hidden ml-5"
            aria-label="instagram"
          >
            <Menu />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
