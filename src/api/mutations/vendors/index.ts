import { post, put } from "../..";

export const createVendor = async (body: any) => {
  return await post("vendors/create", { ...body });
};

export const updateVendor = async (body: any) => {
  return await put("vendor/update", { ...body });
};
