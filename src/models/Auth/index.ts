import {CommonResponse} from '../CommonResponse';

export interface AuthResponse extends CommonResponse {
  data: AuthData;
}

export interface AuthData {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
  refreshToken: string;
}
