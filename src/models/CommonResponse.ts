export interface CommonResponse {
  result: string;
  errorMessage: string;
}

export const isSuccessResponse = (res: CommonResponse) => {
  return ['SUCCESS', 'success'].includes(res.result ?? '');
};
