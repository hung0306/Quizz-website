import { get } from "../utils/request";

export const getListTopic = async (): Promise<any> => {
  const result = await get("topics");
  return result;
};

export const getTopic = async (id: string): Promise<any> => {
  const result = await get(`topics/${id}`);
  return result;
};
