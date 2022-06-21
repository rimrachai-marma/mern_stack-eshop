import { createSlice } from '@reduxjs/toolkit';

const cartUiSlice = createSlice({
  name: 'cart ui',
  initialState: { notification: null },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message
      };
    }
  }
});

export const cartUiActions = cartUiSlice.actions;

export default cartUiSlice;
