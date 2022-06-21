import { createSlice } from '@reduxjs/toolkit';

const shippingAndPaymentSlice = createSlice({
  name: 'shipping & payment info',
  initialState: {
    shippingAddress: {}
  },
  reducers: {
    addShippingAddress(state, action) {
      state.shippingAddress = action.payload;
    }
  }
});

export const shippingAndPaymentActions = shippingAndPaymentSlice.actions;

export default shippingAndPaymentSlice;
