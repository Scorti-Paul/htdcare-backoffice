import { post } from "api";

export const createCategory = async (body: any) => {
  return await post("category/create", { ...body });
};
