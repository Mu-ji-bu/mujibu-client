import { useEffect, useState, useMemo } from 'react';
import Card from '@/components/block/card';
import Loading from '@/components/Loading';
import { FormControl, MenuItem, Select, IconButton } from '@mui/material';
import Pagination from '@/components/block/pagination';
import { useForm, Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import clsxm from '@/libraries/utils/clsxm';
import useBreakpoints from '@/libraries/hooks/useBreakPoints';
import { useGetProjectDataQuery } from '@/store/services/projectApi';
import useSearchDataQuery from '@/libraries/hooks/useSearchDataQuery';
import { IProject, IProjectSelectFormData } from 'types/project';
import {
  projectTypeOption,
  projectCategoryOption,
  projectSortOption,
  projectTypeEnum,
  projectCategoryEnum,
  projectSortEnum,
  searchQueryEnum,
} from '@/libraries/enum';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgb(72,72,72,0.12)',
  },
}));

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState({});
  const { data, refetch } = useGetProjectDataQuery(searchQuery);
  const dataTotal = useMemo((): number => data?.total || 1, [data?.total]);
  const dataList = useMemo((): IProject | never[] => data?.data || [], [data?.data]);

  const { onPaginationChange, onSelectChange, paginationQuery, pageTotal, selectQuery } = useSearchDataQuery<IProject>({
    dataTotal,
  });

  const [isLoading, setisLoading] = useState(true);
  const { isMd } = useBreakpoints();

  const { control, handleSubmit, setValue } = useForm<IProjectSelectFormData>();

  const handleClearSelect = (fieldName: keyof IProjectSelectFormData) => {
    switch (fieldName) {
      case projectTypeEnum.PROJECT_TYPE:
        setValue(fieldName, projectTypeEnum.ALL);
        break;
      case projectCategoryEnum.CATEGORY:
        setValue(fieldName, projectCategoryEnum.ALL);
        break;
      case projectSortEnum.SORT_BY:
        setValue(fieldName, searchQueryEnum.SORT_START);
        break;
    }
  };

  useEffect(() => {
    // mount data
    const fetchData = async () => {
      setisLoading(true);
      await refetch();
      setisLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // update data
    const query = {
      ...paginationQuery,
      ...selectQuery,
    };
    setSearchQuery(query);
  }, [paginationQuery, selectQuery]);

  return (
    <main className="max-w-screen-xl mx-auto p-5">
      {isLoading ? (
        <Loading />
      ) : data !== undefined ? (
        <>
          <div
            className={clsxm(
              'w-full flex justify-center items-center ',
              'flex-col gap-5 my-5',
              'md:gap-10 md:flex-row md:my-10',
            )}
          >
            <Controller
              // name={projectTypeEnum.PROJECT_TYPE as 'projectType' | 'category' | 'sortBy'}
              name="projectType"
              control={control}
              defaultValue={projectTypeEnum.ALL}
              render={({ field }) => (
                <StyledFormControl className="flex-row">
                  <Select
                    id="projectType"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      handleSubmit(onSelectChange)();
                    }}
                    size="small"
                    IconComponent={ExpandMoreIcon}
                    sx={{ minWidth: 180 }}
                  >
                    <MenuItem sx={{ paddingBlock: '12px' }} value={projectTypeEnum.ALL} disabled>
                      專案性質
                    </MenuItem>
                    {projectTypeOption.map(({ label, value }, index) => (
                      <MenuItem key={index} sx={{ paddingBlock: '12px' }} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                  <IconButton
                    size="small"
                    onClick={() => {
                      handleClearSelect('projectType');
                      handleSubmit(onSelectChange)();
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </StyledFormControl>
              )}
            />
            <Controller
              // name={projectCategoryEnum.CATEGORY}
              name="category"
              control={control}
              defaultValue={projectCategoryEnum.ALL}
              render={({ field }) => (
                <StyledFormControl className="flex-row">
                  <Select
                    id="category"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      handleSubmit(onSelectChange)();
                    }}
                    size="small"
                    IconComponent={ExpandMoreIcon}
                    sx={{ minWidth: 180 }}
                  >
                    <MenuItem sx={{ paddingBlock: '12px' }} value={projectCategoryEnum.ALL} disabled>
                      分類
                    </MenuItem>
                    {projectCategoryOption.map(({ label, value }, index) => (
                      <MenuItem key={index} sx={{ paddingBlock: '12px' }} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                  <IconButton
                    size="small"
                    onClick={() => {
                      handleClearSelect('category');
                      handleSubmit(onSelectChange)();
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </StyledFormControl>
              )}
            />
            <Controller
              // name={projectSortEnum.SORT_BY}
              name="sortBy"
              control={control}
              defaultValue={searchQueryEnum.SORT_START}
              render={({ field }) => (
                <StyledFormControl className="flex-row">
                  <Select
                    id="sortBy"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      handleSubmit(onSelectChange)();
                    }}
                    size="small"
                    IconComponent={ExpandMoreIcon}
                    sx={{ minWidth: 180 }}
                  >
                    <MenuItem sx={{ paddingBlock: '12px' }} disabled>
                      排序方式
                    </MenuItem>
                    {projectSortOption.map(({ label, value }, index) => (
                      <MenuItem key={index} sx={{ paddingBlock: '12px' }} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                  <IconButton
                    size="small"
                    onClick={() => {
                      handleClearSelect('sortBy');
                      handleSubmit(onSelectChange)();
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </StyledFormControl>
              )}
            />
          </div>
          <div className="flex flex-wrap justify-between gap-4 px-4">
            {Array.isArray(dataList) &&
              dataList.map((project: IProject) => (
                <div key={project._id} className="md:-mx-4 w-full md:w-1/2 lg:w-1/3">
                  <Card isPC={isMd} {...project} />
                </div>
              ))}
          </div>
          <div className="w-full flex justify-center my-10">
            <Pagination onClick={onPaginationChange} page={paginationQuery.page} count={pageTotal} />
          </div>
        </>
      ) : (
        '佔無資料'
      )}
    </main>
  );
};

export default Projects;
