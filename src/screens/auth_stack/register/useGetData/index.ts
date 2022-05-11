import {useMutation} from '@apollo/client';
import {REQUEST_REGISTER_CODE} from '../../../../apollo/mutations/auth';
import {useEffect, useState} from 'react';
import ToastService from '../../../../utils/ToastService';
import {isSuccessResponse} from '../../../../models/CommonResponse';

export interface GetDataProps {
  email?: string;
}

export const useGetData = (params: GetDataProps) => {
  const [errorCode, setErrorCode] = useState('');

  const [requestCode, {data, loading, error}] = useMutation(
    REQUEST_REGISTER_CODE,
    {
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      onCompleted: res => {
        if (isSuccessResponse(res.requestEmailVerificationCode)) {
          ToastService.showSuccess('Please check your email');
        } else {
          setErrorCode(res.requestEmailVerificationCode.result);
        }
      },
    },
  );

  useEffect(() => {
    if (params.email) {
      requestCode({
        variables: {
          email: params.email,
        },
      });
    }
  }, []);

  const getContentData = () => {
    return data?.requestEmailVerificationCode
  }

  return {requestCode, data, loading, error, errorCode, getContentData};
};
