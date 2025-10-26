import { tagTypes } from "@/rtk/tag-types";
import { baseApi } from "./baseApi";
const COURSE_URL = "/courses";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCourse: build.mutation({
      query: (payload) => ({
        url: `${COURSE_URL}/create-new`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.course],
    }),
    getAllCourse: build.query({
      query: (arg) => ({
        url: `${COURSE_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (data, meta) => {
        return {
          meta: meta,
          course: data,
        };
      },
      providesTags: [tagTypes.course],
      keepUnusedDataFor: 1000,
    }),
    deleteCouse: build.mutation({
      query: (id) => ({
        url: `${COURSE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.course],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useDeleteCouseMutation,
} = courseApi;
