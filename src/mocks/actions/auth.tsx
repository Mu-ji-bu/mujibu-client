// 3.0 登入 MOCK API
import { rest } from 'msw';
import apiRoutes, { baseURL } from '@routes/apiRoutes';

const patchUserInfo = rest.patch(`${baseURL}${apiRoutes.usersURL}/:id`, async (req, res, ctx) => {
  const payload = await req.json();
  const data = {
    avatar: 'https://lh3.googleusercontent.com/a/AGNmyxYFkJNkrb5qBoZ9Rnt9SnqLWqWH5scFmJwxhvqi=s96-c',
    name: 'test123',
    nickname: '',
    gender: 'other',
    phone: '',
    subscribeNewsletter: false,
    category: '',
    contactName: '',
    commentName: '',
    contactPhone: '',
    countryCode: '',
    postalCode: '',
    city: '',
    district: '',
    address: '',
    role: 'user',
    notifications: [],
    collects: [],
    isEmailVerified: true,
    email: '000testonly@gmail.com',
    createdAt: '2023-05-22T15:55:49.478Z',
    id: '646b9085d72263c1706b3a74',
    ...payload,
  };

  return res(ctx.status(200), ctx.delay(600), ctx.json(data));
});

export default [patchUserInfo];
