import { tagTypes } from "@/rtk/tag-types";
import { baseApi } from "./baseApi";

export const orederApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    placeOrder: build.mutation({
      query: (payload) => ({
        url: "/orders/create-new",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.profile, tagTypes.credit_activity],
    }),
  }),
});

export const { usePlaceOrderMutation } = orederApi;
