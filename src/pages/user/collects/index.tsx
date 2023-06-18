import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import UserLayout from '../../../components/layout/UserLayout';
import { useAppDispatch, useAppSelector } from '@libraries/hooks/reduxHooks';
import { setUserTabsPage } from '../../../store/slices/tabsSlice';
import { selectUser } from '../../../store/slices/userSlice';
import CollectsCard from '@/components/pages/user/CollectsCard';
import ToggleButtons from '@/components/pages/user/ToggleButtons';
import { useGerUserCollectQuery, useDeleteUserCollectMutation } from '@/store/services/userApi';
import { projectFormEnum } from '@/libraries/enum';
import Seo from '@/components/Seo';

const Collects = () => {
  const user = useAppSelector(selectUser);
  const userId = user._id;

  const { data: collectsData, refetch } = useGerUserCollectQuery(userId);
  const [deleteUserCollect, { isLoading: deleteUserCollectLoading }] = useDeleteUserCollectMutation();

  const isPC = useMediaQuery('(min-width:768px)'); //tailwind breakpoint md
  const [types, setTypes] = useState([
    projectFormEnum.GENERAL,
    projectFormEnum.LONG_TERM,
    projectFormEnum.SUCCESS,
    projectFormEnum.FAILED,
  ]);

  const filteredItems = collectsData?.data.filter((item: any) => types.includes(item.projectForm));

  const onCancelFollow = async (projectId: string) => {
    try {
      const result = await deleteUserCollect({ userId, projectId }).unwrap();
      refetch();
    } catch (error) {
      throw Error('onCancelFollow');
    }
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setUserTabsPage(3));
  }, [dispatch]);

  useEffect(() => {
    console.log('useEffect :', userId);

    if (userId) {
      console.log('useEffect :', userId);
      refetch();
    }
  }, [userId]);

  return (
    <>
      <Seo templateTitle="我的收藏" />
      <UserLayout>
        <div className="mb-5 flex justify-center">
          <ToggleButtons types={types} setTypes={setTypes} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {collectsData &&
            collectsData.total !== 0 &&
            filteredItems.map((collect: any, i: number) => (
              <CollectsCard key={`collect_${i + 1}`} isPC={isPC} collect={collect} onCancelFollow={onCancelFollow} />
            ))}
        </div>
        {filteredItems && filteredItems.length === 0 && (
          <p className="text-center col-span-full">- 沒有相關追蹤資料 -</p>
        )}
      </UserLayout>
    </>
  );
};

export default Collects;
