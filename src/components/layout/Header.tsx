import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../block/button';
import AccountMenu, { IAccountMenuOption } from '../block/accountMenu/AccountMenu';
import NotificationsMenu, { INotificationsMenuOption } from '../block/notificationsMenu/NotificationsMenu';
import SearchButton from '../block/searchButton';

const Header = () => {
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
    <div className="flex justify-between items-center py-6 px-10 border-0 border-b-[1px] border-secondary-10 border-solid">
      <div className="header-left flex items-center">
        <Link href={'/'}>
          <Image src={'/logo@2x.png'} alt={'mujibu logo'} width={128} height={48} />
        </Link>
        <div className="logo-text text-primary text-[20px] leading-[1] pr-5 border-0 border-r border-secondary-30 border-solid">
          讓創意萌芽
        </div>
        <Link className="ml-8 text-secondary-66 hover:text-secondary text-[20px] no-underline" href={'/projects'}>
          探索
        </Link>
        <Link className="ml-10 text-secondary-66 hover:text-secondary text-[20px] no-underline" href={'/proposal'}>
          提案
        </Link>
      </div>
      <div className="header-right flex items-center">
        {isLoggedIn ? (
          <>
            <SearchButton />
            <div className="division w-[1px] h-6 bg-secondary-30 ml-10 mr-10"></div>
            <NotificationsMenu options={notificationOptions} />
            <AccountMenu options={accountOptions} />
          </>
        ) : (
          <>
            <SearchButton />
            <div className="division w-[1px] h-6 bg-secondary-30 ml-10 mr-10"></div>
            <Button variant="contained">
              <Link className="no-underline visited:text-current" href={'/signup'}>
                註冊
              </Link>
            </Button>
            <Button variant="outlined" color="secondary" className="ml-5">
              <Link className="no-underline visited:text-current" href={'/login'}>
                登入
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
