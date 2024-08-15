import { get, post, put } from "../..";

export const createFarmer = async (body: any) => {
  return await post("farmer/create", { ...body });
};

export const updateFarmer = async (body: any) => {
  return await put("farmer/update", { ...body });
};

export const getSingleFarmer = async (config = {}) => {
  try {
    const response = await get("farmer", { ...config });
    return response;
  } catch (error) {
    return error;
  }
};