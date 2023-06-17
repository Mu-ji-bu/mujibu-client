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
import { IProjectState, IProjectSelectFormData } from 'types/project';
import {
  projectFormOption,
  projectCategoryOption,
  projectSortOption,
  projectFormEnum,
  projectCategoryEnum,
  projectSortEnum,
  searchQueryEnum,
} from '@/libraries/enum';
import { useRouter } from 'next/router';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgb(72,72,72,0.12)',
  },
}));

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState({});
  const { data, isLoading } = useGetProjectDataQuery(searchQuery);
  const dataTotal = useMemo((): number => data?.total || 1, [data?.total]);
  const dataList = useMemo((): IProjectState | never[] => data?.data || [], [data?.data]);
  const router = useRouter();

  const { onPaginationChange, onSelectChange, paginationQuery, pageTotal, selectQuery } =
    useSearchDataQuery<IProjectState>({
      dataTotal,
    });

  const { isMd } = useBreakpoints();

  const { control, handleSubmit, setValue } = useForm<IProjectSelectFormData>();

  const handleClearSelect = (fieldName: keyof IProjectSelectFormData) => {
    switch (fieldName) {
      case projectFormEnum.TYPE:
        setValue(fieldName, projectFormEnum.ALL);
        break;
      case projectCategoryEnum.TYPE:
        setValue(fieldName, projectCategoryEnum.ALL);
        break;
      case projectSortEnum.TYPE:
        setValue(fieldName, searchQueryEnum.SORT_START);
        break;
    }
  };

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
              name="projectForm"
              control={control}
              defaultValue={projectFormEnum.ALL}
              render={({ field }) => (
                <StyledFormControl className="flex-row">
                  <Select
                    id="projectForm"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      handleSubmit(onSelectChange)();
                    }}
                    size="small"
                    IconComponent={ExpandMoreIcon}
                    sx={{ minWidth: 180 }}
                  >
                    <MenuItem sx={{ paddingBlock: '12px' }} value={projectFormEnum.ALL} disabled>
                      專案性質
                    </MenuItem>
                    {projectFormOption.map(({ label, value }, index) => (
                      <MenuItem key={index} sx={{ paddingBlock: '12px' }} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                  <IconButton
                    size="small"
                    onClick={() => {
                      handleClearSelect('projectForm');
                      handleSubmit(onSelectChange)();
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </StyledFormControl>
              )}
            />
            <Controller
              name="projectCategory"
              control={control}
              defaultValue={projectCategoryEnum.ALL}
              render={({ field }) => (
                <StyledFormControl className="flex-row">
                  <Select
                    id="projectCategory"
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
                      handleClearSelect('projectCategory');
                      handleSubmit(onSelectChange)();
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </StyledFormControl>
              )}
            />
            <Controller
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
              dataList.map((project: IProjectState) => (
                <div
                  onClick={() => router.push(`/projects/${project._id}`)}
                  key={project._id}
                  className="md:-mx-4 w-full md:w-1/2 lg:w-1/3"
                >
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
