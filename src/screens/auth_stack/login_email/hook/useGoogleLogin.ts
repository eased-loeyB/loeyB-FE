import {useState} from 'react';

import {useMutation} from '@apollo/client';

import {GOOGLE_LOGIN} from '~/apollo/mutations/auth';
import {AuthResponse} from '~/models/Auth';
import {isSuccessResponse} from '~/models/CommonResponse';

export const useGoogleLogin = () => {
  const [errorCode, setErrorCode] = useState('');
  const [responseData, setResponeData] = useState<AuthResponse>();

  const [request, {loading}] = useMutation<{googleLogin: AuthResponse}>(
    GOOGLE_LOGIN,
    {
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      onCompleted: res => {
        console.log(res);
        if (isSuccessResponse(res.googleLogin)) {
          setResponeData(res.googleLogin);
        } else {
          setErrorCode(res.googleLogin.result);
        }
      },
    },
  );

  return {request, loading, errorCode, responseData};
};
