import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // console.log("addToCart action:", action);
      if (!action.payload) return;
      const itemIndex = state.items.findIndex(
        (item) => item._uid === action.payload._uid,
      );

      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateCart: (state, action) => {
      // console.log("Received action:", action.payload);
      if (!action.payload) return;
      // console.log(action.payload);
      const itemIndex = state.items.findIndex(
        (item) => item._uid === action.payload._uid,
      );

      if (itemIndex >= 0) {
        state.items[itemIndex] = action.payload;
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._uid !== action.payload);
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateCart, removeFromCart, emptyCart } =
  cartSlice.actions;

export default cartSlice.reducer;
