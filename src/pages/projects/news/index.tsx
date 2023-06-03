import ProjectsLayout from '@/components/layout/ProjectsLayout';
import Message from '@/components/pages/projects/message';
import ProjectPlan from '@/components/pages/projects/ProjectPlan';

const News = () => {
  const message1 = {
    text: 'this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.',
    time: '2023/03/10 10:00',
    title: '標題標題好眠城實木床組配送進度通知',
  };
  const message2 = {
    text: 'this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.',
    time: '2023/03/10 10:00',
    title: '標題標題好眠城實木床組配送進度通知',
  };
  const message3 = {
    text: 'this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.this is my message.',
    time: '2023/03/10 10:00',
    title: '標題標題好眠城實木床組配送進度通知',
  };

  return (
    <ProjectsLayout>
      <div className="details w-full flex justify-center gap-6">
        <div className="flex flex-col w-2/3 gap-8">
          <Message {...message1} />
          <Message {...message2} />
          <Message {...message3} />
        </div>
        <div className="w-1/3 flex flex-col gap-6">
          <ProjectPlan />
          <ProjectPlan />
          <ProjectPlan />
        </div>
      </div>
    </ProjectsLayout>
  );
};

export default News;
