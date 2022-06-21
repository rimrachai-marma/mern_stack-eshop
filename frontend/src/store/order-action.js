import axios from 'axios';
import {
  orderDetailesSlice,
  ordersSlice,
  orderUpdateToPaidSlice,
  userOrdersSlice
} from './order-slice';

export const getOrderById = (id) => {
  return async (dispatch, getState) => {
    dispatch(orderDetailesSlice.actions.padding());

    const fetchData = async () => {
      const { token } = getState().auth;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.get(`/api/orders/${id}`, config);

      return data;
    };

    try {
      const order = await fetchData();

      dispatch(orderDetailesSlice.actions.succces({ order }));
    } catch (error) {
      dispatch(
        orderDetailesSlice.actions.fail({
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        })
      );
    }
  };
};

export const payOrder = (id, paymetResult) => {
  return async (dispatch, getState) => {
    dispatch(orderUpdateToPaidSlice.actions.padding());

    const updateTopay = async () => {
      const { token } = getState().auth;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.patch(
        `/api/orders/${id}/pay`,
        paymetResult,
        config
      );

      return data;
    };

    try {
      await updateTopay();

      dispatch(orderUpdateToPaidSlice.actions.succces());
    } catch (error) {
      dispatch(
        orderUpdateToPaidSlice.actions.fail({
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        })
      );
    }
  };
};

export const getMyOrders = () => {
  return async (dispatch, getState) => {
    dispatch(userOrdersSlice.actions.padding());

    const fetchData = async () => {
      const { token } = getState().auth;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.get(`/api/orders/myorders/all`, config);

      return data;
    };

    try {
      const orders = await fetchData();

      dispatch(userOrdersSlice.actions.succces({ orders }));
    } catch (error) {
      dispatch(
        userOrdersSlice.actions.fail({
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        })
      );
    }
  };
};

export const getAllOrders = () => {
  return async (dispatch, getState) => {
    dispatch(ordersSlice.actions.padding());

    const fetchData = async () => {
      const { token } = getState().auth;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.get(`/api/orders`, config);

      return data;
    };

    try {
      const orders = await fetchData();

      dispatch(ordersSlice.actions.succces({ orders }));
    } catch (error) {
      dispatch(
        ordersSlice.actions.fail({
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        })
      );
    }
  };
};
