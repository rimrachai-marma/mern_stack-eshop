import { createSlice } from '@reduxjs/toolkit';

const authtUiSlice = createSlice({
  name: 'auth ui',
  initialState: {
    loginError: null,
    signUpError: null,
    pending: false
  },
  reducers: {
    setUI(state, action) {
      state.loginError = action.payload.loginError;
      state.signUpError = action.payload.signUpError;
      state.pending = action.payload.pending;
    }
  }
});

export const authUiActions = authtUiSlice.actions;

export default authtUiSlice;
