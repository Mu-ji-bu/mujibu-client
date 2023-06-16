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

export declare interface withdrawSettings {
  bankName?: string;
  accountNumber?: string;
  isAgreeTerms?: boolean;
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
  withdrawSettings?: withdrawSettings;
  shippingSettings?: ShippingSettings;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface IProjectSelectFormData {
  projectForm: number;
  projectCategory: number;
  sortBy: string;
}
