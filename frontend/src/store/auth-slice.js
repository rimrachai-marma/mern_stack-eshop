import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    userInfo: {}
  },
  reducers: {
    register(state, action) {
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },
    login(state, action) {
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },
    logout(state) {
      state.token = '';
      state.userInfo = {};
    }
  }
});

export const authAction = authSlice.actions;

export default authSlice;
