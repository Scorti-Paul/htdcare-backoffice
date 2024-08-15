import { post, put } from "../..";

export const createService = async (body: any) => {
  return await post("service/create", { ...body });
};

export const updateService = async (body: any) => {
  return await put("service/update", { ...body });
};
