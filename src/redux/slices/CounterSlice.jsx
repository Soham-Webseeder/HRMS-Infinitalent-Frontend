import { createSlice } from '@reduxjs/toolkit';

const initialState = 0; 

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Changed limit to 6 since you have 6 form tabs
      if (state < 6) { 
        return state + 1;
      }
      return state;
    },
    decrement: (state) => {
      // Changed minimum bound to 1
      if (state > 0) { 
        return state - 1;
      }
      return state;
    },
    // NEW REDUCER: Allows jumping directly to a specific tab
    setStep: (state, action) => {
      return action.payload;
    }
  }
});

// Make sure to export the new setStep action!
export const { increment, decrement, setStep } = counterSlice.actions;

export default counterSlice.reducer;