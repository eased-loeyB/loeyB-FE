import {createSlice} from '@reduxjs/toolkit';

const initialState = {
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
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    resetUserData: (state, action) => {
      console.log(state, action);
      return initialState;
    },
  },
});

export const {setUserData, resetUserData} = userSlice.actions;

export default userSlice.reducer;
