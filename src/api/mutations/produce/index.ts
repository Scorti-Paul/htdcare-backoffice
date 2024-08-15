import { post, put } from "../..";

export const createProduce = async (body: any) => {
  return await post("produce/create", { ...body });
};
export const updateProduce = async (body: any) => {
  return await put("produce/update", { ...body });
};
