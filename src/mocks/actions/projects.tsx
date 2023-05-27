// 1.0 探索 MOCK API
import { rest } from 'msw';
import apiRoutes, { baseURL } from '@routes/apiRoutes';

const getProjectData = rest.get(`${baseURL}${apiRoutes.projectsURL}`, (req, res, ctx) => {
  const backers = Math.floor(Math.random() * 50);
  const mockData = {
    status: 'Success', //必要key, 固定value
    data: {
      //選用key, value型態為jobject, 可自訂內容
      projects: [
        {
          id: '1',
          image: 'http://localhost:3000/slides/Mobile_slides_3@2x.png',
          category: 'Technology',
          projectName: 'Balance衡壓坐墊｜市場唯一衡壓概念健康坐墊，坐出 Q 軟好體態！',
          projectTeam: 'Team 1',
          proposer: 'John Doe',
          description: 'Project 1 is a revolutionary new app that will change the way you think about...',
          currentAmount: 5000,
          targetAmount: 10000,
          progress: 50,
          backers,
          prize: 500,
          startTime: '2023-05-01T00:00:00Z',
          endTime: '2023-06-30T23:59:59Z',
          remainingTime: '58 days',
          projectType: 'InProgress', // "long-term"
          plans: [
            {
              id: '1',
              name: 'Early Bird Plan',
              description: 'Get the app at a discounted price',
              minimumAmount: 10,
              maximumAmount: 50,
              remaining: 100,
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
              remaining: 50,
              estimatedDelivery: '2023-09-01T00:00:00Z',
              discount: 0,
            },
            {
              id: '3',
              name: 'Premium Plan',
              description: 'Get the app and a t-shirt',
              minimumAmount: 100,
              maximumAmount: 200,
              remaining: 20,
              estimatedDelivery: '2023-10-01T00:00:00Z',
              discount: 10,
            },
          ],
        },
      ],
    },
  };

  return res(ctx.status(200), ctx.delay(1600), ctx.json(mockData));
});

export default [getProjectData];
