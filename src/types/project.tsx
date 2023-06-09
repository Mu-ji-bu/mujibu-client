import { projectFormEnum } from '@/libraries/enum';

export declare interface IProjectState {
  projectName: string;
  isFollow: boolean;
}

interface IPlanState {
  isRealProduct?: boolean;
  otherNotes?: string[];
  planDescription?: string;
  planDiscountPrice?: string;
  planEndTime?: string;
  planImage?: string;
  planName?: string;
  planOriginalPrice?: string;
  planQuantity?: number;
  planStartTime?: string;
  planType?: string;
  _id?: string;
}

interface ITeamState {
  companyAddress?: string;
  companyName?: string;
  companyPhone?: string;
  companyRegistrationNumber?: string;
  representativeEmail?: string;
  representativeMobile?: string;
  representativeName?: string;
  representativePhone?: string;
  socialEmail?: string;
  socialFb?: string;
  socialIg?: string;
  socialLine?: string;
  socialWebsite?: string;
  socialYoutube?: string;
  teamAvatar?: string;
  teamIntroduction?: string;
  teamName?: string;
}

interface IUserState {
  id?: string;
  name?: string;
}

interface IWithdrawalSettings {
  bankAccount?: string;
  bankName?: string;
}

interface IShippingSettings {
  shippingSwitch?: boolean;
  deliveryInfo?: {
    deliverySwitch?: boolean;
    deliveryFee?: number;
    multiProductCheckout?: number;
    freeShippingConditions?: number;
    freeShippingPrice?: number;
    senderName?: string;
    senderPhone?: string;
    senderAddress?: string;
  };
  cvsInfo?: {
    cvsSwitch?: boolean;
    deliveryFee?: number;
    multiProductCheckout?: number;
    freeShippingConditions?: number;
    freeShippingPrice?: number;
    cvsNamet?: number;
  };
}

export interface IProject {
  _id?: string;
  projectType?: number;
  projectForm?: number;
  projectStatus?: number;
  projectCategory?: number;
  projectName?: string;
  projectImage?: string;
  projectDescription?: string;
  goalAmount?: number;
  currentAmount?: number;
  currentAmountPercentage?: number;
  startTime?: Date | null;
  endTime?: Date | null;
  officialPage?: string;
  fanPage?: string;
  attachmentLink?: string;
  projectContent?: string;
  projectPlans?: IPlanState[];
  projectTeam?: ITeamState[];
  projectProposer?: IUserState;
  projectOrders?: any[];
  projectRefunds?: any[];
  latestNews?: any[];
  faqs?: any[];
  comments?: any[];
  projectFollowers?: IUserState[];
  projectScore?: number;
  projectBackers?: number;
  carousel?: boolean;
  withdrawalSettings?: IWithdrawalSettings;
  shippingSettings?: IShippingSettings;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface IProjectSelectFormData {
  projectForm: number;
  projectCategory: number;
  sortBy: string;
}
