import {createSlice} from '@reduxjs/toolkit';

import {removeAccessToken} from '~/utils/asyncstorage';

const initialState = {
  authData: {
    isLoggedIn: false,
    isLoginExpired: false,
  },
  userData: {
    _id: '61532fb61a574a1f44d396f0',
    phonenumber: '998971808707',
    isPhoneNumberVerified: true,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onLogin: state => {
      state.authData = {
        isLoggedIn: true,
        isLoginExpired: false,
      };
    },
    onLogout: state => {
      removeAccessToken().then(() => {
        state.authData = {
          isLoggedIn: false,
          isLoginExpired: true,
        };
      });
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    resetData: state => {
      console.log(state);
      return initialState;
    },
  },
});

export const {onLogin, onLogout, setUserData, resetData} = userSlice.actions;

export default userSlice.reducer;
