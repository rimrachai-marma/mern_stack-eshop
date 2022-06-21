import axios from 'axios';

import { authAction } from './auth-slice';
import { authUiActions } from './auth-ui-slice';
import { ordersSlice } from './order-slice';

// user register
export const register = (name, email, password, gender) => {
  return async (dispatch, getState) => {
    dispatch(authUiActions.setUI({ pending: true }));

    const sendRequest = async () => {
      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return data;
    };

    try {
      const userInfo = await sendRequest();

      dispatch(
        authAction.register({
          token: userInfo.token,
          userInfo
        })
      );
      dispatch(authUiActions.setUI({ pending: false, signUpError: null }));
    } catch (error) {
      dispatch(
        authUiActions.setUI({
          pending: false,
          signUpError:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        })
      );
    }

    localStorage.setItem('auth', JSON.stringify(getState().auth));
  };
};

// user login
export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(authUiActions.setUI({ pending: true }));

    const sendRequest = async () => {
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return data;
    };

    try {
      const userInfo = await sendRequest();

      dispatch(
        authAction.login({
          token: userInfo.token,
          userInfo
        })
      );
      dispatch(authUiActions.setUI({ pending: false, loginError: null }));
    } catch (error) {
      dispatch(
        authUiActions.setUI({
          pending: false,
          loginError:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        })
      );
    }

    localStorage.setItem('auth', JSON.stringify(getState().auth));
  };
};

// user logout
export const logout = (token) => {
  return async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const sendRequest = async () => {
      const { data } = await axios.post('/api/users/logout', {}, config);

      return data;
    };

    try {
      await sendRequest();

      dispatch(authAction.logout());

      dispatch(ordersSlice.actions.rest);
      localStorage.removeItem('cart');
      localStorage.removeItem('auth');
      document.location.href = '/auth';
    } catch (error) {
      dispatch(authAction.logout());

      dispatch(ordersSlice.actions.rest);
      localStorage.removeItem('cart');
      localStorage.removeItem('auth');
      document.location.href = '/auth';
    }
  };
};

// user logout All divice
export const logoutAll = (token) => {
  return async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const sendRequest = async () => {
      const { data } = await axios.post('/api/users/logoutAll', {}, config);

      return data;
    };

    try {
      await sendRequest();

      dispatch(authAction.logout());

      dispatch(ordersSlice.actions.rest);
      localStorage.removeItem('cart');
      localStorage.removeItem('auth');
      document.location.href = '/auth';
    } catch (error) {
      dispatch(authAction.logout());

      dispatch(ordersSlice.actions.rest);
      localStorage.removeItem('cart');
      localStorage.removeItem('auth');
      document.location.href = '/auth';
    }
  };
};
