import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import orderSlice from './orderSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    order: orderSlice
  }
})