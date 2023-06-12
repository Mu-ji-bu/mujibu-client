import { useEffect, useState } from 'react';
import { searchQueryEnum } from '@/libraries/enum';
import { IProjectSelectFormData } from 'types/project';
import { SubmitHandler } from 'react-hook-form';

interface IUseSearchDataQuery<T> {
  onPaginationChange: Function;
  onSelectChange: SubmitHandler<ISelectFormData>;
  pageTotal: number;
  paginationQuery: {
    page: number;
    perPage: number;
  };
  selectQuery: object;
}

// type ISelectFormData = IProjectSelectFormData | other interface
type ISelectFormData = IProjectSelectFormData;

// 計算後要傳到Pagination組件的頁面總數值
const defaultPageTotal = 1;
const defaultCurrentPage = 1;
const perPage = searchQueryEnum.perPage;

const useSearchDataQuery = <T,>({ dataTotal }: { dataTotal: number }): IUseSearchDataQuery<T> => {
  const [pageTotal, setPageTotal] = useState(defaultPageTotal);
  const [selectQuery, setSelectQuery] = useState({});
  const [paginationQuery, setPaginationQuery] = useState({
    page: defaultCurrentPage,
    perPage,
  });

  const onSelectChange = (data: object) => {
    setPaginationQuery({
      page: defaultCurrentPage,
      perPage,
    });
    // 下拉選單更新資料
    setSelectQuery({
      ...selectQuery,
      ...data,
    });
  };

  const onPaginationChange = (page: number): void => {
    setPaginationQuery({
      ...paginationQuery,
      page: page,
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onCalculatePageTotal = (total: number, limit: number): number => {
    // 取得data資料後,用data.total值計算應顯示頁數
    let resultTotal = defaultPageTotal;
    if (total) {
      resultTotal = Math.ceil(total / limit);
    }
    return resultTotal;
  };

  useEffect(() => {
    if (dataTotal) {
      const calculatedPageTotal = onCalculatePageTotal(dataTotal, perPage);
      setPageTotal(calculatedPageTotal);
    }
  }, [dataTotal, pageTotal]);

  return {
    onPaginationChange,
    onSelectChange,
    pageTotal,
    paginationQuery,
    selectQuery,
  };
};

export default useSearchDataQuery;
