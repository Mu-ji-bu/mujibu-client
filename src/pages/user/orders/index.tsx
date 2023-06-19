import { useEffect, useState } from 'react';
import UserLayout from '../../../components/layout/UserLayout';
import { useAppDispatch, useAppSelector } from '@libraries/hooks/reduxHooks';
import { setUserTabsPage } from '../../../store/slices/tabsSlice';
import OrderCard from '@/components/pages/user/OrderCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography } from '@mui/material';
import Pagination from '@/components/block/pagination';
import Seo from '@/components/Seo';

interface Project {
  projectId: string;
  projectVisual: string;
  projectName: string;
  projectStartTime: number;
  projectEndTime: number;
  projectTeam: {
    teamId: string;
    teamName: string;
  };
  projectUrl: string;
  projectType: number;
}

interface Plan {
  planId: string;
  planName: string;
}

interface Order {
  orderId: string;
  orderNumber: string;
  orderAmount: number;
  orderUnit: number;
  createdAt: number;
  project: Project;
  plan: Plan;
}

interface PaginatedData {
  currentPage: number;
  pageSize: number;
  totalPage: number;
  totalSize: number;
  items: Order[];
}

const data: PaginatedData = {
  currentPage: 1,
  pageSize: 5,
  totalPage: 5,
  totalSize: 25,
  items: [
    {
      orderId: '5349b4ddd2781d08c09890f3',
      orderNumber: 'ord-123456',
      orderUnit: 2,
      orderAmount: 1300,
      createdAt: 1672195200,
      project: {
        projectId: '5349b4ghrao781d08c09890f3',
        projectVisual: '/slides/Mobile_slides_3@2x.png',
        projectName: '募資計畫標題好眠城實木床組｜我長大了，我可以自己睡！一套從抓周禮睡到成年禮',
        projectStartTime: 1672195200,
        projectEndTime: 1672281600,
        projectTeam: {
          teamId: '5349b4ghrao781d08c0989d0f3',
          teamName: '團隊名稱團隊名稱',
        },
        projectUrl: 'https://example.com/project-url',
        projectType: 1,
      },
      plan: {
        planId: '53w34b4ghrao8958c09890f3',
        planName: '好眠城上下舖 /好收納梯櫃組',
      },
    },
    {
      orderId: '5349b4ddd2781d08c09890f31',
      orderNumber: 'ord-123456',
      orderUnit: 1,
      orderAmount: 31300,
      createdAt: 1672195200,
      project: {
        projectId: '5349b4ghrao781d08c09890f3',
        projectVisual: '/project/Desktop_Project_1.png',
        projectName:
          '實木床組222我長大了，我可以自己睡！一套從抓周禮睡到成年禮我長大了，我可以自己睡！一套從抓周禮睡到成年禮我長大了，我可以自己睡！一套從抓周禮睡到成年禮',
        projectStartTime: 1672195200,
        projectEndTime: 1672281600,
        projectTeam: {
          teamId: '5349b4ghrao781d08c0989d0f3',
          teamName: '廠商名稱廠商名稱廠商名稱廠商名稱顧眠・GUTNAP',
        },
        projectUrl: 'https://example.com/project-url',
        projectType: 1,
      },
      plan: {
        planId: '53w34b4ghrao8958c09890f3',
        planName: '好收納梯櫃組2好收納梯櫃組222好收納梯櫃組22222',
      },
    },
  ],
};

const Orders = () => {
  const isPC = useMediaQuery('(min-width:768px)');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setUserTabsPage(1));
  }, [dispatch]);

  return (
    <>
      <Seo templateTitle="贊助紀錄" />
      <UserLayout>
        <div className="flex flex-col space-y-5 mb-10">
          {data.items && data.items.map((order, i) => <OrderCard key={`order_${i + 1}`} order={order} isPC={isPC} />)}
        </div>
        <div className="flex items-center justify-center">
          <Pagination page={0} />
        </div>
      </UserLayout>
    </>
  );
};

export default Orders;
