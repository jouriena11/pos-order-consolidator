import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order_list: [],
    //total: order_list.length
    
  },
  reducers: {
    addItem: (state, action) => {
      const order = action.payload; // {}
      const foundIndex = state.order_list.findIndex((item) => item.id === order.id);
      if(foundIndex >= 0) {
        state.order_list[foundIndex].qty += 1;
      } else {
        state.order_list.push(order);
      }
      
    },
    removeItem: (state, action) => {
      const id = action.payload; // 14312654
      const foundIndex = state.order_list.findIndex((item) => item.id === id);
      if (foundIndex >= 0) {
        state.order_list = state.order_list.splice(foundIndex, 1);
      }
    },
    adjQty: (state, action) => {
      const { id, qty } = action.payload; // qty +1 , -1
      const foundIndex = state.order_list.findIndex((item) => item.id === id);
      if (foundIndex >= 0) {
        state.order_list[foundIndex].qty += qty; // 0
        if (state.order_list[foundIndex].qty === 0) {
          state.order_list.splice(foundIndex, 1);
        }
      }
    },
    resetOrderList: (state, action) => {
      return {...state, order_list: []}
    }
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, adjQty, resetOrderList } = orderSlice.actions;

export default orderSlice.reducer;
