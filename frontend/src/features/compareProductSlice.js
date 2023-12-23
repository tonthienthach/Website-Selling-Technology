import { createSlice } from "@reduxjs/toolkit";

// app APi

const initialState = [];

export const compareProductSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      console.log("action:", action.payload);
      return (state = [...state, action.payload]);
    },
    deleteProduct: (state, action) => {
      console.log("action:", action.payload);
      const temp = state.filter((product) => product._id !== action.payload);
      return (state = temp);
    },
  },
});

export const { updateProduct, deleteProduct } = compareProductSlice.actions;
export default compareProductSlice.reducer;
