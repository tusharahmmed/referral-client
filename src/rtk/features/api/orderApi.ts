import { baseApi } from "./baseApi";

export const orederApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    placeOrder: build.mutation({
      query: (payload) => ({
        url: "/orders/create-new",
        method: "POST",
        data: payload,
      }),
    }),
  }),
});

export const { usePlaceOrderMutation } = orederApi;
