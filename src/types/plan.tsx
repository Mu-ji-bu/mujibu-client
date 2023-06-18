// import { IProjectState } from './project';

export declare interface IPlanState {
  _id?: string;
  // project?: IProjectState; // 討論後刪去，暫存
  planOrders?: any[]; // 還未建立先放any[]替代
  planName?: string;
  planType?: string;
  planDiscountPrice: number;
  planOriginalPrice: number;
  planImage?: string;
  planQuantity?: number;
  planStartTime?: Date | null;
  planEndTime?: Date | null;
  planDescription?: string;
  otherNotes?: string[];
  planBackers?: number; // 新增
  isRealProduct?: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
