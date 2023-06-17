import { IProjectState } from './project';

export declare interface IPlanState {
  _id?: string;
  project?: string; // 討論後刪去
  planOrders?: any[];
  planName?: string;
  planType?: string;
  planDiscountPrice: number;
  planOriginalPrice: number;
  planImage?: string;
  planQuantity?: number;
  planStartTime?: Date | null;
  planEndTime?: Date | null;
  planDescription?: string;
  planNotes?: string[]; // 討論後刪去
  otherNotes?: any[]; // 取代 planNotes
  planBackers?: number; // 新增
  isRealProduct?: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
