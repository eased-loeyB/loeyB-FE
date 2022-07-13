import {CommonResponse} from '../CommonResponse';

export interface LoeybUser {
  id: string;
  email: string;
  userName: string;
}

export interface LoeybUserResponse extends CommonResponse {
  data: LoeybUser;
}

export interface ListLoeybUserResponse extends CommonResponse {
  data: LoeybUser[];
}
