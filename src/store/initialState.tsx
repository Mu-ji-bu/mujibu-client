interface UserState {
  readonly id: string;
  avatar?: string;
  name: string;
  nickname?: string;
  birthday?: string;
  gender?: number;
  email: string;
  phone?: string;
  subscribeNewsletter?: boolean;
  category?: string[];
  contactName?: string;
  contactPhone?: string;
  city?: string;
  district?: string;
  postalCode?: string;
  address?: string;
  readonly createdAt: number;
}

interface ProjectState {
  projectName: string;
  isFollow: boolean;
}

interface InitialState {
  userState: UserState;
  projectState: ProjectState;
}

const initialState: InitialState = {
  userState: {
    id: 'uid',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
    name: 'Melon Hung',
    nickname: 'Melon',
    birthday: '1995-04-21',
    gender: 1,
    email: 'melon@gmail.com',
    phone: '0930258318',
    subscribeNewsletter: true,
    category: ['音樂', '藝術', '科技'],
    contactName: 'Melon Hung',
    contactPhone: '0930258318',
    city: '台北市',
    district: '大安區',
    postalCode: '106',
    address: '忠孝東路四段100號',
    createdAt: 1672195200,
  },
  projectState: {
    projectName: '專案名稱...',
    isFollow: false,
  },
};

export default initialState;
export const { projectState, userState } = initialState;
