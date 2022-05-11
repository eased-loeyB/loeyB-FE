import {useMutation} from '@apollo/client';
import {useState} from 'react';
import {REGISTER_USER} from '../../../apollo/mutations/auth';
import {isSuccessResponse} from '../../../models/CommonResponse';

export const useRegisterUser = () => {
  const [errorCode, setErrorCode] = useState('');
  const [responseData, setResponeData] = useState();

  const [registerUser, {data, loading, error}] = useMutation(REGISTER_USER, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    onCompleted: res => {
      console.log(res);
      if (isSuccessResponse(res.registerUser)) {
        setResponeData(res.requestEmailVerificationCode);
      } else {
        setErrorCode(res.requestEmailVerificationCode);
      }
    },
  });

  return {registerUser, data, loading, error, errorCode, responseData};
};
