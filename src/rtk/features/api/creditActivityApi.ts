import { tagTypes } from "@/rtk/tag-types";
import { baseApi } from "./baseApi";
const CREDIT_ACTIVITY = "/credit-activities";

export const creditActivityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCreditActivity: build.query({
      query: () => ({
        url: `${CREDIT_ACTIVITY}/profile-activities`,
        method: "GET",
      }),
      providesTags: [tagTypes.credit_activity],
      keepUnusedDataFor: 1000,
    }),
  }),
});

export const { useGetCreditActivityQuery } = creditActivityApi;
