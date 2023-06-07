export declare interface IBasicInformation {
  projectType: number;
  projectName: string;
  projectDescription: string;
  projectCoverImage: string;
  category: number;
  fundraisingGoal: string;
  startTime: string;
  endTime: string;
  officialWebsite: string;
  fanPage: string;
  attachmentLink: string;
  projectContent: string;
}

export declare interface IFeedbackPlan {
  planName: string;
  planType: string;
  planQuantity: string;
  planPrice: string;
  futureSellingPrice: string;
  startTime: string;
  endTime: string;
  planImage: string;
  planDescription: string;
  otherNotes: string[];
}

export declare interface IRepresentativeData {
  name: string;
  email: string;
  mobileNumber: string;
  phoneNumber: string;
}

export declare interface WithdrawalSettings {
  WithdrawalBank: string;
  bankAccount: string;
}

export declare interface HomeDeliveryInformation {
  homeDeliverySwitch: boolean;
  shippingFee: number;
  multiProductCheckout: number;
  freeShippingConditions: number;
  freeShippingThreshold: number;
  senderName: string;
  mobileNumber: string;
  postalCode: string;
  address: string;
  withdrawalBank: string;
  bankAccount: string;
}

export declare interface ConvenienceInformation {
  convenienceStorePickupSwitch: boolean;
  shippingFee: number;
  multiProductCheckout: number;
  freeShippingConditions: number;
  freeShippingThreshold: number;
  partnerConvenienceStore: string;
}

export declare interface ProductSettings {
  logisticsSettings: boolean;
  homeDeliveryInformation: HomeDeliveryInformation;
  convenienceInformation: ConvenienceInformation;
}

export declare interface CompanyData {
  companyName: string;
  companyPhone: string;
  taxId: string;
  companyLocation: string;
  postalCode: string;
  address: string;
}

export declare interface TeamIntroduction {
  teamName: string;
  teamIntroduction: string;
  teamImage: string;
  companyData?: CompanyData;
}

export declare interface ProposalData {
  basicInformation: IBasicInformation;
  representative: IRepresentativeData;
  withdrawalSettings: WithdrawalSettings;
  productSettings?: ProductSettings;

  feedbackPlan: IFeedbackPlan[];
  teamIntroduction: TeamIntroduction;
}

const defaultData: ProposalData = {
  basicInformation: {
    projectType: 0,
    projectName: '',
    projectDescription: '',
    projectCoverImage: '',
    category: 0,
    fundraisingGoal: '',
    startTime: '',
    endTime: '',
    officialWebsite: '',
    fanPage: '',
    attachmentLink: '',
    projectContent: '',
  },
  feedbackPlan: [
    {
      planName: '',
      planType: '',
      planQuantity: '',
      planPrice: '',
      futureSellingPrice: '',
      startTime: '',
      endTime: '',
      planImage: '',
      planDescription: '',
      otherNotes: [],
    },
  ],
  teamIntroduction: {
    teamName: '',
    teamIntroduction: '',
    teamImage: '',
  },
  representative: {
    name: '',
    email: '',
    mobileNumber: '',
    phoneNumber: '',
  },
  withdrawalSettings: {
    WithdrawalBank: '',
    bankAccount: '',
  },
  productSettings: {
    logisticsSettings: false,
    homeDeliveryInformation: {
      homeDeliverySwitch: false,
      shippingFee: 100,
      multiProductCheckout: 0,
      freeShippingConditions: 1,
      freeShippingThreshold: 1000,
      senderName: '',
      mobileNumber: '',
      postalCode: '',
      address: '',
      withdrawalBank: '',
      bankAccount: '',
    },
    convenienceInformation: {
      convenienceStorePickupSwitch: false,
      shippingFee: 70,
      multiProductCheckout: 0,
      freeShippingConditions: 1,
      freeShippingThreshold: 1000,
      partnerConvenienceStore: '711',
    },
  },
};
