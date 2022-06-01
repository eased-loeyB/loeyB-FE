import {useQuery} from '@apollo/client';
import {useState} from 'react';
import {FETCH_REGISTERED_AREA_CATEGORY_TAG} from 'apollo/queries/memory';
import {
  RegisterCategoryAndTagAndArea,
  RegisterCategoryAndTagAndAreaResponse,
} from 'models/Memory/register_category_and_tag';
import {isSuccessResponse} from 'models/CommonResponse';

export const useFetchRegisteredAreaAndCategoryAndTag = () => {
  const [errorCode, setErrorCode] = useState('');
  const [responseData, setResponseData] = useState<
    RegisterCategoryAndTagAndArea[]
  >([]);

  const {loading} = useQuery<RegisterCategoryAndTagAndAreaResponse>(
    FETCH_REGISTERED_AREA_CATEGORY_TAG,
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
