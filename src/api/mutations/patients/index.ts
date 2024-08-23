import { post, put } from "../..";

export const createPatient = async (body: any) => {
  return await post("patient/create", { ...body });
};
export const updatePatient = async (body: any) => {
  return await put("patient/update", { ...body });
};
