import { createSlice } from '@reduxjs/toolkit';

const initialState = 0;

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      if (state < 9) {
        return state + 1;
      }
      return state;
    },
    decrement: (state) => {
      if (state > 0) {
        return state - 1;
      }
      return state;
    }
  }
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
