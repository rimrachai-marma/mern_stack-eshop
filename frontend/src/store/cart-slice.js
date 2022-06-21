import { createSlice } from '@reduxjs/toolkit';
import { round } from '../utilities';

const cartInitilState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  changed: false, // do not change it when replace cart or fetching cart data
  pending: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitilState,
  reducers: {
    setCartStatus(state, action) {
      state.pending = action.payload.pending;
    },
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
    },

    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.product === newItem.id
      );

      state.changed = true;
      state.totalQuantity = state.totalQuantity + newItem.qty;

      state.totalAmount = round(
        state.totalAmount + newItem.price * newItem.qty,
        2
      );

      if (!existingItem) {
        state.items.push({
          product: newItem.id,
          name: newItem.name,
          image: newItem.image,
          price: newItem.price,
          quantity: newItem.qty,
          totalPrice: round(newItem.price * newItem.qty, 2)
        });
      } else {
        existingItem.quantity = existingItem.quantity + newItem.qty;

        existingItem.totalPrice = round(
          existingItem.totalPrice + newItem.price * newItem.qty,
          2
        );
      }
    },
    removeItemByOneFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.product === id);

      state.changed = true;
      state.totalQuantity--;

      state.totalAmount = round(state.totalAmount - existingItem.price, 2);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.product !== id);
      } else {
        existingItem.quantity--;

        existingItem.totalPrice = round(
          existingItem.totalPrice - existingItem.price,
          2
        );
      }
    },

    removeItemsFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.product === id);

      state.changed = true;
      state.totalQuantity = state.totalQuantity - existingItem.quantity;

      state.totalAmount = round(
        state.totalAmount - existingItem.price * existingItem.quantity,
        2
      );
      state.items = state.items.filter((item) => item.product !== id);
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice;
