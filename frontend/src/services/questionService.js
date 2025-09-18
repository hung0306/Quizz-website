import { get } from "../utils/request";

export const getListQuestion = async (topicId) => {
  const result = await get(`question?topicId=${topicId}`);
  return result;
};
