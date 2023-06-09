import { projectFormEnum } from '@/libraries/enum';
import type { IUserState } from './user';
import type { IPlanState } from './plan';
import type { ITeamState } from './team';

export declare interface DeliveryInfo {
  deliverySwitch?: boolean;
  deliveryFee?: number;
  multiProductCheckout?: number;
  freeShippingConditions?: number;
  freeShippingPrice?: number;
  senderName?: string;
  senderPhone?: string;
  senderAddress?: string;
}

export declare interface CvsInfo {
  cvsSwitch?: boolean;
  deliveryFee?: number;
  multiProductCheckout?: number;
  freeShippingConditions?: number;
  freeShippingPrice?: number;
  cvsName?: number;
}

export declare interface ShippingSettings {
  shippingSwitch?: boolean;
  deliveryInfo?: DeliveryInfo;
  cvsInfo?: CvsInfo;
}

export declare interface WithdrawalSettings {
  WithdrawalBank?: string;
  bankAccount?: string;
}

export declare interface IProjectState {
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
  projectTeam?: ITeamState;
  projectProposer?: IUserState;
  projectOrders?: any[]; // 還未建立先放any[]替代
  projectRefunds?: any[]; // 還未建立先放any[]替代
  latestNews?: any[]; // 還未建立先放any[]替代
  faqs?: any[]; // 還未建立先放any[]替代
  comments?: any[]; // 還未建立先放any[]替代
  projectFollowers: IUserState[];
  projectScore?: number;
  projectBackers?: number;
  carousel?: boolean;
  withdrawalSettings?: WithdrawalSettings;
  shippingSettings?: ShippingSettings;
  createdAt?: Date | null;
  updatedAt?: Date | null;
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
