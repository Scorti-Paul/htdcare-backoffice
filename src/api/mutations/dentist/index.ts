import { get, post, put } from "../..";

export const createDentist = async (body: any) => {
  return await post("dentist/create", { ...body });
};

export const updateDentist = async (body: any) => {
  return await put("dentist/update", { ...body });
};

export const getPatientMedicalHistories = async (config = {}) => {
  try {
    const response = await get("patient-medical-history", { ...config });
    return response;
  } catch (error) {
    return error;
  }
};