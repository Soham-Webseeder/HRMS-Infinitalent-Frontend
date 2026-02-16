import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onEdit3: false,
};

export const MyprofileSlice = createSlice({
  name: "myprofile",
  initialState,
  reducers: {
    setOnEdit3: (state, action) => {
      state.onEdit3 = action.payload;
    },
  },
});

export const { setOnEdit3 } = MyprofileSlice.actions;

export default MyprofileSlice.reducer;
