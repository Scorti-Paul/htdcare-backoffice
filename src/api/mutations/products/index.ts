import { post, put } from "../..";

export const createProduct = async (body: any) => {
  return await post("product/create", { ...body });
};
export const updateProduct = async (body: any) => {
  return await put("product/update", { ...body });
};
