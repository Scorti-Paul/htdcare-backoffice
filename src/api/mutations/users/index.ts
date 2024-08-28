import { post, put } from "../..";

export const registerUser = async (body: any) => {
  return await post("user/sign-up", { ...body });
};

export const updateUser = async (body: any) => {
  return await put("user/update", { ...body });
};

export const loginUser = async (body: any) => {
  return await post("user/login", { ...body });
};

export const forgotPassword = async (body: any) => {
  return await post("user/forgot", { ...body });
};

export const resetPassword = async (body: any) => {
  return await post("user/reset", { ...body });
};
