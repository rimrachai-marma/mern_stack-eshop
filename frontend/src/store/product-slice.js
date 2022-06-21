import { createSlice } from '@reduxjs/toolkit';

export const getAllProductSclice = createSlice({
  name: 'all products',
  initialState: {
    products: [],
    page: 0,
    pages: 0,
    error: null,
    pending: false
  },
  reducers: {
    padding(state) {
      state.pending = true;
    },
    succces(state, action) {
      state.pending = false;
      state.products = action.payload.products;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    },
    fail(state, action) {
      state.pending = false;
      state.error = action.payload.error;
    }
  }
});

export const getSingleProductSlice = createSlice({
  name: 'single product',
  initialState: {
    product: {},
    error: null,
    pending: false
  },
  reducers: {
    padding(state) {
      state.pending = true;
    },
    succces(state, action) {
      state.pending = false;
      state.product = action.payload.product;
    },
    fail(state, action) {
      state.pending = false;
      state.error = action.payload.error;
    }
  }
});

export const getTopProductSclice = createSlice({
  name: 'top products',
  initialState: {
    products: [],
    error: null,
    pending: false
  },
  reducers: {
    padding(state) {
      state.pending = true;
    },
    succces(state, action) {
      state.pending = false;
      state.products = action.payload.products;
    },
    fail(state, action) {
      state.pending = false;
      state.error = action.payload.error;
    }
  }
});
