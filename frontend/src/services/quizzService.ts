import { post } from "../utils/request";

export const createAns = async (options: any): Promise<any> => {
  const result = await post(`answers`, options);
  return result;
};
