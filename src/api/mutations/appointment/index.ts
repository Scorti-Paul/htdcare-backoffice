import { get, post, put } from "../..";

export const scheduleAppointment = async (body: any) => {
  return await post("appointment/create", { ...body });
};

export const updateAppointment = async (body: any) => {
  return await put("appointment/update", { ...body });
};

export const getPatientMedicalHistories = async (config = {}) => {
  try {
    const response = await get("patient-medical-history", { ...config });
    return response;
  } catch (error) {
    return error;
  }
};