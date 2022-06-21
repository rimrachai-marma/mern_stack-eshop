import { createSlice } from '@reduxjs/toolkit';

export const getUserDetailsSlice = createSlice({
  name: 'User',
  initialState: {
    user: {},
    error: null,
    pending: false
  },
  reducers: {
    padding(state) {
      state.pending = true;
    },
    succces(state, action) {
      state.pending = false;
      state.user = action.payload.user;
    },
    fail(state, action) {
      state.pending = false;
      state.error = action.payload.error;
    }
  }
});

//admin
export const allUserSlice = createSlice({
  name: 'get all users',
  initialState: {
    users: [],
    pending: false,
    error: null
  },
  reducers: {
    padding(state) {
      state.pending = true;
    },
    succces(state, action) {
      state.users = action.payload.users;
      state.pending = false;
    },
    fail(state, action) {
      state.error = action.payload.error;
      state.pending = false;
    },
    rest(state) {
      state.users = [];
      state.pending = false;
      state.error = null;
    }
  }
});
