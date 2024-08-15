import { post, put } from "../..";

export const createServiceRequest = async (body: any) => {
  return await post("servicerequest/create", { ...body });
};

export const updateServiceRequest = async (body: any) => {
  return await put("servicerequest/update", { ...body });
};
