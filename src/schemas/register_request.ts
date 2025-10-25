import * as yup from "yup";

export const registerRequestSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(6),
  referred_user_code: yup.string().optional(),
});
