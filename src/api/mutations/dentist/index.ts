import { post, put } from "../..";

export const createDentist = async (body: any) => {
  return await post("dentist/create", { ...body });
};
export const updateDentist = async (body: any) => {
  return await put("dentist/update", { ...body });
};
