import { createSlice } from '@reduxjs/toolkit';

export const orderDetailesSlice = createSlice({
  name: 'order detailes',
  initialState: {
    order: {},
    pending: false,
    error: null
  },
  reducers: {
    padding(state) {
      state.pending = true;
    },
    succces(state, action) {
      state.order = action.payload.order;
      state.pending = false;
    },
    fail(state, action) {
      state.error = action.payload.error;
      state.pending = false;
    },
    rest(state) {
      state.order = {};
      state.pending = false;
      state.error = null;
    }
  }
});

export const orderUpdateToPaidSlice = createSlice({
  name: 'order update to paid',
  initialState: {
    pending: false,
    succces: false,
    error: null
  },
  reducers: {
    padding(state) {
      state.pending = true;
    },
    succces(state, action) {
      state.succces = true;
      state.pending = false;
    },
    fail(state, action) {
      state.error = action.payload.error;
      state.pending = false;
    },
    rest(state) {
      state.pending = false;
      state.succces = false;
      state.error = null;
    }
  }
});

export const userOrdersSlice = createSlice({
  name: 'get user orders',
  initialState: {
    orders: [],
    pending: false,
    error: null
  },
  reducers: {
    padding(state) {
      state.pending = true;
    },
    succces(state, action) {
      state.orders = action.payload.orders;
      state.pending = false;
    },
    fail(state, action) {
      state.error = action.payload.error;
      state.pending = false;
    },
    rest(state) {
      state.orders = [];
      state.pending = false;
      state.error = null;
    }
  }
});

export const ordersSlice = createSlice({
  name: 'getOrders',
  initialState: {
    orders: [],
    pending: false,
    error: null
  },
  reducers: {
    padding(state) {
      state.pending = true;
    },
    succces(state, action) {
      state.orders = action.payload.orders;
      state.pending = false;
    },
    fail(state, action) {
      state.error = action.payload.error;
      state.pending = false;
    },
    rest(state) {
      state.orders = [];
      state.pending = false;
      state.error = null;
    }
  }
});
