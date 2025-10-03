import { get, post } from "../utils/request";

export const login = async (email: string, password: string): Promise<any> => {
  const result = await get(`user?email=${email}&password=${password}`);
  return result;
};

export const register = async (options: any): Promise<any> => {
  const result = await post(`user`, options);
  return result;
};

export const checkExist = async (key: string, value: string): Promise<any> => {
  const result = await get(`user?${key}=${value}`);
  return result;
};
