import { post, put } from "../..";

export const createMedicalHistory = async (body: any) => {
  return await post("medical-history/create", { ...body });
};
export const updateMedicalHistory = async (body: any) => {
  return await put("medical-history/update", { ...body });
};
