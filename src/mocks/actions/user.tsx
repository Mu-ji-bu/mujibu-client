import { rest } from 'msw';
import apiRoutes, { baseURL } from '@routes/apiRoutes';

const loginWithFirebaseGoogle = rest.post(`${baseURL}${apiRoutes.firebaseGoogleloginURL}`, (req, res, ctx) => {
  const data = {
    user: {
      subscribe_newsletter: false,
      role: 'user',
      notifications: [],
      collects: [],
      isEmailVerified: false,
      name: '專用測試',
      email: '000testonly@gmail.com',
      id: '646899e2e3c3ca003371212d',
    },
    tokens: {
      access: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDY4OTllMmUzYzNjYTAwMzM3MTIxMmQiLCJmaXJlYmFzZVVpZCI6Imo2em9OTmdUeTZZdmNxeFRQTmtNbG9oekdpWjIiLCJpYXQiOjE2ODUwMDU2MDMsImV4cCI6MTY4NTAwNzQwMywidHlwZSI6ImFjY2VzcyJ9.gPBZhL9wkCi7UXv3fb5keW83EOWRiDySD9Mu_MkS4tU',
        expires: '2023-05-25T09:36:43.450Z',
      },
      refresh: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDY4OTllMmUzYzNjYTAwMzM3MTIxMmQiLCJmaXJlYmFzZVVpZCI6Imo2em9OTmdUeTZZdmNxeFRQTmtNbG9oekdpWjIiLCJpYXQiOjE2ODUwMDU2MDMsImV4cCI6MTY4NzU5NzYwMywidHlwZSI6InJlZnJlc2gifQ.Jf2Zo-8apxcREmi8TypuYaPTboLle2Qa0N_pa80cZho',
        expires: '2023-06-24T09:06:43.452Z',
      },
    },
  };
  return res(ctx.status(200), ctx.delay(600), ctx.json(data));
});

export default [loginWithFirebaseGoogle];
