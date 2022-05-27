import {useMutation} from '@apollo/client';
import {useState} from 'react';
import {GOOGLE_LOGIN} from '../../../../apollo/mutations/auth';
import {isSuccessResponse} from '../../../../models/CommonResponse';

export const useGoogleLogin = () => {
  const [errorCode, setErrorCode] = useState('');
  const [responseData, setResponeData] = useState();

  const [request, {loading}] = useMutation(GOOGLE_LOGIN, {
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
  });

  return {request, loading, errorCode, responseData};
};
