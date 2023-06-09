import { IUserState } from './user';
import { IProjectState } from './project';
import { IPlanState } from './plan';
import { ITeamState } from './team';

export declare interface IInitialState {
  userState: IUserState;
  projectState: IProjectState;
  planState: IPlanState;
  teamState: ITeamState;
}
