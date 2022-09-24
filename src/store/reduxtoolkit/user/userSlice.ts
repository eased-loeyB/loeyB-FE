import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  Authentication,
  RegisteredAreaAndCategoryAndTag,
  StardustRecords,
} from '~/apollo/generated';

export interface AuthData {
  isLoggedIn: boolean;
  isLoginExpired: boolean;
}

export interface UserData {
  userName: string;
  areaAndCategoryAndTags: RegisteredAreaAndCategoryAndTag[];
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
    areaAndCategoryAndTags: [],
    stardustRecords: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onLogin: (state, action: PayloadAction<Authentication>) => {
      state.authData = {
        ...state.authData,
        isLoggedIn: true,
      };
      state.userData = {
        ...state.userData,
        userName: action.payload.userName || '',
      };
    },
    onLogout: state => {
      state.authData = {
        isLoggedIn: false,
        isLoginExpired: true,
      };
      state.userData = initialState.userData;
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
