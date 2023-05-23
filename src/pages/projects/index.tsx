import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@/components/block/card';
import Select from '@/components/block/select';
import { Button, FormControl, InputLabel, MenuItem, Stack } from '@mui/material';
import Pagination from '@/components/block/pagination';
import { useForm, Controller } from 'react-hook-form';

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
  { label: '募資王', value: 2 },
];

interface ISelectFormData {
  projectTypeValue: string;
  projectCategoryValue: string;
  projectSortValue: string;
}

const Projects = () => {
  const isPC = useMediaQuery('(min-width:768px)'); //tailwind breakpoint md

  const { control, handleSubmit, setValue } = useForm<ISelectFormData>();

  const onSubmit = (data: ISelectFormData) => {
    console.log(data);
  };

  const handleClearSelect = (fieldName: keyof ISelectFormData) => {
    setValue(fieldName, '');
  };

  return (
    <main className="max-w-screen-xl mx-auto p-5">
      <div className="w-full flex justify-center gap-10 my-10">
        <Select placeholder="專案性質" option={projectTypeOption} />
        <Select placeholder="分類" option={projectCategoryOption} />
        <Select placeholder="排序方式" option={projectSortOption} />
      </div>
      {/* <div className="w-full flex justify-center gap-10 my-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="projectTypeValue"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl>
                <InputLabel id="select1-label">Select 1</InputLabel>
                <Select
                  labelId="select1-label"
                  id="projectTypeValue"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    handleSubmit(onSubmit)();
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                  <MenuItem value="option3">Option 3</MenuItem>
                </Select>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleClearSelect('projectTypeValue');
                    handleSubmit(onSubmit)();
                  }}
                >
                  Clear
                </Button>
              </FormControl>
            )}
          />
          <Controller
            name="projectCategoryValue"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl>
                <InputLabel id="select2-label">Select 2</InputLabel>
                <Select
                  labelId="select2-label"
                  id="projectCategoryValue"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    handleSubmit(onSubmit)();
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                  <MenuItem value="option3">Option 3</MenuItem>
                </Select>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleClearSelect('projectCategoryValue');
                    handleSubmit(onSubmit)();
                  }}
                >
                  Clear
                </Button>
              </FormControl>
            )}
          />
        </form>
      </div> */}
      <div className="flex flex-wrap justify-between gap-4 px-4">
        {projectData.map((project) => (
          <div key={project.id} className="-mx-4 w-full md:w-1/2 lg:w-1/3">
            <Card isPC={isPC} {...project} />
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center my-10">
        <Pagination />
      </div>
    </main>
  );
};

export default Projects;
