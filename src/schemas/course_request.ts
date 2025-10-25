import * as yup from "yup";

export const createCourseRequestSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required").min(0),
  instructor: yup.string().required("Instructor is required"),
  thumbnail: yup.string().required("Thumbnail is required"),
});
