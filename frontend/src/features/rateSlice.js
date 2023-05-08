import { createSlice } from "@reduxjs/toolkit";

// app APi

const initialState = [];

export const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {
    updateRate: (state, action) => {
      // console.log("action:",action.payload);
      return (state = action.payload);
    },
  },
});

export const { updateRate } = rateSlice.actions;
export default rateSlice.reducer;
