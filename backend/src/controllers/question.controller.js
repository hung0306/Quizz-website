import { Question } from "../models/index.js";
import { toJsonServerArray } from "./_helpers.js";

export async function listQuestions(req, res) {
  try {
    const topicId = Number(req.query.topicId);
    const filter = {};
    if (!Number.isNaN(topicId)) filter.topicId = topicId;
    const questions = await Question.find(filter).lean();
    return res.json(toJsonServerArray(questions));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


