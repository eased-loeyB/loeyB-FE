import {useQuery} from '@apollo/client';
import {useState} from 'react';
import {FETCH_REGISTER_CATEGORY_AND_TAG} from '../../../../apollo/queries/memory';
import {
  RegisterCategoryAndTag,
  RegisterCategoryAndTagResponse,
} from '../../../../models/Memory/register_category_and_tag';
import {isSuccessResponse} from '../../../../models/CommonResponse';


export const useFetchRegisteredCategoryAndTag = () => {
  const [errorCode, setErrorCode] = useState('');
  const [responseData, setResponseData] = useState<RegisterCategoryAndTag[]>();

  const {loading} = useQuery<RegisterCategoryAndTagResponse>(
    FETCH_REGISTER_CATEGORY_AND_TAG,
    {
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      onCompleted: res => {
        if (isSuccessResponse(res)) {
          setResponseData(res.data);
        } else {
          setErrorCode(res.errorMessage);
        }
      },
    },
  );

  return {loading, errorCode, responseData};
};
