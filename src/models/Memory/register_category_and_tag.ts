import {CommonResponse} from '../CommonResponse';

export interface RegisterCategoryAndTag {
  category: string;
  tag: string;
}

export interface RegisterCategoryAndTagAndArea extends RegisterCategoryAndTag {
  area: string;
}

export interface RegisterCategoryAndTagResponse extends CommonResponse {
  data: RegisterCategoryAndTag[];
}

export interface RegisterCategoryAndTagAndAreaResponse extends CommonResponse {
  data: RegisterCategoryAndTagAndArea[];
}
