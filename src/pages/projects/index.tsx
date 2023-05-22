import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@/components/block/card';

let data: { id: number; projectType: string; projectName: string }[] = [];
for (let i = 0; i < 12; i++) {
  data.push({
    id: i,
    projectType: 'InProgress',
    projectName: 'Balance衡壓坐墊｜市場唯一衡壓概念健康坐墊，坐出 Q 軟好體態！',
  });
}

const Projects = () => {
  const isPC = useMediaQuery('(min-width:768px)'); //tailwind breakpoint md

  return (
    <main className="max-w-screen-xl mx-auto p-5">
      <div className="flex flex-wrap justify-between gap-4 px-4">
        {data.map((project) => (
          <div key={project.id} className="-mx-4 w-full md:w-1/2 lg:w-1/3">
            <Card isPC={isPC} {...project} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Projects;
