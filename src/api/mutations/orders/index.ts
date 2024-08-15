import { put } from "../..";

export const updateOrder = async (body: any) => {
  return await put("order/update", { ...body });
};


