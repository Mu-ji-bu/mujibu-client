import type { IInitialState } from '../types';
const initialState: IInitialState = {
  userState: {
    _id: '',
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
    collects: [],
    orders: [],
    teams: { defaultTeam: {}, list: [] },
    notifications: [],
    contactName: '',
    contactPhone: '',
    city: '',
    district: '',
    postalCode: '',
    address: '',
    role: '',
    createdAt: null,
    updatedAt: null,
  },
  projectState: {
    _id: '',
    projectType: 0,
    projectForm: 0,
    projectStatus: 0,
    projectCategory: 0,
    projectName: '',
    projectImage: '',
    projectDescription: '',
    goalAmount: 0,
    currentAmount: 0,
    currentAmountPercentage: 0,
    startTime: null, //Date
    endTime: null, //Date
    officialPage: '',
    fanPage: '',
    attachmentLink: '',
    projectContent: '',
    projectPlans: [
      {
        _id: '',
        planName: '',
        planType: '',
        planQuantity: 0,
        planDiscountPrice: 0,
        planOriginalPrice: 0,
        planStartTime: null, //Date
        planEndTime: null, //Date
        planImage: '',
        planDescription: '',
        otherNotes: [],
        isRealProduct: true,
        createdAt: null,
        updatedAt: null,
      },
    ],
    projectTeam: {
      _id: '',
      projects: [],
      user: {},
      teamName: '',
      teamIntroduction: '',
      teamAvatar: '',
      representativeName: '',
      representativeMobile: '',
      representativePhone: '',
      representativeEmail: '',
      companyName: '',
      companyPhone: '',
      companyRegistrationNumber: '',
      companyAddress: '',
      socialWebsite: '',
      socialEmail: '',
      socialFb: '',
      socialLine: '',
      socialIg: '',
      socialYoutube: '',
      isTaiwan: false,
      isAgreeTerms: false,
      isOver18: false,
      createdAt: null,
      updatedAt: null,
    },
    projectProposer: {},
    projectOrders: [],
    projectRefunds: [],
    latestNews: [],
    faqs: [],
    comments: [],
    projectFollowers: [],
    projectScore: 0,
    projectBackers: 0,
    carousel: false,
    withdrawSettings: {
      bankName: '',
      accountNumber: '',
      isAgreeTerms: false,
    },
    shippingSettings: {
      shippingSwitch: false,
      deliveryInfo: {
        deliverySwitch: false,
        deliveryFee: 100,
        multiProductCheckout: 0,
        freeShippingConditions: 1,
        freeShippingPrice: 1000,
        senderName: '',
        senderPhone: '',
        senderAddress: '',
      },
      cvsInfo: {
        cvsSwitch: false,
        deliveryFee: 70,
        multiProductCheckout: 0,
        freeShippingConditions: 1,
        freeShippingPrice: 1000,
        cvsName: 0,
      },
    },
    createdAt: null,
    updatedAt: null,
  },
  planState: {
    _id: '',
    planName: '',
    planType: '',
    planQuantity: 0,
    planDiscountPrice: 0,
    planOriginalPrice: 0,
    planStartTime: null, //Date
    planEndTime: null, //Date
    planImage: '',
    planDescription: '',
    otherNotes: [],
    isRealProduct: true,
    createdAt: null,
    updatedAt: null,
  },
  teamState: {
    _id: '',
    projects: [],
    user: {},
    teamName: '',
    teamIntroduction: '',
    teamAvatar: '',
    representativeName: '',
    representativeMobile: '',
    representativePhone: '',
    representativeEmail: '',
    companyName: '',
    companyPhone: '',
    companyRegistrationNumber: '',
    companyAddress: '',
    socialWebsite: '',
    socialEmail: '',
    socialFb: '',
    socialLine: '',
    socialIg: '',
    socialYoutube: '',
    createdAt: null,
    updatedAt: null,
  },
};

export default initialState;
export const { projectState, userState, planState, teamState } = initialState;
