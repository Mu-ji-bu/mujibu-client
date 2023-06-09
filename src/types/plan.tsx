import type { IProjectState } from './project';

export declare interface IPlanState {
  _id?: string;
  project?: IProjectState;
  planOrders?: any[]; // 還未建立先放any[]替代
  planName?: string;
  planType?: string;
  planDiscountPrice?: number;
  planOriginalPrice?: number;
  planImage?: string;
  planQuantity?: number;
  planStartTime?: Date | null;
  planEndTime?: Date | null;
  planDescription?: string;
  planNotes?: string[];
  isRealProduct?: boolean;
  otherNotes?: string[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
