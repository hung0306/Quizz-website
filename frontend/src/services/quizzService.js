import { post } from "../utils/request";

export const createAns = async (options) => {
  const result = await post(`answers`, options);
  return result;
};
