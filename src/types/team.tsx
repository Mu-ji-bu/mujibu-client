import type { IProjectState } from './project';
import type { IUserState } from './user';

export declare interface ITeamState {
  _id?: string;
  projects?: IProjectState[];
  user?: IUserState;
  teamName?: string;
  teamIntroduction?: string;
  teamAvatar?: string;
  representativeName?: string;
  representativeMobile?: string;
  representativePhone?: string;
  representativeEmail?: string;
  companyName?: string;
  companyPhone?: string;
  companyRegistrationNumber?: string;
  companyAddress?: string;
  socialWebsite?: string;
  socialEmail?: string;
  socialFb?: string;
  socialLine?: string;
  socialIg?: string;
  socialYoutube?: string;
  isTaiwan?: boolean;
  isAgreeTerms?: boolean;
  isOver18?: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
