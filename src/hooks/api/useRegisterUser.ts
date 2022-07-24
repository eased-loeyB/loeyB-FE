import {useState} from 'react';

import {useMutation} from '@apollo/client';

import {REGISTER_USER} from '~/apollo/mutations/auth';
import {AuthData, AuthResponse} from '~/models/Auth';
import {isSuccessResponse} from '~/models/CommonResponse';

export const useRegisterUser = () => {
  const [errorCode, setErrorCode] = useState('');
  const [responseData, setResponeData] = useState<AuthData>();

  const [registerUser, {data, loading, error}] = useMutation<AuthResponse>(
    REGISTER_USER,
    {
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      onCompleted: res => {
        console.log(res);
        if (isSuccessResponse(res)) {
          setResponeData(res.data);
        } else {
          setErrorCode(res.errorMessage);
        }
      },
    },
  );

  return {registerUser, data, loading, error, errorCode, responseData};
};
