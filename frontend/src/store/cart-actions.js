import axios from 'axios';

import { cartActions } from './cart-slice';
import { cartUiActions } from './cart-ui-slice';

//fetching cart data from backend
export const fetchCartData = (token) => {
  return async (dispatch, getState) => {
    dispatch(cartActions.setCartStatus({ pending: true }));

    const fetchData = async () => {
      const { data } = await axios.get('/api/cart', {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      return data;
    };

    try {
      const cartData = await fetchData();

      dispatch(
        cartActions.replaceCart({
          items: cartData.cartItems || [],
          totalQuantity: cartData.totalQuantity || 0,
          totalAmount: cartData.totalAmount || 0
        })
      );
      dispatch(cartActions.setCartStatus({ pending: false }));
    } catch (err) {
      dispatch(
        cartUiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!'
        })
      );
      dispatch(cartActions.setCartStatus({ pending: false }));
    }

    localStorage.setItem('cart', JSON.stringify(getState().cart));
  };
};

//sending cart data to backend
export const sendCartData = (token, cart) => {
  return async (dispatch, getState) => {
    dispatch(
      cartUiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!'
      })
    );

    const sendRequest = async () => {
      await axios.put(
        '/api/cart',
        {
          cartItems: cart.items,
          totalQuantity: cart.totalQuantity,
          totalAmount: cart.totalAmount
        },

        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          }
        }
      );
    };

    try {
      await sendRequest();

      dispatch(
        cartUiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!'
        })
      );
    } catch (err) {
      dispatch(
        cartUiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!'
        })
      );
    }

    localStorage.setItem('cart', JSON.stringify(getState().cart));
  };
};
