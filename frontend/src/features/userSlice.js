import { createSlice } from "@reduxjs/toolkit";

// app APi
import appApi from "../services/appApi";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    updateUser: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.signup.matchFulfilled,
      (_, { payload }) => payload
    );
    // builder.addMatcher(appApi.endpoints.addToCart.matchFulfilled, (_, {payload}) => payload)
    // builder.addMatcher(appApi.endpoints.removeFromCart.matchFulfilled, (_, {payload}) => payload)
    // builder.addMatcher(appApi.endpoints.increaseCartProduct.matchFulfilled, (_, {payload}) => payload)
    // builder.addMatcher(appApi.endpoints.decreaseCartProduct.matchFulfilled, (_, {payload}) => payload)
  },
});

export const { logout } = userSlice.actions;
export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
