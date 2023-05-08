import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order_list: []
  },
  reducers: {
    addItem: (state, action) => {
        const order = action.payload; // {}
        state.order_list.push(order);
    },
    removeItem: (state, action) => {
        const id = action.payload; // 14312654
        const foundIndex = state.order_list.findIndex((item) => item._id === id)
        if(foundIndex >= 0){
            state.order_list = state.order_list.splice(foundIndex, 1)
        }
    }
  }
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem } = orderSlice.actions

export default orderSlice.reducer