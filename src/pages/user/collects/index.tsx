import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import UserLayout from '../../../components/layout/UserLayout';
import { useAppDispatch, useAppSelector } from '@libraries/hooks/reduxHooks';
import { setUserTabsPage } from '../../../store/slices/tabsSlice';
import CollectsCard from '@/components/pages/user/CollectsCard';
import ToggleButtons from '@/components/pages/user/ToggleButtons';

interface Team {
  teamId: string;
  teamName: string;
}

interface Collect {
  projectId: string;
  projectVisual: string;
  projectName: string;
  projectType: number;
  projectTeam: Team;
  projectUrl: string;
}

interface CollectData {
  currentPage: number;
  pageSize: number;
  totalPage: number;
  totalSize: number;
  items: Collect[];
}
// projectType
// 0: general
// 1: long-term
// 2: 已結束

const data: CollectData = {
  currentPage: 1,
  pageSize: 6,
  totalPage: 5,
  totalSize: 30,
  items: [
    {
      projectId: '5349b4ghrao781d08c09890f3',
      projectVisual: '/slides/Mobile_slides_3@2x.png',
      projectName: '募資計畫標題好眠城實木床組｜我長大了，我可以自己睡！一套從抓周禮睡到成年禮',
      projectType: 0,
      projectTeam: {
        teamId: '5349b4ghrao781d08c0989d0f3',
        teamName:
          '廠商名稱廠商名稱廠商名稱廠商名稱顧眠廠商名稱廠商名稱廠商名稱廠商名稱顧眠廠商名稱廠商名稱廠商名稱廠商名稱顧眠・GUTNAP',
      },
      projectUrl: 'https://example.com/project-url',
    },
    {
      projectId: '5349b4ghrao781d08c09890f3',
      projectVisual: '/project/Desktop_Project_1.png',
      projectName:
        '實木床組222我長大了，我可以自己睡！一套從抓周禮睡到成年禮我長大了，我可以自己睡！一套從抓周禮睡到成年禮我長大了，我可以自己睡！一套從抓周禮睡到成年禮',
      projectType: 1,
      projectTeam: {
        teamId: '5349b4ghrao781d08c0989d0f3',
        teamName: '廠商名稱廠商名稱廠商名稱廠商名稱顧眠・GUTNAP',
      },
      projectUrl: 'https://example.com/project-url',
    },
    {
      projectId: '5349b4ghrao781d08c09890f3',
      projectVisual: '/slides/Mobile_slides_3@2x.png',
      projectName: '3333募資計畫標題好眠城實木床組｜我長大了，我可以自己睡！一套從抓周禮睡到成年禮',
      projectType: 2,
      projectTeam: {
        teamId: '5349b4ghrao781d08c0989d0f3',
        teamName:
          '廠商名稱廠商名稱廠商名稱廠商名稱顧眠廠商名稱廠商名稱廠商名稱廠商名稱顧眠廠商名稱廠商名稱廠商名稱廠商名稱顧眠・GUTNAP',
      },
      projectUrl: 'https://example.com/project-url',
    },
    {
      projectId: '5349b4ghrao781d08c09890f3',
      projectVisual: '/project/Desktop_Project_1.png',
      projectName:
        '44444實木床組222我長大了，我可以自己睡！一套從抓周禮睡到成年禮我長大了，我可以自己睡！一套從抓周禮睡到成年禮我長大了，我可以自己睡！一套從抓周禮睡到成年禮',
      projectType: 0,
      projectTeam: {
        teamId: '5349b4ghrao781d08c0989d0f3',
        teamName: '廠商名稱廠商名稱廠商名稱廠商名稱顧眠・GUTNAP',
      },
      projectUrl: 'https://example.com/project-url',
    },
  ],
};

const Collects = () => {
  const isPC = useMediaQuery('(min-width:768px)'); //tailwind breakpoint md
  const [types, setTypes] = useState(() => [0, 1, 2]);

  const filteredItems = data.items.filter((item) => types.includes(item.projectType));

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setUserTabsPage(3));
  }, [dispatch]);

  return (
    <UserLayout>
      {/* {console.log(types, filteredItems)} */}
      <div className="mb-5 flex justify-center">
        <ToggleButtons types={types} setTypes={setTypes} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredItems.length !== 0 &&
          filteredItems.map((collect, i) => <CollectsCard key={`collect_${i + 1}`} isPC={isPC} collect={collect} />)}
      </div>
      {filteredItems.length === 0 && <p className="text-center w-full">- 沒有相關追蹤資料 -</p>}
    </UserLayout>
  );
};

export default Collects;
