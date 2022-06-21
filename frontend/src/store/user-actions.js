import axios from 'axios';
import { allUserSlice, getUserDetailsSlice } from './user-slice';

//fetching user details from backend
export const getUserDetails = (id) => {
  return async (dispatch, getState) => {
    dispatch(getUserDetailsSlice.actions.padding());

    const fetchData = async () => {
      const { token } = getState().auth;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.get('/api/users/profile', config);

      return data;
    };

    try {
      const user = await fetchData();

      dispatch(
        getUserDetailsSlice.actions.succces({
          user
        })
      );
    } catch (error) {
      dispatch(
        getUserDetailsSlice.actions.fail({
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        })
      );
    }
  };
};

//admin

export const getAllUsers = () => {
  return async (dispatch, getState) => {
    dispatch(allUserSlice.actions.padding());

    const fetchData = async () => {
      const { token } = getState().auth;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.get('/api/users', config);

      return data;
    };

    try {
      const users = await fetchData();

      dispatch(
        allUserSlice.actions.succces({
          users
        })
      );
    } catch (error) {
      dispatch(
        allUserSlice.actions.fail({
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        })
      );
    }
  };
};
