import {createSlice} from '@reduxjs/toolkit'

// app APi
import appApi from '../services/appApi'

const initialState = [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        logoutCart: ()=>initialState,
        updateCart: (_, action) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.addToCart.matchFulfilled, (_, {payload}) => payload)
        builder.addMatcher(appApi.endpoints.removeFromCart.matchFulfilled, (_, {payload}) => payload)
        builder.addMatcher(appApi.endpoints.increaseCartProduct.matchFulfilled, (_, {payload}) => payload)
        builder.addMatcher(appApi.endpoints.decreaseCartProduct.matchFulfilled, (_, {payload}) => payload)
    }
})

export const {logoutCart} = cartSlice.actions;
export const {updateCart} = cartSlice.actions;
export default cartSlice.reducer;