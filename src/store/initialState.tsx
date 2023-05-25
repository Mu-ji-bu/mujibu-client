import type { IInitialState } from '../types';
const initialState: IInitialState = {
  userState: {
    id: '',
    avatar: '',
    email: '',
    name: '',
    nickname: '',
    birthDate: '',
    gender: '',
    phone: '',
    subscribeNewsletter: false,
    isEmailVerified: false,
    category: [],
    contactName: '',
    contactPhone: '',
    city: '',
    district: '',
    postalCode: '',
    address: '',
    role: '',
    createdAt: null,
  },
  projectState: {
    projectName: '',
    isFollow: false,
  },
};

export default initialState;
export const { projectState, userState } = initialState;

// id: 'uid',
//     avatar: 'https://mui.com/static/images/avatar/1.jpg',
//     name: 'Melon Hung',
//     nickname: 'Melon',
//     birthDate: '1995-04-21',
//     gender: 1,
//     email: 'melon@gmail.com',
//     phone: '0930258318',
//     subscribeNewsletter: true,
//     category: ['音樂', '藝術', '科技'],
//     contactName: 'Melon Hung',
//     contactPhone: '0930258318',
//     city: '台北市',
//     district: '大安區',
//     postalCode: '106',
//     address: '忠孝東路四段100號',
//     createdAt: 1672195200,
