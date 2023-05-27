import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@/components/block/card';
import Loading from '@/components/Loading';
import { useGetProjectDataQuery } from '@store/services/projectApi';
import { FormControl, MenuItem, Select, IconButton } from '@mui/material';
import Pagination from '@/components/block/pagination';
import { useForm, Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import clsxm from '@/libraries/utils/clsxm';
import useBreakpoints from '@/libraries/hooks/useBreakPoints';

interface IProjectPlan {
  id: string;
  name: string;
  description: string;
  minimumAmount: number;
  maximumAmount: number;
  remaining: number;
  estimatedDelivery: string;
  discount?: number;
  earlyBirdEndDate?: string;
}

interface IProject {
  id: string;
  image: string;
  category: string;
  projectName: string;
  projectTeam: string;
  proposer: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  backers: number;
  prize: number;
  startTime: string;
  endTime: string;
  remainingTime: string;
  projectType: number;
  plans: IProjectPlan[];
}

//TODO: 把 { id: number; projectType: number; projectName: string, ... } 拉出來共用
let projectData: { id: number; projectType: number; projectName: string }[] = [];
for (let i = 0; i < 3; i++) {
  projectData.push({
    id: i,
    projectType: 0,
    projectName: 'Balance衡壓坐墊｜市場唯一衡壓概念健康坐墊，坐出 Q 軟好體態！',
  });
}
for (let i = 3; i < 6; i++) {
  projectData.push({
    id: i,
    projectType: 1,
    projectName: 'Balance衡壓坐墊｜市場唯一衡壓概念健康坐墊，坐出 Q 軟好體態！',
  });
}
for (let i = 6; i < 9; i++) {
  projectData.push({
    id: i,
    projectType: 2,
    projectName: 'Balance衡壓坐墊｜市場唯一衡壓概念健康坐墊，坐出 Q 軟好體態！',
  });
}

//TODO: 拉出enum
const projectTypeOption = [
  { label: '一般專案', value: 0 },
  { label: '長期販售', value: 1 },
  { label: '成功案例', value: 2 },
];

//TODO: 拉出enum
const projectCategoryOption = [
  { label: '藝術', value: 0 },
  { label: '設計', value: 1 },
  { label: '電影', value: 2 },
  { label: '音樂', value: 3 },
  { label: '科技', value: 4 },
  { label: '出版', value: 5 },
];

//TODO: 拉出enum
const projectSortOption = [
  { label: '最新募資', value: 0 },
  { label: '最後倒數', value: 1 },
  { label: '募資金額', value: 2 },
];

interface ISelectFormData {
  projectTypeValue: number;
  projectCategoryValue: number;
  projectSortValue: number;
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgb(72,72,72,0.12)',
  },
}));

const Projects = () => {
  const { data, refetch } = useGetProjectDataQuery();

  const [isLoading, setisLoading] = useState(true);
  const { isMd } = useBreakpoints();

  const { control, handleSubmit, setValue } = useForm<ISelectFormData>();

  const onSubmit = (data: ISelectFormData) => {
    console.log(data);
  };

  const handleClearSelect = (fieldName: keyof ISelectFormData) => {
    setValue(fieldName, -1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      await refetch();
      setisLoading(false);
    };

    fetchData();
  }, []);

  return (
    <main className="max-w-screen-xl mx-auto p-5">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className={clsxm(
                'w-full flex justify-center items-center ',
                'flex-col gap-5 my-5',
                'md:gap-10 md:flex-row md:my-10',
              )}
            >
              <Controller
                name="projectTypeValue"
                control={control}
                defaultValue={-1}
                render={({ field }) => (
                  <StyledFormControl className="flex-row">
                    <Select
                      id="projectTypeValue"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        handleSubmit(onSubmit)();
                      }}
                      size="small"
                      IconComponent={ExpandMoreIcon}
                      sx={{ minWidth: 180 }}
                    >
                      <MenuItem sx={{ paddingBlock: '12px' }} value={-1} disabled>
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
                        handleClearSelect('projectTypeValue');
                        handleSubmit(onSubmit)();
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </StyledFormControl>
                )}
              />
              <Controller
                name="projectCategoryValue"
                control={control}
                defaultValue={-1}
                render={({ field }) => (
                  <StyledFormControl className="flex-row">
                    <Select
                      id="projectCategoryValue"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        handleSubmit(onSubmit)();
                      }}
                      size="small"
                      IconComponent={ExpandMoreIcon}
                      sx={{ minWidth: 180 }}
                    >
                      <MenuItem sx={{ paddingBlock: '12px' }} value={-1} disabled>
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
                        handleClearSelect('projectCategoryValue');
                        handleSubmit(onSubmit)();
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </StyledFormControl>
                )}
              />
              <Controller
                name="projectSortValue"
                control={control}
                defaultValue={-1}
                render={({ field }) => (
                  <StyledFormControl className="flex-row">
                    <Select
                      id="projectSortValue"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        handleSubmit(onSubmit)();
                      }}
                      size="small"
                      IconComponent={ExpandMoreIcon}
                      sx={{ minWidth: 180 }}
                    >
                      <MenuItem sx={{ paddingBlock: '12px' }} value={-1} disabled>
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
                        handleClearSelect('projectSortValue');
                        handleSubmit(onSubmit)();
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </StyledFormControl>
                )}
              />
            </div>
          </form>
          <div className="flex flex-wrap justify-between gap-4 px-4">
            {data?.data?.projects.map((project: IProject) => (
              <div key={project.id} className="md:-mx-4 w-full md:w-1/2 lg:w-1/3">
                <Card isPC={isMd} {...project} />
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center my-10">
            <Pagination />
          </div>
        </>
      )}
    </main>
  );
};

export default Projects;
