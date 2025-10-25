import { tagTypes } from "@/rtk/tag-types";
import { baseApi } from "./baseApi";
const USER = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileStats: build.query({
      query: () => ({
        url: `${USER}/profile-stats`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
      keepUnusedDataFor: 1000,
    }),
  }),
});

export const { useGetProfileStatsQuery } = userApi;
