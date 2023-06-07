export declare interface IProjectState {
  projectName: string;
  isFollow: boolean;
}

interface IProjectPlan {
  id: string;
  name: string;
  description: string;
  minimumAmount: number;
  maximumAmount: number;
  remaining: number;
  estimatedDelivery: string;
  discount?: number;
  earlyBirdEndDate?: string;
}

export interface IProject {
  _id: string;
  projectTeamId?: string;
  proposer: string;
  projectVisual: string;
  projectName: string;
  startTime: Date;
  endTime: Date;
  projectType: number;
  projectStatus: number;
  projectForm: number;
  category: number;
  backers: number;
  currentAmount: number;
  targetAmount: number;
  projectUrl: string;
  projectTeam: string;
  projectContent?: string;
  score?: string;
  carousel?: boolean;
  currentAmountPercentage?: number;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  plans?: IProjectPlan[];
}

export interface IProjectSelectFormData {
  projectType: number;
  category: number;
  sortBy: string;
}
