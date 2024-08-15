import { post, put } from "../..";

export const createRequestProduction = async (body: any) => {
  return await post("production/create", { ...body });
};

export const updateRequestProduction = async (body: any) => {
  return await put("production/update", { ...body });
};
