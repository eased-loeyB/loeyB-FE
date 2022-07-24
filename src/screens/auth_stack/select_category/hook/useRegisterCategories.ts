import {useState} from 'react';

import {useMutation} from '@apollo/client';

import {REGISTER_CATEGORIES} from '~/apollo/mutations/memory';
import {isSuccessResponse} from '~/models/CommonResponse';

export type LoeybAreaType = 'HEALTH' | 'MIND' | 'SOCIAL' | 'HOBBY' | 'WORK';

export type LoeybCategoryType =
  | 'FOOD'
  | 'EXERCISE'
  | 'SICK'
  | 'MEDICINE'
  | 'THOUGHT'
  | 'EMOTION'
  | 'GOALS'
  | 'IDEAS'
  | 'FRIENDS'
  | 'FAMILY'
  | 'PETS'
  | 'COWORKER'
  | 'FASHION'
  | 'MUSIC'
  | 'ART'
  | 'BOOKS'
  | 'VIDEO'
  | 'TRAVEL'
  | 'SPORTS'
  | 'PROJECT'
  | 'SCHOOL'
  | 'SKILL'
  | 'COMPANY'
  | 'AWARD';

export interface AreaCategoryInput {
  area: LoeybAreaType;
  category: string;
}

export const useRegisterCategories = (name: string) => {
  const [errorCode, setErrorCode] = useState('');
  const [responseData, setResponeData] = useState();

  const [registerUser, {data, loading, error}] = useMutation(
    REGISTER_CATEGORIES,
    {
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      onCompleted: res => {
        console.log('Res', res);
        if (isSuccessResponse(res.registerUser)) {
          setResponeData(res.requestEmailVerificationCode);
        } else {
          setErrorCode(res.requestEmailVerificationCode);
        }
      },
    },
  );

  const updateData = (areaCategory: AreaCategoryInput[]) => {
    registerUser({
      variables: {
        name: name,
        areaCategory: areaCategory,
      },
    });
  };

  return {updateData, data, loading, error, errorCode, responseData};
};
