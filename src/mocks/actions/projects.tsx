// 1.0 探索 MOCK API
import { rest } from 'msw';
import apiRoutes, { baseURL } from '@routes/apiRoutes';
import { getRandomNumber } from '@/libraries/utils';

const getProjectData = rest.get(`${baseURL}${apiRoutes.projectsURL}`, (req, res, ctx) => {
  const mockData = {
    status: 'Success', //必要key, 固定value
    data: {
      //選用key, value型態為jobject, 可自訂內容
      projects: generateData(),
    },
  };

  return res(ctx.status(200), ctx.delay(1600), ctx.json(mockData));
});

const getProjectDataAPI = [getProjectData];

export default getProjectDataAPI;

function generateData() {
  const projects = [];

  for (let i = 0; i < 6; i++) {
    const currentAmount = getRandomNumber(0, 10000);
    const targetAmount = 10000;
    const progress = (currentAmount / targetAmount) * 100;
    const project = {
      id: String(i),
      image: `/${i < 3 ? 'slides' : 'shop'}/Desktop_${i < 3 ? 'slides' : 'shop'}_${(i % 3) + 1}@2x.png`,
      category: 'Technology',
      projectName: 'Balance衡壓坐墊｜市場唯一衡壓概念健康坐墊，坐出 Q 軟好體態！',
      projectTeam: 'Team 1',
      proposer: 'John Doe',
      description: 'Project 1 is a revolutionary new app that will change the way you think about...',
      currentAmount: (currentAmount / 1000).toFixed(1),
      targetAmount: (targetAmount / 1000).toFixed(1),
      progress,
      backers: getRandomNumber(0, 100),
      prize: 500,
      startTime: '2023-05-01T00:00:00Z',
      endTime: '2023-06-30T23:59:59Z',
      remainingTime: '58 days',
      projectType: 0, // "long-term"
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
