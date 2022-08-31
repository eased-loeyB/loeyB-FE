import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  Authentication,
  RegisteredCategoryAndTag,
  StardustRecords,
} from '~/apollo/generated';
import {saveToken} from '~/apollo/utils/auth';
import {removeAccessToken} from '~/utils/asyncstorage';

export interface AuthData {
  isLoggedIn: boolean;
  isLoginExpired: boolean;
}

export interface UserData {
  userName: string;
  categoryAndTags: RegisteredCategoryAndTag[];
  stardustRecords: StardustRecords[];
}

interface UserState {
  authData: AuthData;
  userData: UserData;
}

const initialState: UserState = {
  authData: {
    isLoggedIn: false,
    isLoginExpired: false,
  },
  userData: {
    userName: '',
    categoryAndTags: [],
    stardustRecords: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onLogin: (state, action: PayloadAction<Authentication>) => {
      saveToken(action.payload).then(() => {
        state.authData = {
          ...state.authData,
          isLoggedIn: true,
        };
        state.userData = {
          ...state.userData,
          userName: action.payload.userName || '',
        };
      });
    },
    onLogout: state => {
      removeAccessToken().then(() => {
        state.authData = {
          isLoggedIn: false,
          isLoginExpired: true,
        };
        state.userData = initialState.userData;
      });
    },
    resetData: state => {
      console.log(state);
      return initialState;
    },
    updateUserData: (state, action: PayloadAction<Partial<UserData>>) => {
      state.userData = {
        ...state.userData,
        ...action.payload,
      };
    },
  },
});

export const {onLogin, onLogout, resetData, updateUserData} = userSlice.actions;

export default userSlice.reducer;
