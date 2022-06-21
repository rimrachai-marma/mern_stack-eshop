import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import authtUiSlice from './auth-ui-slice';
import cartSlice from './cart-slice';
import cartUiSlice from './cart-ui-slice';
import {
  orderDetailesSlice,
  ordersSlice,
  orderUpdateToPaidSlice,
  userOrdersSlice
} from './order-slice';
import {
  getAllProductSclice,
  getSingleProductSlice,
  getTopProductSclice
} from './product-slice';
import shippingAndPaymentSlice from './shippingAndPayment-slice';
import { allUserSlice, getUserDetailsSlice } from './user-slice';

// const cartDataFromStorage = localStorage.getItem('cart')
//   ? JSON.parse(localStorage.getItem('cart'))
//   : {
//       items: [],
//       totalQuantity: 0,
//       totalAmount: 0,
//       changed: false
//     };

const authDataFromStorage = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : {
      token: '',
      userInfo: {}
    };

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {
      shippingAddress: {}
    };

const preloadedState = {
  // cart: cartDataFromStorage,
  auth: authDataFromStorage,
  shippingAndPaymentinfo: shippingAddressFromStorage
};

const reducer = {
  productsData: getAllProductSclice.reducer,
  product: getSingleProductSlice.reducer,
  cart: cartSlice.reducer,
  cartUi: cartUiSlice.reducer,
  auth: authSlice.reducer,
  authUi: authtUiSlice.reducer,
  userDetails: getUserDetailsSlice.reducer,
  shippingAndPaymentinfo: shippingAndPaymentSlice.reducer,
  orderDetailes: orderDetailesSlice.reducer,
  orderPay: orderUpdateToPaidSlice.reducer,
  userOrders: userOrdersSlice.reducer,
  users: allUserSlice.reducer,
  orders: ordersSlice.reducer,
  topProducts: getTopProductSclice.reducer
};

const store = configureStore({
  reducer,
  preloadedState
});

export default store;
