import { get } from "../utils/request";

export const getListQuestion = async (topicId: string): Promise<any> => {
  const result = await get(`question?topicId=${topicId}`);
  return result;
};
