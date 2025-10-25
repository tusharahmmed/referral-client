import { USER_ROLE } from "@/constants/role";
import { lruMemoize } from "@reduxjs/toolkit";

export interface IMeta {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface IUser {
  id: string;
  name: string;
  serName: string;
  phone: string;
  email: string;
  profileImage?: string;
  role: USER_ROLE;
  // permissions: USER_PERMISSION[];
  address: string;
  createdAt: string;
  updatedAt: string;
}
export type ICourse = {
  _id: string;
  name: string;
  description: string;
  price: number;
  instructor: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
};

export type NotificationType = "success" | "info" | "warning" | "error";
