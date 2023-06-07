// 1.0 探索 MOCK API
import { rest } from 'msw';
import apiRoutes, { baseURL } from '@routes/apiRoutes';
import { getRandomNumber } from '@/libraries/utils';
import { projectTypeEnum, projectStatusEnum } from '@/libraries/enum';

const getProjectData = rest.get(`${baseURL}${apiRoutes.projectsURL}`, (req, res, ctx) => {
  const total = 10;
  const projects = generateData(total);
  const mockData = {
    status: 'Success', //必要key, 固定value
    //選用key, value型態為jobject, 可自訂內容
    data: projects,
    total,
  };

  return res(ctx.status(200), ctx.delay(1600), ctx.json(mockData));
});

const getProjectDataAPI = [getProjectData];

export default getProjectDataAPI;

function generateData(total: number) {
  const projects = [];

  for (let i = 0; i < total; i++) {
    const currentAmount = getRandomNumber(0, 10000);
    const targetAmount = 10000;
    const progress = (currentAmount / targetAmount) * 100;
    const project = {
      _id: String(i),
      projectTeamId: String(i),
      proposer: 'John Doe',
      projectVisual: `/${i < 3 ? 'slides' : 'shop'}/Desktop_${i < 3 ? 'slides' : 'shop'}_${(i % 3) + 1}@2x.png`,
      projectName: 'Balance衡壓坐墊｜市場唯一衡壓概念健康坐墊，坐出 Q 軟好體態！',
      startTime: '2023-05-01T00:00:00Z',
      endTime: '2023-06-30T23:59:59Z',
      projectType: projectTypeEnum.LONG_TERM, // "long-term"
      projectStatus: projectStatusEnum.FUNDRAISING,
      projectForm: 1,
      category: 'Technology',
      projectTeam: 'Team 1',
      description: 'Project 1 is a revolutionary new app that will change the way you think about...',
      currentAmount: (currentAmount / 1000).toFixed(1),
      targetAmount: (targetAmount / 1000).toFixed(1),
      progress,
      backers: getRandomNumber(0, 100),
      prize: 500,
      currentAmountPercentage: '61',
      plans: [
        {
          id: '1',
          name: 'Early Bird Plan',
          description: 'Get the app at a discounted price',
          minimumAmount: 10,
          maximumAmount: 50,
          remaining: getRandomNumber(0, 100),
          estimatedDelivery: '2023-08-01T00:00:00Z',
          discount: 20, // %
          earlyBirdEndDate: '2023-06-01T23:59:59Z',
        },
        {
          id: '2',
          name: 'Standard Plan',
          description: 'Get the app',
          minimumAmount: 50,
          maximumAmount: 100,
          remaining: getRandomNumber(0, 100),
          estimatedDelivery: '2023-09-01T00:00:00Z',
          discount: 0,
        },
        {
          id: '3',
          name: 'Premium Plan',
          description: 'Get the app and a t-shirt',
          minimumAmount: 100,
          maximumAmount: 200,
          remaining: getRandomNumber(0, 100),
          estimatedDelivery: '2023-10-01T00:00:00Z',
          discount: 10,
        },
      ],
    };

    projects.push(project);
  }

  return projects;
}
