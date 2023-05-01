import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create the api

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "/api/user/signup",
        method: "POST",
        body: user,
      }),
    }),

    login: builder.mutation({
      query: (user) => ({
        url: "/api/user/login",
        method: "POST",
        body: user,
      }),
      transformResponse: (response) => {
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
        // console.log(response);
        return response;
      },
    }),

    // creating product
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/api/admin/product/create",
        headers: { Authorization: `Bearer ${localStorage.token}` },
        body: product,
        method: "POST",
      }),
    }),
    // update product
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/api/admin/product/update/${product.id}`,
        headers: { Authorization: `Bearer ${localStorage.token}` },
        body: product,
        method: "PUT",
      }),
    }),
    // remove product
    removeProduct: builder.mutation({
      query: (userID) => ({
        url: `/api/admin/product/delete/${userID}`,
        headers: { Authorization: `Bearer ${localStorage.token}` },
        method: "DELETE",
      }),
    }),
    // remove User
    removeUser: builder.mutation({
      query: (productID) => ({
        url: `/api/admin/user/delete/${productID}`,
        headers: { Authorization: `Bearer ${localStorage.token}` },
        method: "DELETE",
      }),
    }),

    // get item in cart
    getItemInCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/api/cart",
        headers: { Authorization: `Bearer ${localStorage.token}` },
        body: cartInfo,
        method: "GET",
      }),
    }),

    // add to cart
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: `/api/cart/addToCart/${cartInfo.id}`,
        headers: { Authorization: `Bearer ${localStorage.token}` },
        method: "POST",
      }),
      transformResponse: (response) => {
        if (response.success) {
          return response.data;
        }
        // console.log(response);
      },
    }),

    // remove from cart
    removeFromCart: builder.mutation({
      query: (body) => ({
        url: `/api/cart/deleteCart/${body.id}`,
        body,
        headers: { Authorization: `Bearer ${localStorage.token}` },
        method: "DELETE",
      }),
      transformResponse: (response) => {
        if (response.success) {
          return response.data;
        }
        // console.log(response);
      },
    }),

    // update cart
    updateCartProduct: builder.mutation({
      query: (body) => ({
        url: "/api/cart/updateCart",
        headers: { Authorization: `Bearer ${localStorage.token}` },
        body,
        method: "PUT",
      }),
      transformResponse: (response) => {
        if (response.success) {
          return response.data;
        }
        // console.log(response);
      },
    }),
    // increase cart
    increaseCartProduct: builder.mutation({
      query: (body) => ({
        url: `/api/cart/increaseCart/${body.id}`,
        headers: { Authorization: `Bearer ${localStorage.token}` },
        method: "PUT",
      }),
      transformResponse: (response) => {
        if (response.success) {
          return response.data;
        }
        // console.log(response);
      },
    }),
    // decrease cart
    decreaseCartProduct: builder.mutation({
      query: (body) => ({
        url: `/api/cart/decreaseCart/${body.id}`,
        headers: { Authorization: `Bearer ${localStorage.token}` },
        method: "PUT",
      }),
      transformResponse: (response) => {
        if (response.success) {
          return response.data;
        }
        // console.log(response);
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useCreateProductMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartProductMutation,
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useGetItemInCartMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
  useRemoveUserMutation,
} = appApi;

export default appApi;
