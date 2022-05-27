import {useMutation} from '@apollo/client';
import {useState} from 'react';
import {SET_USER_NAME} from '../../../apollo/mutations/auth';
import {isSuccessResponse} from '../../../models/CommonResponse';

export const useSetName = () => {
  const [errorCode, setErrorCode] = useState('');
  const [responseData, setResponeData] = useState();

  const [request, {loading}] = useMutation(SET_USER_NAME, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    onCompleted: res => {
      if (isSuccessResponse(res.setUsername)) {
        setResponeData(res.setUsername);
      } else {
        setErrorCode(res.setUsername.result);
      }
    },
  });

  return {request, loading, errorCode, responseData};
};
